import { useState, useEffect }  from 'react'
import InputText  from "../UI/InputText";
import InputPassword from "../UI/InputPassword";
import Button from '@mui/material/Button';
import classes from "./UpdateProfileDostavljac.module.css";

const DesignProfile = () => {


    return(
        <div className={classes.mainDesign}>
            <div className={classes.divInformation}>
                <div>
                    <InputText label="Ime" />
                </div>
                <div>
                    <InputText label="Prezime" />
                </div>
                <div>
                    <InputText label="Username" />
                </div>
                <div>
                    <InputText label="E-mail" />
                </div>
                <div>
                    <InputPassword label="Password" />
                </div>
            </div>
            <div className={classes.buttonDiv}>
               <button className={classes.buttonDesign}>Izmeni</button>
            </div>
        </div>
    );
};

export default DesignProfile;