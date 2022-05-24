import React from "react";
import classes from "./InputNumber.module.css";

function InputNumber(props) {
  return (
    <div className={classes.fullComponent}>
      <div className={classes.labelaDiv}>
        <label>{props.label}:</label>
      </div>
      <div className={classes.inputDiv}>
        <input type="number" placeholder={props.placeholder} />
      </div>
    </div>
  );
}

export default InputNumber;
