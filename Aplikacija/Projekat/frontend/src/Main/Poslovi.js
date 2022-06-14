import React, { useState, useEffect } from "react";
import classes from "./Poslovi.module.css";
import classes2 from "../Components/Pretraga/Pretraga.module.css";
import PosloviCard from "../Components/Poslovi/PosloviCard";
import { useHistory } from "react-router-dom";
import WarningModal from "../Components/Domacinstvo/WarningModal.js";

const Poslovi = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [adresa, setAdresa] = useState("");
  const [validAdresa, setValidAdresa] = useState(false);
  const [datum, setDatum] = useState("");
  const [validDatum, setValidDatum] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [locations, setLocations] = useState();

  const onClicksignInHandler = async (ID, IDDomacinstva) => {
    if (localStorage.getItem("Korisnik") == null) {
      setOpenWarning(true);
    }
    {
      const IDKorisnika = localStorage.getItem("KorisnikID");
      localStorage.setItem("IdKorisnik", IDKorisnika);
      localStorage.setItem("PosaoID", ID);
      const response = await fetch(
        " https://localhost:5001/Administrator/PosaljiPorukuDomacinKorisnik/" +
          IDDomacinstva +
          "/" +
          IDKorisnika +
          "/Zahtev za posao/" +
          "K/" +
          false,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );
    }
  };

  //fetch();

  const history = useHistory();

  const sendLocation = (data) => {
    localStorage.setItem("Adress", data);
    history.push("ViewJobsLocation");
  };

  const sendDate = (data) => {
    localStorage.setItem("Date", data);
    history.push("ViewJobsDate");
  };

  const sendDateAndLocation = (adress, date) => {
    localStorage.setItem("Date", date);
    // console.log(date);
    localStorage.setItem("Adress", adress);
    history.push("ViewJobsDateLocation");
  };

  const adresaHandler = (event) => {
    setAdresa(event.target.value.split(","));
    if (event.target.value != "") {
      setValidAdresa(true);
    } else {
      setValidAdresa(false);
    }
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const datumHandler = (event) => {
    setDatum(event.target.value);
    if (event.target.value != "") {
      setValidDatum(true);
    } else {
      setValidDatum(false);
    }
  };

  const choosePage = () => {
    if (validAdresa != false && validDatum != "") {
      sendDateAndLocation(adresa, datum);
      console.log(validDatum);
      console.log(validAdresa);
    } else if (validAdresa != false) {
      sendLocation(adresa);
      console.log(adresa);
    } else if (validDatum != false) {
      sendDate(datum);
      console.log(datum);
    }
  };

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch(
        "https://localhost:5001/Posao/PreuzetiPoslove",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      const jobs = data.map((job) => {
        return {
          id: job.id,
          opis: job.opis,
          brojRadnihMesta: job.brojRadnihMesta,
          datumPosla: job.datum,
          cena: job.cena,
          domacin: job.naziv,
          adresa: job.adresa,
          idDomacinstva: job.idDomacinstva,
        };
      });

      setAllJobs(jobs);
      setIsLoaded(true);
      console.log(jobs);
    }
    fetchJobs();
  }, []);

  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div className={classes.search}>
      <div className={classes.divForma}>
        <div className={classes.searchDiv}>
          <input
            type="text"
            placeholder="Lokacija"
            onChange={adresaHandler}
            className={classes2.unosPodataka}
          />
          <input
            type="date"
            min="2022-01-01"
            max="2022-12-31"
            defaultValue={""}
            onChange={datumHandler}
            className={classes2.unosPodataka}
          />
          <button className={classes2.Search} onClick={choosePage}>
            Pretrazi
          </button>
        </div>
      </div>
      <div className={classes.divWorks}>
        {allJobs.map((job) => (
          <PosloviCard
            key={job.id}
            opis={job.opis}
            brRadnihMesta={job.brojRadnihMesta}
            datum={job.datumPosla.split("T")[0]}
            cena={job.cena}
            domacin={job.domacin}
            adresa={job.adresa}
            onClicksignIn={() =>
              onClicksignInHandler(job.id, job.idDomacinstva)
            }
          />
        ))}
      </div>
      <div>
        {openWarning && (
          <WarningModal show={openWarning} onClose={handleCloseWarning} />
        )}
      </div>
    </div>
  );
};

export default Poslovi;
