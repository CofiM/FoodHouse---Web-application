import { useState, useEffect } from "react";
import InputText from "../UI/InputText";
import InputPassword from "../UI/InputPassword";
import Button from "@mui/material/Button";
import classes from "./UpdateProfileDostavljac.module.css";

const DesignProfile = (props) => {
  const [ime, setIme] = useState(props.Ime);
  const [prezime, setPrezime] = useState(props.Prezime);
  const [username, setUsername] = useState(props.Username);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adresa, setAdresa] = useState(props.Adresa)

  async function fetchUpdateProfile(){
    
    const response = await fetch("https://localhost:5001/Korisnik/PromenitiSifruKorisnika/" + props.Email + "/" +
    password + "/" + newPassword + "/" + ime + "/" + prezime + "/" + username + "/" + adresa,{
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

  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  const onChangeNewPasswordHandler = (event) => {
    setNewPassword(event.target.value);
  }

  const onChangeAdresaHandler = (event) => {
    setAdresa(event.target.value);
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
        
        <InputPassword label="Password" value={password} onChange={onChangePasswordHandler}/>
        <InputPassword label="Confirm password" value={newPassword} onChange={onChangeNewPasswordHandler}/>
        <InputText label="Adresa" value={adresa} onChange={onChangeAdresaHandler}/>

      </div>
      <div className={classes.buttonDiv}>
        <button className={classes.buttonDesign} onClick={updateProfileHandler}>Izmeni</button>
      </div>
    </div>
  );
};

export default DesignProfile;
