import React, { useState, useEffect } from "react";
import ProizvodCardRating from "../Components/Proizvod/ProizvodCardRating";

function ProbaZaOcenjivanje() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Proizvod/PreuzetiProizvodeZaDomacinstvo/1"
      );
      const data = await response.json();
      console.log(data);
      let comments = [];
      const transformedDataProduct = data.map(function (prod) {
        let pros = 0;
        prod.recenzije.forEach((el) => {
          pros += el.ocena;
          comments.push(el.komentar);
        });
        console.log(comments);
        let kom = comments;
        comments = [];
        pros = pros / prod.recenzije.length;
        return {
          ID: prod.id,
          Cena: prod.cena,
          Kategorija: prod.kategorija,
          Kolicina: prod.kolicina,
          Naziv: prod.naziv,
          Opis: prod.opis,
          Ocena: pros,
          Komentari: kom,
        };
      });
      setProducts(transformedDataProduct);
    };
    fetchProductHandler();
  }, []);
  return (
    <div>
      {products.map((prod) => (
        <ProizvodCardRating
          naziv={prod.Naziv}
          kolicina={prod.Kolicina}
          cena={prod.Cena}
          opis={prod.Opis}
        />
      ))}
    </div>
  );
}

export default ProbaZaOcenjivanje;
