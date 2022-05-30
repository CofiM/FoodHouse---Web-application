import React, { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import classes from "./Domacinstvo.module.css";

function Domacinstvo() {
  const ID = JSON.parse(localStorage.getItem("DomacinstvoID"));
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProductHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Proizvod/PreuzetiProizvodeZaDomacinstvo/" + ID
      );
      const data = await response.json();
      console.log(data);
      const transformedDataProduct = data.map(function (prod) {
        let pros = 0;
        prod.recenzije.forEach((el) => {
          pros += el.ocena;
        });
        pros = pros / prod.recenzije.length;
        return {
          ID: prod.id,
          Cena: prod.cena,
          Kategorija: prod.kategorija,
          Kolicina: prod.kolicina,
          Naziv: prod.naziv,
          Opis: prod.opis,
          Ocena: pros,
        };
      });
      setProduct(transformedDataProduct);
    };
    fetchProductHandler();
  }, []);
  console.log(product);
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
            ocena={prod.Ocena}
          />
        ))}
      </div>
    </div>
  );
}

export default Domacinstvo;
