import React from "react";
import numeral from "numeral";
import styles from '../App.module.css';

function Table({ data }) {
  data.sort((a,b) => b.totalCases-a.totalCases);  
  return (
    <div className={styles.table}>
      {data.map((country, index) => (
        <tr key={index}>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.totalCases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;