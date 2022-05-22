import React, {useState} from "react"
import classes from "./Poslovi.module.css";
import PosloviBox from "./PosloviBox";
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
                    <input type="text" placeholder="Lokacija" onClick={LokacijaHandler}></input>
                    <input type="date" value="2022-05-15" min="2022-01-01" max="2022-12-31" onClick={DatumHandler}></input>
                    {!isChangeDatum && !isChangeLokacija && <button className={classes.disabled}>Pretraži</button>}
                    {(isChangeDatum || isChangeLokacija) && <button className={classes.enabled}>Pretraži</button>}
                </div>
                <div>
                    <PosloviBox/>
                </div>
            </form>
        </div>
    );
};

export default Poslovi;