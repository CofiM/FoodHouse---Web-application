import React, { useState, useEffect } from "react";
import classes from "./Poslovi.module.css";
import PosloviCard from "../Components/Poslovi/PosloviCard";
import { useHistory } from "react-router-dom";
import SearchBar from "../Components/Search/SearchBar";





const Poslovi = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [adresa, setAdresa]=useState("");
    const [validAdresa,setValidAdresa]=useState(false);
    const [datum, setDatum]=useState(null);
    const [validDatum,setValidDatum]=useState(false);

    const [locations,setLocations]=useState();

    

    const adresaHandler=(event)=>
    {
        setAdresa(event.target.value);
        if(event.target.value!="")
        {
            setValidAdresa(true);
        }
        else
        {
            setValidAdresa(false);
        }
    };

    const datumHandler=(event)=>
    {
        setDatum(event.target.value);
       if(event.target.value!=null)
       {
           setValidDatum(true);
       }
       else
       {
           setValidDatum(false);
       }
    }
    const choosePage=()=>
    {
        if(validAdresa!=false && validDatum!=false)
        {
            sendDateAndLocation(adresa,datum);
        }
        else if(validAdresa!=false)
        {
            sendLocation(adresa);
            console.log(adresa);
        }
        else if(validDatum!=false)
        {
            sendDate(datum);
            console.log(datum);
        }

    }

    useEffect(() => {
    async function fetchJobs() {
    const response = await fetch('https://localhost:5001/Posao/PreuzetiPoslove',
    {
        method: 'GET',
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        }
    });
    
    const data = await response.json();
    
    const jobs= data.map((job)=>{
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
    };
    fetchJobs();

    async function fetchLocations()
    {
        const res=await fetch('https://localhost:5001/Domacinstvo/PreuzmiLokacije',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            }
        });


        const dat=await res.json();
        const locs=dat.map((loc)=>{
            return{
                adresa: loc.adresa
            };
        });
        setLocations(locs);
    }
    fetchLocations();



    }, []);

    const history=useHistory();
    const sendLocation=(data)=>
    {
        localStorage.setItem("Adress",data);
        history.push("ViewJobsLocation");
    }
    const sendDate=(data)=>
    {
        localStorage.setItem("Date",data);
        history.push("ViewJobsDate");
    }
    const sendDateAndLocation=(adress,date)=>
    {
        localStorage.setItem("Date",date);
        localStorage.setItem("Adress",adress);
        history.push("ViewJobsDateLocation");
    }


    return(
        <div className={classes.search}>
            <form>
                <div className={classes.searchDiv}>
                    <input type="text" placeholder="Lokacija" onChange={adresaHandler} />
                    {/* { <SearchBar placeholder="Unesite lokaciju"  data={locations} ></SearchBar>} */}
                    <input type="date" min="2022-01-01" max="2022-12-31" onChange={datumHandler}/>
                    <button onClick={choosePage} >Pretrazi</button>
                </div>
                <div>
                    { allJobs.map((job) => (
                       <PosloviCard
                            opis = {job.opis}
                            brRadnihMesta = {job.brojRadnihMesta}
                            datum = {job.datumPosla.split("T")[0]}
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