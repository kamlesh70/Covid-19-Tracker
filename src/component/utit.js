import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';
import './Map.css';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 200,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 1000,
    },
  };

export  const setCircle = (data, casesType) => data.map((country,i) => {
    return (
    <Circle key={i}
      center={{
        lat: country.countryInfo.lat,
        lng: country.countryInfo.long,
      }}
      pathOptions={
        {color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
        } }
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) *
        casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle> 
)}); 
