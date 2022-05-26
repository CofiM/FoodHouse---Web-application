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
        {/* <input type="number" placeholder={props.placeholder} /> */}
        <TextField
          id="outlined-number"
          label={props.label}
          fullWidth
          type="number"
          name={props.label}
          autoComplete={props.label}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
}

export default InputNumber;
