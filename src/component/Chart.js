import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {};

function Chart({casesType}) {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async function () {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      );
      const data = await res.json();
      console.log(data);
      const charData = [];
      let lastData;
      for (let property in data[casesType]) {
        if (lastData) {
          let newdataPoint = {
            x: property,
            y: data[casesType][property] - lastData,
          };
          charData.push(newdataPoint);
        }
        lastData = data[casesType][property];
      }
      setData(charData);
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default React.memo(Chart);
