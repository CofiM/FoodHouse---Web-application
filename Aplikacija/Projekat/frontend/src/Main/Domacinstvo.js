import React, { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import classes from "./Domacinstvo.module.css";
import ModalComment from "../Components/Proizvod/CommentModal";
import { useHistory } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import WarningModal from "../Components/Domacinstvo/WarningModal";
import { ExtractData } from "../helper/extract.js";

function Domacinstvo() {
  const Adresa = localStorage.getItem("DomacinstvoAdresa");
  //const ID = localStorage.getItem("DomacinstvoID");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();
  const [ratingOfDomacinstvo, setRatingOfDomacinstvo] = useState(0.0);
  const [domacinstvo, setDomacinstvo] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("Token");

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
    let token = localStorage.getItem("Token");
    let korisnik;
    if (token == null) {
      korisnik = null;
    } else {
      korisnik = ExtractData(token, "role");
    }
    if (korisnik != null) {
      const p = products.find((el) => el.ID == ID);
      console.log(p);
      history.push({ pathname: "/Proizvod", product: p });
      console.log(p.Cena);
      localStorage.setItem("CenaProizvoda", p.Cena);
      localStorage.setItem("IdProizvoda", p.ID);
      localStorage.setItem("KategorijaProizvoda", p.Kategorija);
      localStorage.setItem("KolicinaProizvoda", p.Kolicina);
      localStorage.setItem("NazivProizvoda", p.Naziv);
      localStorage.setItem("OpisProizvoda", p.Opis);
    } else {
      setOpenWarning(true);
    }
  };

  useEffect(() => {
    const fetchProductHandler = async () => {
      console.log("uslo");
      const response = await fetch(
        "https://localhost:5001/Proizvod/PreuzetiProizvodeZaDomacinstvoAdresa/" +
          Adresa,
        { headers: { Authorization: `Bearer ${token}` } }
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
        if (prod.recenzije.length > 0) {
          pros = pros / prod.recenzije.length;
        }
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
      setIsLoaded(true);
    };
    const fetchDomacinstvoHandler = async () => {
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/PreuzmiDomacinstvoAdresa/" + Adresa,
        { headers: { Authorization: `Bearer ${token}` } }
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
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.RatingWrap}>
        <h1>{domacinstvo.naziv}</h1>
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
            key={prod.ID}
            className={classes.Product}
            idProizvoda={prod.ID}
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
