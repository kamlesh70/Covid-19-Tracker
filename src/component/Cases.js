import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styles from "../App.module.css";
import numeral from "numeral";

function Cases(props) {
  // let styleclass = 'totalcases';
  // if(props.type === 'Cases'){
  //       styleclass = 'totalcases';
  // }
  // else if(props.type === 'Recovered'){
  //      styleclass = 'recovered';
  // }
  // else if(props.type === 'Deaths'){
  //   styleclass = 'deaths';
  // }
  return (
    <div onClick={props.onClick} className={`${styles.cases}`} >
      <Card className={styles.cases__content}>
        <CardContent className={styles.cases__content}>
          <Typography color="textSecondary" gutterBottom>
            {props.type}
          </Typography>
          
            <Typography><strong>+{numeral(props.todayCases).format("0,0")}</strong></Typography>
          
          <Typography>
            {numeral(props.totalCases).format("0,0")} total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default React.memo(Cases);
