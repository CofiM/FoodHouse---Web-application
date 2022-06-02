import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputNumber from "../UI/InputNumber";
import InputPassword from "../UI/InputPassword";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDostavljac.module.css";

const DesignProfile = (props) => {
  const [ime, setIme] = useState(props.Ime);
  const [prezime, setPrezime] = useState(props.Prezime);
  const [username, setUsername] = useState(props.Username);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cena, setCena] = useState(props.Cena);
  const [telefon, setTelefon] = useState(props.Telefon);
  

  async function fetchUpdateProfile(){
    
    const response = await fetch("https://localhost:5001/Dosavljac/PromeniSifruDostavljaca/" + props.Email + "/" +
    password + "/" + newPassword + "/" + ime + "/" + prezime + "/" + username + "/" + cena + "/" + telefon,{
      method: 'PUT',
      body: JSON.stringify({title: 'Uspesno je azuriran'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  } 

  const onChangeImeHandler = (event) => {
    setIme(event.target.value);
  }

  const onChangePrezimeHandler = (event) => {
    setPrezime(event.target.value);
  }
  
  const onChangeUsernameHandler = (event) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  }

  const onChangeCena = (event) => {
    setCena(event.target.value);
  } 

  const onChangeTelefon = (event) => {
    setTelefon(event.target.value);
  }

  const updateProfileHandler = (event) => {
    event.preventDefault();
    console.log("Ulazim");
    
    fetchUpdateProfile();
  }

  return (
    <div className={classes.mainDesign}>
      <div className={classes.divInformation}>
        <InputText label="Ime" value={ime} onChange={onChangeImeHandler}/>
        <InputText label="Prezime" value={prezime} onChange={onChangePrezimeHandler}/>
        <InputText label="Username" value={username} onChange={onChangeUsernameHandler}/>
        <InputPassword label="Password" value={password} onChange={onChangePassword}/>
        <InputPassword label="Confirm password"  value = {newPassword} onChange={onChangeNewPassword}/>
        <InputNumber label="Cena usluga" value={cena} onChange={onChangeCena}/>
        <InputText label="Broj telefona" value={telefon} onChange={onChangeTelefon}/>
      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign} onClick={updateProfileHandler}>Izmeni</button>
      </div>
    </div>
  );
};

export default DesignProfile;
