import React, { useEffect, useState } from "react";
import DomacinstvoCard from "../Components/Domacinstvo/DomacinstvoCard";
import classes from "./Domacinstva.module.css";
import { useHistory } from "react-router-dom";

function Domacinstva() {
  const history = useHistory();
  const openDomacinstvo = (Adresa, ID) => {
    localStorage.setItem("DomacinstvoID", ID);
    localStorage.setItem("DomacinstvoAdresa", Adresa);
    console.log("ID " + ID + "    ADRESA " + Adresa);
    let path = "Domacinstvo";
    history.push(path);
  };
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
          Tip: domacinstvo.tip,
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
          onClick={() => openDomacinstvo(dom.Adresa, dom.ID)}
        />
      ))}
    </div>
  );
}

export default Domacinstva;
