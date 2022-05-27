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
        {/* <input type="text" placeholder={props.placeholder} fontSize="24px"/> */}
        <TextField
          id="standard-required"
          label={props.label}
          variant="standard"
        />
      </div>
    </div>
  );
}

export default InputText;
