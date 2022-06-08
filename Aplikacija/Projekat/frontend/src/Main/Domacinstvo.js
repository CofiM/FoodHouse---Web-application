import React, { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import classes from "./Domacinstvo.module.css";
import ModalComment from "./CommentModal";
import { useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import WarningModal from "../Components/Domacinstvo/WarningModal";

function Domacinstvo() {
  const ID = localStorage.getItem("DomacinstvoID");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();
  const [ratingOfDomacinstvo, setRatingOfDomacinstvo] = useState(0.0);
  const [domacinstvo, setDomacinstvo] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseWarning = () => {
    setOpenWarning(false);
  };
  const onClickCommentHandler = (ID) => {
    setProduct(products.find((el) => el.ID == ID));
    console.log(product);
    setOpen(true);
  };
  const history = useHistory();
  const onClickCartHandler = (ID) => {
    let korisnik = localStorage.getItem("Korisnik");
    if (korisnik != null) {
      const p = products.find((el) => el.ID == ID);
      history.push({ pathname: "/Proizvod", product: p });
    } else {
      setOpenWarning(true);
    }
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
      let rating = 0;
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
        console.log(pros);
        if (prod.recenzije.length > 0) {
          rating = rating + pros;
          console.log(rating);
        }
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
      rating = rating / transformedDataProduct.length;
      console.log(rating);
      setRatingOfDomacinstvo(rating);
    };
    const fetchDomacinstvoHandler = async () => {
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/PreuzmiDomacinstvo/" + ID
      );
      const data = await response.json();
      setDomacinstvo(data);
    };
    fetchDomacinstvoHandler();
    fetchProductHandler();
  }, []);
  console.log(products);
  console.log(ratingOfDomacinstvo);
  console.log(domacinstvo);
  return (
    <div>
      <div>
        {domacinstvo.naziv}
        <Rating
          name="read-only"
          value={ratingOfDomacinstvo}
          readOnly
          sx={{ fontSize: "40px" }}
        />
      </div>
      <div className={classes.allProducts}>
        {products.map((prod) => (
          <ProizvodCard
            className={classes.Product}
            naziv={prod.Naziv}
            kolicina={prod.Kolicina}
            cena={prod.Cena}
            opis={prod.Opis}
            ocena={prod.Ocena}
            onClickComment={() => onClickCommentHandler(prod.ID)}
            onClickCart={() => onClickCartHandler(prod.ID)}
          />
        ))}
      </div>
      <div>
        {open && (
          <ModalComment
            show={open}
            komentar={product.Komentari}
            onClose={handleClose}
          />
        )}
      </div>
      <div>
        {openWarning && (
          <WarningModal show={openWarning} onClose={handleCloseWarning} />
        )}
      </div>
    </div>
  );
}

export default Domacinstvo;
