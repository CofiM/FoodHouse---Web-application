import { useState, useEffect }  from 'react'
import InputText  from "../UI/InputText";
import InputNumber from "../UI/InputNumber";
import Button from '@mui/material/Button';
import classes from "./DesignProfile.module.css";

const DesignProfile = () => {
    const [isValidIme, setIsValidIme] = useState(false);
    const [isValidPrezime, setIsValidPrezime] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidCena, setIsValidCena] = useState(false);
    const [isValidTelefon, setIsValidTelefon] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const onClickImeHandler = () => {
        setIsValidIme(true);
    }

    const onClickPrezimeHandler = () => {
        setIsValidPrezime(true);
    }

    const onClickUsernameHandler = () => {
        setIsValidUsername(true);
    }

    const onClickEmailHandler = () => {
        setIsValidEmail(true);
    }

    const onClickCenaHandler = () => {
        setIsValidCena(true);
    }

    const onClickTelefonHandler = () => {
        setIsValidTelefon(true);
    }

    const onClickPasswordHandler = () => {
        setIsValidPassword(true);
    }

    return(
        <div className={classes.mainDesign}>
            <div className={classes.divInformation}>
                <div>
                    <InputText label="Ime" placeholder="Ime" onClick={onClickImeHandler}/>
                </div>
                <div>
                    <InputText label="Prezime" placeholder="Prezime" onClick={onClickPrezimeHandler}/>
                </div>
                <div>
                    <InputText label="Username" placeholder="Username" onClick={onClickUsernameHandler}/>
                </div>
                <div>
                    <InputText label="E-mail" placeholder="E-mail" onClick={onClickEmailHandler}/>
                </div>
                <div>
                    <InputText label="Password" placeholder="Password" onClick={onClickPasswordHandler}/>
                </div>
                <div>
                    <InputNumber label="Cena usluga" placeholder="Cena usluga" onClick={onClickCenaHandler}/>
                </div>
                <div>
                    <InputText label="Broj telefona" placeholder="Broj telefona" onClick={onClickTelefonHandler}/>
                </div>

            </div>
            <div className={classes.buttonDiv}>
               <button className={classes.buttonDesign}>Izmeni</button>
            </div>
        </div>
    );
};

export default DesignProfile;