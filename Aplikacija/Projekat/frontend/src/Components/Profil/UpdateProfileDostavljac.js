import { useState, useEffect }  from 'react'
import InputText  from "../UI/InputText";
import InputNumber from "../UI/InputNumber";
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
                    <InputText label="Password" />
                </div>
                <div>
                    <InputNumber label="Cena usluga" />
                </div>
                <div>
                    <InputText label="Broj telefona" />
                </div>

            </div>
            <div className={classes.buttonDiv}>
               <button className={classes.buttonDesign}>Izmeni</button>
            </div>
        </div>
    );
};

export default DesignProfile;