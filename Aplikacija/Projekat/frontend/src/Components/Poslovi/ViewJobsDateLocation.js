import React from "react";
import { useHistory } from "react-router-dom";
import PosloviCard from "./PosloviCard";
import { useState, useEffect } from "react";
import classes from "../../Main/Poslovi.module.css";
import WarningModal from "../Domacinstvo/WarningModal.js";

const ViewJobsDateLocation = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);

  const adress = localStorage.getItem("Adress");
  const date = localStorage.getItem("Date");
  localStorage.removeItem("Adress");
  localStorage.removeItem("Date");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const onClicksignInHandler = async (ID, IDDomacinstva) => {
    console.log("USLO " + ID + " " + IDDomacinstva);
    if (localStorage.getItem("Korisnik") == null) {
      setOpenWarning(true);
    } else {
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
  useEffect(() => {
    async function searchWithDataAndLocation() {
      const response = await fetch(
        "https://localhost:5001/Posao/PreuzmiPoslove/" + adress + "/" + date,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );

      const data = await response.json();
      console.log(data);
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
      console.log(jobs);
    }
    searchWithDataAndLocation();
  }, []);

  return (
    <div className={classes.search}>
      {/* <div className={classes.searchDiv}>
                    <input type="text" placeholder="Lokacija" onChange={adresaHandler} />
                    <input type="date" value="2022-05-15" min="2022-01-01" max="2022-12-31" />
                    <button onClick={searchWithLocation} >Pretrazi</button>
                </div> */}
      <div>
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

export default ViewJobsDateLocation;
