import { useState, useEffect }  from 'react'
import InputText  from "../UI/InputText";
import InputDate from "../UI/InputDate";
import Button from '@mui/material/Button';
import classes from "./UpdateProfileDomacinstvo.module.css";
import InputPassword from "../UI/InputPassword";



const DesignProfile = () => {
   
    return(
        <div className={classes.mainDesign}>
            <div className={classes.divInformation}>
                <div>
                    <InputText label="Naziv" />
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
                <div>
                    <InputText label="Adresa"  />
                </div>
                <div>
                    <InputText label="Broj telefona" />
                </div>
                <div>
                    <InputDate label="Dan otvorenih vrata" />
                </div>
            </div>
            <div className={classes.buttonDiv}>
               <button className={classes.buttonDesign}>Izmeni</button>
            </div>
        </div>
    );
};

export default DesignProfile;