import React, { useState, useEffect, useCallback } from "react"
import classes from "./Poslovi.module.css";
import PosloviCard from "../Components/Poslovi/PosloviCard";




const Poslovi = () => {
    const [isChangeLokacija, setIsChangeLokacija] = useState(false);
    const [isChangeDatum, setIsChangeDatum] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [cardIsShown, setCardIsShown] = useState(false);

    
    const LokacijaHandler = () => {
        setIsChangeLokacija(true);
    }

    const DatumHandler = () => {
        setIsChangeDatum(true);
    }

    const fetchJobsHandler = useCallback( async () => {
        setCardIsShown(true);
        try{
            const response = await fetch('https://localhost:5001/Posao/PreuzetiPosloveZaDomacinstvo/2');
            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const jobs = data.map((job) => {
                return{
                    opis: job.opis,
                    brojRadnihMesta: job.brojRadnihMesta,
                    datumPosla: job.datum,
                    cena: job.cena,
                    domacin: job.naziv,
                    adresa: job.adresa
                };
            });
            setAllJobs(jobs);
            console.log(jobs);
        }catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect( () => {
        fetchJobsHandler();
    },[fetchJobsHandler]);


    async function onClickSearch() {
        console.log("ulazim u fetch");
        setCardIsShown(true);
        const response = await fetch('https://localhost:5001/Posao/PreuzetiPosloveZaDomacinstvo/2');
            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const jobs = data.map((job) => {
                return{
                    opis: job.opis,
                    brojRadnihMesta: job.brojRadnihMesta,
                    datumPosla: job.datum,
                    cena: job.cena,
                    domacin: job.naziv,
                    adresa: job.adresa
                };
            });
            setAllJobs(jobs);
            console.log(jobs);
    }

    return(
        <div className={classes.search}>
            <form>
                <div className={classes.searchDiv}>
                    <input type="text" placeholder="Lokacija" onClick={LokacijaHandler} />
                    <input type="date" value="2022-05-15" min="2022-01-01" max="2022-12-31" onClick={DatumHandler} />
                    {/*{!isChangeDatum && !isChangeLokacija && <button className={classes.disabled} onClick={fetchJobsHandler}>Pretraži</button>}*/}
                    {/*{(isChangeDatum || isChangeLokacija) && <button className={classes.enabled} onClick={fetchJobsHandler}>Pretraži</button>}*/}
                    <button onClick={fetchJobsHandler}>Pretrazi</button>
                </div>
                <div>
                    {cardIsShown &&  allJobs.map((job) => (
                       <PosloviCard
                            opis = {job.opis}
                            brRadnihMesta = {job.brojRadnihMesta}
                            datum = {job.datumPosla}
                            cena = {job.cena}
                            domacin = {job.domacin}
                            adresa = {job.adresa}
                        />
                        ))}
                </div>
            </form>
        </div>
    );
};

export default Poslovi;