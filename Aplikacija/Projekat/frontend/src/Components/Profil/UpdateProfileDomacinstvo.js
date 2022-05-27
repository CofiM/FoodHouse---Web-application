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
                    <InputText label="Naziv" onClick={onClickImeHandler}/>
                </div>
                <div>
                    <InputText label="Username" onClick={onClickPrezimeHandler}/>
                </div>
                <div>
                    <InputText label="E-mail" onClick={onClickUsernameHandler}/>
                </div>
                <div>
                    <InputText label="Adresa"  onClick={onClickEmailHandler}/>
                </div>
                <div>
                    <InputText label="Broj telefona" onClick={onClickPasswordHandler}/>
                </div>
                <div>
                    <InputText label="Dan otvorenih vrata" onClick={onClickCenaHandler}/>
                </div>
            </div>
            <div className={classes.buttonDiv}>
               <button className={classes.buttonDesign}>Izmeni</button>
            </div>
        </div>
    );
};

export default DesignProfile;