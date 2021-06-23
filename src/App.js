import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import Cases from "./component/Cases";
import styles from "./App.module.css";
import Table from "./component/Table";
import Chart from "./component/Chart";
import Map from "./component/Map";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({});
  const [wholeData, setWholeDate] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [coordinate, setCoordinate] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [casesType, setCaseType] = useState('cases');

  useEffect(() => {
    const getData = async function () {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => country.country);
          setCountries(countries);
          const totalCasesList = data.map((country) => {
            return { country: country.country, totalCases: country.cases };
          });
          setWholeDate(totalCasesList);
          const addData = data.map((country) => {
            return {
              name: country.country,
              lat: country.countryInfo.lat,
              long: country.countryInfo.long,
            };
          });
          setCoordinate(addData);
          setMapData(data);
        });
    };

    getData();
  }, []);
  useEffect(() => {
    const getData1 = async function () {
      const res = await fetch(
        country === "worldwide"
          ? `https://disease.sh/v3/covid-19/all`
          : `https://disease.sh/v3/covid-19/countries/${country}`
      );
      const data = await res.json();
      setCountryData(data);
    };
    const latLong = coordinate.find((element) => element.name === country);
    
    if (latLong) {
      setMapCenter({ lat: latLong.lat, lng: latLong.long });
      setMapZoom(4);
    } else {
      setMapCenter({ lat: 34.80746, lng: -40.4796 });
      setMapZoom(3);
    }
    getData1();
  }, [country, coordinate]);

  function handleSelect(countryName) {
    setCountry(countryName);
  }
  
  return (
    <div className={styles.app}>
      <div className={styles.app__left}>
        <Header data={countries} onSelect={handleSelect} />
        <div className={styles.cases}>
          <Cases
            onClick={()=> setCaseType("cases")}
            type="Cases"
            totalCases={countryData.cases}
            todayCases={countryData.todayCases}
          />
          <Cases
            onClick={()=> setCaseType("recovered")}
            type="Recovered"
            totalCases={countryData.recovered}
            todayCases={countryData.todayRecovered}
          />
          <Cases
            onClick={()=> setCaseType("deaths")}
            type="Deaths"
            totalCases={countryData.deaths}
            todayCases={countryData.todayDeaths}
          />
        </div>
        <Map
          data={mapData}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className={styles.app__right}>
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table data={wholeData} />
            <div className={styles.chart}>
              <h3>Worldwide New {casesType}</h3>
              <Chart casesType={casesType}/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
