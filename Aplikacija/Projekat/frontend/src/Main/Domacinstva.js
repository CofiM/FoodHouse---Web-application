import React, { useEffect, useState } from "react";
import DomacinstvoCard from "../Components/Domacinstvo/DomacinstvoCard";
import classes from "./Domacinstva.module.css";
import { useHistory } from "react-router-dom";

function Domacinstva() {
  const history = useHistory();
  
  const openDomacinstvo = (Adresa, ID, Naziv) => {
    localStorage.setItem("DomacinstvoID", ID);
    localStorage.setItem("DomacinstvoAdresa", Adresa);
    localStorage.setItem("naz", Naziv);
    console.log("ID " + ID + "    ADRESA " + Adresa);
    let path = "jednoDomacinstvo";
    history.push(path);
  };

  const token = localStorage.getItem("Token");


  const [domacinstva, setDomacinstva] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    const fetchDomacinstvaHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/PreuzmiSvaDomacinstvo",
        {Authorization: `Bearer ${token}`}
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
      setIsLoaded(true);
    };
    fetchDomacinstvaHandler();
  }, []);

  console.log(domacinstva);
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.allDomacinstva}>
        {domacinstva.map((dom) => (
          <DomacinstvoCard
            key={dom.ID}
            id={dom.ID}
            NazivDomacinstva={dom.Naziv}
            Adresa={dom.Adresa}
            Telefon={dom.Telefon}
            onClick={() => openDomacinstvo(dom.Adresa, dom.ID, dom.Naziv)}
          />
        ))}
      </div>
    </div>
  );
}

export default Domacinstva;
