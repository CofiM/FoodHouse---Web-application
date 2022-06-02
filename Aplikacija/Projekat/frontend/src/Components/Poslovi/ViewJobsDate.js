import React from "react";
import { useHistory } from "react-router-dom";
import PosloviCard from "./PosloviCard";
import { useState, useEffect } from "react";
import classes from "../../Main/Poslovi.module.css"; 

const ViewJobsDate=()=>{

    const [allJobs, setAllJobs] = useState([]);

    const date = localStorage.getItem("Date");

    useEffect(() => {
        async function searchWithData() {
            const response = await fetch('https://localhost:5001/Posao/PreuzetiPosloveZaDatum/'+ date,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            });
            
            const data = await response.json();
            console.log(data);
            const jobs= data.map((job, index)=>{
            return{
                indeks: index ,
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
            };
            searchWithData();
    }, []);

    const onClickPosaoCard = () => {
        console.log("ULAZIM!");
        //console.log(index);
    }

    return (
        <div className={classes.search}>
        
            {/* <div className={classes.searchDiv}>
                <input type="text" placeholder="Lokacija" onChange={adresaHandler} />
                <input type="date" value="2022-05-15" min="2022-01-01" max="2022-12-31" />
                <button onClick={searchWithLocation} >Pretrazi</button>
            </div> */}
            <div>
                { allJobs.map((job) => (
                    <PosloviCard
                        opis = {job.opis}
                        brRadnihMesta = {job.brojRadnihMesta}
                        datum = {job.datumPosla}
                        cena = {job.cena}
                        domacin = {job.domacin}
                        adresa = {job.adresa}
                        klik = { onClickPosaoCard }
                    />
                    ))}
            </div>
        
    </div>
    );


};

export default ViewJobsDate;
