import React from "react";
import classes from "./InputText.module.css";

function InputText(props) {
  return (
    <div className={classes.fullComponent}>
      <div className={classes.labelaDiv}>
        <label>{props.label}:</label>
      </div>
      <div className={classes.inputDiv}>
        <input type="text" placeholder={props.placeholder} />
      </div>
    </div>
  );
}

export default InputText;
