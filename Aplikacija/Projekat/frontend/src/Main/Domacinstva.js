import React, { useState } from "react";
import DomacinstvoCard from "../Components/Domacinstvo/DomacinstvoCard";
import classes from "./Domacinstva.module.css";
import { useNavigate } from "react-router-dom";

function Domacinstva() {
  const [domacinstva, setDomacinstva] = useState([]);
  function fetchDomacinstvaHandler() {
    fetch("https://localhost:5001/Domacinstvo/PreuzmiSvaDomacinstvo")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedData = data.map((domacinstvo) => {
          return {
            ID: domacinstvo.ID,
            Naziv: domacinstvo.Naziv,
            Username: domacinstvo.Username,
            Email: domacinstvo.email,
            Poslovi: domacinstvo.Poslovi,
            Proizvodi: domacinstvo.Proizvodi,
          };
        });
        console.log(transformedData);
        setDomacinstva(transformedData);
      });
  }
  fetchDomacinstvaHandler();
  fetchDomacinstvaHandler();
  return (
    <div className={classes.allDomacinstva}>
      <DomacinstvoCard
        //onClick={() => otvoriDomacina("Domacinstvo Maletic")}
        className={classes.Domacinstvo}
        NazivDomacinstva="Domacinstvo Maletic"
        adresa="Neka random adresa1"
        brojTelefona="0669446083"
      />
      <DomacinstvoCard
        //onClick={() => otvoriDomacina("Domacinstvo Najdanovic")}
        NazivDomacinstva="Domacinstvo Najdanovic"
        adresa="Neka random adresa2"
        brojTelefona="06512312323"
      />
      <DomacinstvoCard
        //onClick={() => otvoriDomacina("Domacinstvo Momcilovic")}
        NazivDomacinstva="Domacinstvo Momcilovic"
        adresa="Neka random adresa3"
        brojTelefona="06512212524"
      />
      <DomacinstvoCard
        //onClick={() => otvoriDomacina("Domacinstvo Markovic")}
        NazivDomacinstva="Domacinstvo Markovic"
        adresa="Neka random adresa4"
        brojTelefona="06512212524"
      />
    </div>
  );
}

export default Domacinstva;
