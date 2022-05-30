import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputDate from "../UI/InputDate";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDomacinstvo.module.css";
import InputPassword from "../UI/InputPassword";

const DesignProfile = (props) => {
  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Naziv" value={props.Naziv}/>
        <InputText label="Username" value={props.Username}/>
        <InputText label="E-mail" value={props.Email}/>
        <InputPassword label="Password" />
        <InputPassword label="Confirm password" />
        <InputText label="Adresa" value={props.Adresa}/>
        <InputText label="Broj telefona" value={props.Telefon}/>
        <InputDate label="Dan otvorenih vrata" value={props.Datum}/>
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign}>Izmeni</button>
      </div>
    </div>
  );
};

export default DesignProfile;
