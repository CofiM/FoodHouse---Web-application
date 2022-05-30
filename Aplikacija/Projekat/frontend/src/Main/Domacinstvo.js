import React, { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import classes from "./Domacinstvo.module.css";
import ModalComment from "./CommentModal";

function Domacinstvo() {
  const ID = JSON.parse(localStorage.getItem("DomacinstvoID"));
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [productShowcomment, setProductShowcomment] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const onClickCommentHandler = (ID) => {
    setProductShowcomment(product.find((el) => el.ID == ID));
    console.log(productShowcomment);
    setOpen(true);
  };
  useEffect(() => {
    const fetchProductHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Proizvod/PreuzetiProizvodeZaDomacinstvo/" + ID
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
            onClickComment={() => onClickCommentHandler(prod.ID)}
          />
        ))}
      </div>
      <div>
        {open && (
          <ModalComment
            show={open}
            komentar={productShowcomment.Komentari}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default Domacinstvo;
