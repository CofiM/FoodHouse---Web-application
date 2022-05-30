import React from "react";
import classes from "./InputDate.module.css";
import TextField from "@mui/material/TextField";



function InputDate(props) {
  return (
    <div className={classes.fullComponent}>
      <div className={classes.labelaDiv}>
        <label>{props.label}:</label>
      </div>
      <div className={classes.inputDiv}>
      <TextField
        id="date"
        label={props.label}
        type="date"
        defaultValue={props.value}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
    </div>
  );
}

export default InputDate;
