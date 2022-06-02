import React, { useState, useEffect } from "react";
import ProizvodCardRating from "../Components/Proizvod/ProizvodCardRating";
import ModalInput from "./ModalInput";
import classes from "../Components/Domacinstvo/ChangeDomacinstvoProduct.module.css";

function ProbaZaOcenjivanje() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const onReviewHandler = (ID) => {
    setProduct(products.find((el) => el.ID === ID));
    setOpen(true);
  };
  async function onClickSaveReviewHandler(val, comm) {
    const response = await fetch(
      "https://localhost:5001/Recenzija/DodatiRecenziju/" +
        val +
        "/" +
        comm +
        "/" +
        product.ID,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
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
    <div className={classes.allProducts}>
      {products.map((prod) => (
        <ProizvodCardRating
          naziv={prod.Naziv}
          kolicina={prod.Kolicina}
          cena={prod.Cena}
          opis={prod.Opis}
          onClick={() => onReviewHandler(prod.ID)}
        />
      ))}
      <div>
        {open && (
          <ModalInput
            show={open}
            onClose={handleClose}
            onClickSaveReview={onClickSaveReviewHandler}
          />
        )}
      </div>
    </div>
  );
}

export default ProbaZaOcenjivanje;
