import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import styles from "../App.module.css";

function Header(props) {
  const [country, setCountry] = useState("worldwide");
  function onCountryChange(event) {
    setCountry(event.target.value);
  }
  useEffect(() => {
    props.onSelect(country);
  }, [country, props])
  
  return (
    <div className={styles.header}>
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {props.data.map((country, index) => (
            <MenuItem key={index} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
