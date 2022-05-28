import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputDate from "../UI/InputDate";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDomacinstvo.module.css";
import InputPassword from "../UI/InputPassword";

const DesignProfile = () => {
  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Naziv" />
        <InputText label="Username" />
        <InputText label="E-mail" />
        <InputPassword label="Password" />
        <InputPassword label="Confirm password" />
        <InputText label="Adresa" />
        <InputText label="Broj telefona" />
        <InputDate label="Dan otvorenih vrata" />
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign}>Izmeni</button>
      </div>
    </div>
  );
};

export default DesignProfile;
