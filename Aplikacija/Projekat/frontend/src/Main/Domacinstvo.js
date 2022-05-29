import React, { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import classes from "./Domacinstvo.module.css";

function Domacinstvo() {
  const ID = JSON.parse(localStorage.getItem("DomacinstvoID"));
  const [domacinstvo, setDomacinstvo] = useState([]);
  const [product, setProduct] = useState([]);
  const [works, setWorks] = useState([]);
  useEffect(() => {
    const fetchDomacinstvoHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/PreuzmiDomacinstvo/" + ID
      );
      const data = await response.json();
      console.log(data);
      const transformedDataProduct = data.proizvodi.map((prod) => {
        return {
          ID: prod.id,
          Cena: prod.cena,
          Kategorija: prod.kategorija,
          Kolicina: prod.kolicina,
          Naziv: prod.naziv,
          Opis: prod.opis,
        };
      });
      const transformedDataWork = data.poslovi.map((work) => {
        return {
          ID: work.id,
          Cena: work.cena,
          Opis: work.opis,
          Datum: work.datum,
          BrojRadnihMesta: work.brojRadnihMesta,
        };
      });
      setProduct(transformedDataProduct);
      setWorks(transformedDataWork);
    };
    fetchDomacinstvoHandler();
  }, []);
  console.log(product);
  console.log(works);
  return (
    <div>
      <div className={classes.allProducts}>
        {product.map((prod) => (
          <ProizvodCard
            className={classes.Product}
            naziv={prod.Naziv}
            kolicina={prod.Kolicina}
            cena={prod.Cena}
            opis={prod.Opis}
          />
        ))}
      </div>
    </div>
  );
}

export default Domacinstvo;
