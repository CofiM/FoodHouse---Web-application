import React, { useState } from "react"
import classes from "./Poslovi.module.css";
import PosloviCard from "../Components/Poslovi/PosloviCard";




const Poslovi = () => {
    const [isChangeLokacija, setIsChangeLokacija] = useState(false);
    const [isChangeDatum, setIsChangeDatum] = useState(false);

    const LokacijaHandler = () => {
        setIsChangeLokacija(true);
    }

    const DatumHandler = () => {
        setIsChangeDatum(true);
    }

    return(
        <div className={classes.search}>
            <form>
                <div className={classes.searchDiv}>
                    <input type="text" placeholder="Lokacija" onClick={LokacijaHandler} />
                    <input type="date" value="2022-05-15" min="2022-01-01" max="2022-12-31" onClick={DatumHandler} />
                    {!isChangeDatum && !isChangeLokacija && <button className={classes.disabled}>Pretraži</button>}
                    {(isChangeDatum || isChangeLokacija) && <button className={classes.enabled}>Pretraži</button>}
                </div>
                <div>
                    <PosloviCard 
                    opis="Branje malina"  
                    brRadnihMesta="14" 
                    datum="14.7.2022" 
                    cena="2000"
                    domacin="Gazdinstvo Maletic"
                    />
                </div>
            </form>
        </div>
    );
};

export default Poslovi;