import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputDate from "../UI/InputDate";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDomacinstvo.module.css";
import InputPassword from "../UI/InputPassword";

const DesignProfile = (props) => {
  const [naziv, setNaziv] = useState(props.Naziv);
  const [username, setUsername] = useState(props.Username);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adresa, setAdresa] = useState(props.Adresa);
  const [telefon, setTelefon] = useState(props.Telefon);
  const [datum, setDatum] = useState(props.Datum);

  async function fetchUpdateProfile() {
    let token = localStorage.getItem("Token");
    const response = await fetch(
      "https://localhost:5001/Domacinstvo/IzmeniProfilDomacinstva/" +
        props.Email +
        "/" +
        password +
        "/" +
        newPassword +
        "/" +
        naziv +
        "/" +
        username +
        "/" +
        adresa +
        "/" +
        telefon +
        "/" +
        datum,
      {
        method: "PUT",
        body: JSON.stringify({ title: "Uspesno je azuriran" }),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  const changeNazivHandler = (event) => {
    setNaziv(event.target.value);
    
  };

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
    
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
    
  };

  const changeNewPasswordHandler = (event) => {
    setNewPassword(event.target.value);
    
  };

  const changeAdresaHandler = (event) => {
    setAdresa(event.target.value);
    
  };

  const changeTelefonHandler = (event) => {
    setTelefon(event.target.value);
    
  };

  const changeDatumHandler = (event) => {
    setDatum(event.target.value);
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();
    
    console.log(naziv, username, password, newPassword, adresa, telefon, datum);
    fetchUpdateProfile();
    window.location.reload(false); //REFRESH PAGE
  };

  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Naziv" value={naziv} onChange={changeNazivHandler} />
        <InputText
          label="Username"
          value={username}
          onChange={changeUsernameHandler}
        />
        <InputPassword
          label="Password"
          value={password}
          onChange={changePasswordHandler}
        />
        <InputPassword
          label="Confirm password"
          value={newPassword}
          onChange={changeNewPasswordHandler}
        />
        <InputText
          label="Adresa"
          value={adresa}
          onChange={changeAdresaHandler}
        />
        <InputText
          label="Broj telefona"
          value={telefon}
          onChange={changeTelefonHandler}
        />
        <InputDate
          label="Dan otvorenih vrata"
          value={Date.now}
          onChange={changeDatumHandler}
        />
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign} onClick={updateProfileHandler}>
          Izmeni
        </button>
      </div>
    </div>
  );
};

export default DesignProfile;
