import React from "react";
import { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import ModalComment from "./CommentModal";
import { useHistory } from "react-router-dom";
import classes from "./ViewProduct.module.css";
import WarningModal from "../Components/Domacinstvo/WarningModal";

const ViewProducts = () => {
  const category = localStorage.getItem("Category");
  const [value, setValue] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();
  const [openWarning, setOpenWarning] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const onClickCommentHandler = (ID) => {
    setProduct(allProducts.find((el) => el.ID == ID));
    console.log(product);
    setOpen(true);
  };
  const history = useHistory();
  const onClickCartHandler = (ID) => {
    let korisnik = localStorage.getItem("Korisnik");
    if (korisnik != null) {
      const p = allProducts.find((el) => el.ID == ID);
      history.push({ pathname: "/Proizvod", product: p });
    } else {
      setOpenWarning(true);
    }
  };
  const handleCloseWarning = () => {
    setOpenWarning(false);
  };
  useEffect(() => {
    async function fetchProductsHandler() {
      const response = await fetch(
        "https://localhost:5001/Proizvod/PreuzetiProizvodeZaKategoriju/" +
          category,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );

      const data = await response.json();

      let comments = [];
      const products = data.map(function (prod) {
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

      setAllProducts(products);
      console.log(products);
    }
    fetchProductsHandler();
    localStorage.removeItem("Category");
  }, []);

  const sortArray = [
    {
      value: 1,
      label: "Po abecedi",
    },
    {
      value: 2,
      label: "Po ceni u rastućem",
    },
    {
      value: 3,
      label: "Po ceni u opadajućem",
    },
  ];

  const arrayProducts = (e) => {
    let newState = [...allProducts];
    setValue(e.target.value);

    if (e.target.value == 1) {
      console.log(newState);
      {
        newState
          .sort((a, b) => (a.naziv > b.naziv ? 1 : -1))
          .map((product) => (
            <ProizvodCard
              naziv={product.naziv}
              opis={product.opis}
              cena={product.cena}
              kolicina={product.kolicina}
            />
          ));
      }
    } else if (e.target.value == 2) {
      {
        newState
          .sort((a, b) => (a.cena > b.cena ? 1 : -1))
          .map((product) => (
            <ProizvodCard
              naziv={product.naziv}
              opis={product.opis}
              cena={product.cena}
              kolicina={product.kolicina}
            />
          ));
      }
    } else if (e.target.value == 3) {
      {
        newState
          .sort((a, b) => (a.cena < b.cena ? 1 : -1))
          .map((product) => (
            <ProizvodCard
              naziv={product.naziv}
              opis={product.opis}
              cena={product.cena}
              kolicina={product.kolicina}
            />
          ));
      }
    }
    //  setValue(true);
    setAllProducts(newState);
    console.log(newState);
  };

  return (
    <div>
      <div className={classes.positionSelect}>
        <select className={classes.sortSelect} onChange={arrayProducts}>
          {sortArray.map((option) => (
            <option value={option.value}>{option.label} </option>
          ))}
        </select>
      </div>

      <div className={classes.allProducts}>
        {allProducts.map((prod) => (
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

        {/* { allProducts 
                    .sort((a, b) => { return a.cena > b.cena ? 1 : -1 })
                    .map(({product }) => (
                    <ProizvodCard
                    naziv={product.naziv}
                    opis = {product.opis}
                    cena= {product.cena}
                    kolicina = {product.kolicina}
                    />
                ))} */}
        <div>
          {open && (
            <ModalComment
              show={open}
              komentar={product.Komentari}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
      <div>
        {openWarning && (
          <WarningModal show={openWarning} onClose={handleCloseWarning} />
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
