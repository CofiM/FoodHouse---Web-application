import React from "react";
import { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";
import ModalComment from "../Components/Proizvod/CommentModal";
import { useHistory } from "react-router-dom";
import classes from "../Components/Proizvod/Proizvod.module.css";
import WarningModal from "../Components/Domacinstvo/WarningModal.js";

const ViewProductsName = () => {
  const [value, setValue] = useState(1);

  const name = localStorage.getItem("Name");
  console.log(name);
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
    if (localStorage.getItem("Korisnik") == null) {
      setOpenWarning(true);
    } else {
      const p = allProducts.find((el) => el.ID == ID);
      localStorage.setItem("DomacinstvoID", p.IDDomacinstva);
      history.push({ pathname: "/Proizvod", product: p });
      localStorage.setItem("CenaProizvoda", p.Cena);
      localStorage.setItem("IdProizvoda", p.ID);
      localStorage.setItem("KategorijaProizvoda", p.Kategorija);
      localStorage.setItem("KolicinaProizvoda", p.Kolicina);
      localStorage.setItem("NazivProizvoda", p.Naziv);
      localStorage.setItem("OpisProizvoda", p.Opis);
    }
  };
  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  useEffect(() => {
    async function fetchProductsHandler() {
      const response = await fetch(
        "https://localhost:5001/Proizvod/PreuzetiProizvodeNaziv/" + name,
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
          IDDomacinstva: prod.idDomacinstva,
        };
      });

      setAllProducts(products);
      console.log(products);
    }
    fetchProductsHandler();
    //  localStorage.removeItem("Name");
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
    {
      value: 4,
      label: "Po oceni",
    },
  ];

  const arrayProducts = (e) => {
    let newState = [...allProducts];
    setValue(e.target.value);

    if (e.target.value == 1) {
      console.log(newState);
      {
        newState
          .sort((a, b) => (a.Naziv > b.Naziv ? 1 : -1))
          .map((prod) => (
            <ProizvodCard
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
          ));
      }
    } else if (e.target.value == 2) {
      {
        newState
          .sort((a, b) => (a.Cena > b.Cena ? 1 : -1))
          .map((prod) => (
            <ProizvodCard
              idProizvoda={prod.ID}
              className={classes.Product}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    } else if (e.target.value == 3) {
      {
        newState
          .sort((a, b) => (a.Cena < b.Cena ? 1 : -1))
          .map((prod) => (
            <ProizvodCard
              idProizvoda={prod.ID}
              className={classes.Product}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    } else if (e.target.value == 4) {
      {
        newState
          .sort((a, b) => (a.Ocena < b.Ocena ? 1 : -1))
          .map((prod) => (
            <ProizvodCard
              idProizvoda={prod.ID}
              className={classes.Product}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    }
    //setValue(true);
    setAllProducts(newState);
    console.log(newState);
  };

  return (
    <div>
      <div className={classes.positionSelect}>
        <select
          defaultValue={1}
          className={classes.sortSelect}
          onChange={arrayProducts}
        >
          {sortArray.map((option) => (
            <option value={option.value}>{option.label} </option>
          ))}
        </select>
      </div>

      <div className={classes.allProducts}>
        {allProducts.map((prod) => (
          <ProizvodCard
            idProizvoda={prod.ID}
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
    </div>
  );
};

export default ViewProductsName;
