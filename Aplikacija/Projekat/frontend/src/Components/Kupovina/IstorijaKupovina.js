import classes from "./IstorijaKupovina.module.css";
import IstorijaKupovinaCard from "./IstorijaKupovinaCard";
import { useState, useEffect } from "react";
import ProizvodCardRating from "../Proizvod/ProizvodCardRating";
import ModalInput from "../../Main/ModalInput";

const IstorijaKupovina = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  const onReviewHandler = (ID) => {
    console.log(ID);
    setProduct(products.find((el) => el.Proizvod === ID));
    setOpen(true);
  };

  async function onClickSaveReviewHandler(val, comm) {
    console.log(product);
    const response = await fetch(
      "https://localhost:5001/Recenzija/DodatiRecenziju/" +
        val +
        "/" +
        comm +
        "/" +
        product.Proizvod +
        "/" +
        product.Kupovina,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setOpen(false);
    window.location.reload(false); //REFRESH PAGE
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const ID = localStorage.getItem("KorisnikID");

      const response = await fetch(
        "https://localhost:5001/Kupovina/PreuzetiKupovineZaKorisnika/" + ID
      );
      const data = await response.json();
      console.log(data);
      const transformedDataOrders = data.map(function (d) {
        return {
          Ime: d.ime,
          Prezime: d.prezime,
          AdresaKorisnika: d.adresaKorisnika,
          NazivProizvoda: d.proizvodNaziv,
          KolicinaProizvoda: d.kolicinaProizvoda,
          NazivDomacinstva: d.domacinstvoNaziv,
          AdresaDomacinstva: d.domacinstvoAdresa,
        };
      });
      setOrders(transformedDataOrders);
      console.log(data);
      const transformedDataProducts = data.map(function (d) {
        return {
          Kupovina: d.id,
          Proizvod: d.proizvodID,
          Cena: d.proizvodCena,
          Naziv: d.proizvodNaziv,
          Opis: d.proizvodOpisa,
          Show: d.show,
        };
      });
      let arr = [];
      for (let i = 0; i < transformedDataProducts.length; i++) {
        for (let j = i + 1; j < transformedDataProducts.length; j++) {
          if (
            transformedDataProducts[i].Proizvod ==
            transformedDataProducts[j].Proizvod
          ) {
            arr.push(j);
          }
        }
      }
      var newArray = [];
      var newArray = arr.filter(function (elem, pos) {
        return arr.indexOf(elem) == pos;
      });
      console.log(newArray);
      newArray.sort((a, b) => b - a);
      console.log(newArray);
      newArray.forEach((el) => {
        console.log(el);
        transformedDataProducts.splice(el, 1);
      });
      transformedDataProducts.forEach((el) => {
        console.log("USLOOOO");
        let index = transformedDataProducts.indexOf(el);
        console.log(index);
        if (el.Show == 0) {
          console.log("SPLICE");
          transformedDataProducts.splice(index, 1);
        }
      });
      console.log(transformedDataProducts);
      if (
        transformedDataProducts.length == 1 &&
        transformedDataProducts[0].Show == 0
      ) {
        console.log("USLOOOO U IFFFF");
        setProducts([]);
      } else {
        setProducts(transformedDataProducts);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={classes.mainStyle}>
      <div className={classes.infHeader}>
        <p> Istorija kupovina</p>
      </div>
      <div>
        {orders.map((d) => {
          return (
            <IstorijaKupovinaCard
              nazivProizvoda={d.NazivProizvoda}
              kolicinaProizvoda={d.KolicinaProizvoda}
              domacinstvoNaziv={d.NazivDomacinstva}
              domacinstvoAdresa={d.AdresaDomacinstva}
            />
          );
        })}
      </div>
      <div className={classes.allProduct}>
        {products.map((prod) => (
          <ProizvodCardRating
            idProizvoda = {prod.Proizvod}
            className={classes.Product}
            naziv={prod.Naziv}
            kolicina={prod.Kolicina}
            cena={prod.Cena}
            opis={prod.Opis}
            onClick={() => onReviewHandler(prod.Proizvod)}
          />
        ))}
      </div>
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
};

export default IstorijaKupovina;
