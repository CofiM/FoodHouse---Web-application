import React, { useEffect, useState } from "react";
import DomacinstvoCard from "../Components/Domacinstvo/DomacinstvoCard";
import classes from "./Domacinstva.module.css";

function Domacinstva() {
  const [domacinstva, setDomacinstva] = useState([]);
  useEffect(() => {
    const fetchDomacinstvaHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/PreuzmiSvaDomacinstvo"
      );
      const data = await response.json();
      const transformedData = data.map((domacinstvo) => {
        return {
          ID: domacinstvo.id,
          Naziv: domacinstvo.naziv,
          Username: domacinstvo.username,
          Email: domacinstvo.email,
          Telefon: domacinstvo.telefon,
          Adresa: domacinstvo.adresa,
          OtvorenaVrata: domacinstvo.otvorenaVrata,
          Tip: domacinstvo.Tip,
          Poslovi: domacinstvo.poslovi,
          Proizvodi: domacinstvo.proizvodi,
        };
      });
      setDomacinstva(transformedData);
    };
    fetchDomacinstvaHandler();
  }, []);
  console.log(domacinstva);
  return (
    <div className={classes.allDomacinstva}>
      {domacinstva.map((dom) => (
        <DomacinstvoCard
          NazivDomacinstva={dom.Naziv}
          Adresa={dom.Adresa}
          Telefon={dom.Telefon}
        />
      ))}
    </div>
  );
}

export default Domacinstva;
