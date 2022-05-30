import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputNumber from "../UI/InputNumber";
import InputPassword from "../UI/InputPassword";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDostavljac.module.css";

const DesignProfile = (props) => {
  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Ime" value={props.Ime}/>
        <InputText label="Prezime" value={props.Prezime}/>
        <InputText label="Username" value={props.Username}/>
        <InputText label="E-mail" value={props.Email}/>
        <InputPassword label="Password" />
        <InputPassword label="Confirm password" />
        <InputNumber label="Cena usluga" value={props.Cena}/>
        <InputText label="Broj telefona" value={props.Telefon}/>
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign}>Izmeni</button>
      </div>
    </div>
  );
};

export default DesignProfile;
