import React from "react";
import classes from "./InputNumber.module.css";
import TextField from "@mui/material/TextField";

function InputNumber(props) {
  return (
    <div className={classes.fullComponent}>
      <div className={classes.labelaDiv}>
        <label>{props.label}:</label>
      </div>
      <div className={classes.inputDiv}>
        <TextField
          sx={{ width: "25ch" }}
          id="standard-number"
          label={props.label}
          type="number"
          defaultValue={props.value}
          variant="standard"
          onChange = {props.onChange}
        />
      </div>
    </div>
  );
}

export default InputNumber;
