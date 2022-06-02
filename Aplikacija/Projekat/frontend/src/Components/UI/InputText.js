import React from "react";
import classes from "./InputText.module.css";
import TextField from "@mui/material/TextField";

function InputText(props) {
  return (
    <div className={classes.fullComponent}>
      <div className={classes.labelaDiv}>
        <label>{props.label}:</label>
      </div>
      <div className={classes.inputDiv}>
        <TextField
          sx={{ width: "25ch" }}
          id="standard-required"
          label={props.label}
          defaultValue={props.value}
          variant="standard"
          onChange = {props.onChange}
        />
      </div>
    </div>
  );
}

export default InputText;
