import React from "react";
import DomacinstvoCard from "../Components/Domacinstvo/DomacinstvoCard";
import classes from "./Domacinstva.module.css";
import { useNavigate } from "react-router-dom";

function Domacinstva() {
  const otvoriDomacina = (props) => {
    console.log(props);
  };
  return (
    <div className={classes.allDomacinstva}>
      <DomacinstvoCard
        onClick={() => otvoriDomacina("Domacinstvo Maletic")}
        className={classes.Domacinstvo}
        NazivDomacinstva="Domacinstvo Maletic"
        adresa="Neka random adresa1"
        brojTelefona="0669446083"
      />
      <DomacinstvoCard
        onClick={() => otvoriDomacina("Domacinstvo Najdanovic")}
        NazivDomacinstva="Domacinstvo Najdanovic"
        adresa="Neka random adresa2"
        brojTelefona="06512312323"
      />
      <DomacinstvoCard
        onClick={() => otvoriDomacina("Domacinstvo Momcilovic")}
        NazivDomacinstva="Domacinstvo Momcilovic"
        adresa="Neka random adresa2"
        brojTelefona="06512212524"
      />
    </div>
  );
}

export default Domacinstva;
