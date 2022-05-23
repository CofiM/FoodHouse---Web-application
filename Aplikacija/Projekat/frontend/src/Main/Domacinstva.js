import React from "react";
import DomacinstvoCard from "../Components/Domacinstvo/DomacinstvoCard";
import classes from "./Domacinstva.module.css";
import InputText from "../Components/UI/InputText";

function Domacinstva() {
  return (
    <div className={classes.allDomacinstva}>
      <DomacinstvoCard
        className={classes.Domacinstvo}
        NazivDomacinstva="Domacinstvo Maletic"
        adresa="Neka random adresa1"
        brojTelefona="0669446083"
      />
      <DomacinstvoCard
        className={classes.Domacinstvo}
        NazivDomacinstva="Domacinstvo Najdanovic"
        adresa="Neka random adresa2"
        brojTelefona="06512312323"
      />
      <DomacinstvoCard
        className={classes.Domacinstvo}
        NazivDomacinstva="Domacinstvo Momcilovic"
        adresa="Neka random adresa2"
        brojTelefona="06512212524"
      />
      <InputText label="label" placeholder="unesi tekst" />
    </div>
  );
}

export default Domacinstva;
