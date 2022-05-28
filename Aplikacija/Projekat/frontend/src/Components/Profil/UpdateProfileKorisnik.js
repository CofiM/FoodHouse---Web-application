import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputPassword from "../UI/InputPassword";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDostavljac.module.css";

const DesignProfile = () => {
  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Ime" />
        <InputText label="Prezime" />
        <InputText label="Username" />
        <InputText label="E-mail" />
        <InputPassword label="Password" />
        <InputPassword label="Confirm password" />
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign}>Izmeni</button>
      </div>
    </div>
  );
};

export default DesignProfile;
