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
    setProduct(products.find((el) => el.ID === ID));
    setOpen(true);
  };
  console.log(product);
  async function onClickSaveReviewHandler(val, comm) {
    const response = await fetch(
      "https://localhost:5001/Recenzija/DodatiRecenziju/" +
        val +
        "/" +
        comm +
        "/" +
        product.ID +
        "/" +
        product.IDKupovine,
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
          IDKupovine: d.id,
          ID: d.proizvodID,
          Kolicina: d.proizvodKolicina,
          Cena: d.proizvodCena,
          Naziv: d.proizvodNaziv,
          Opis: d.proizvodOpisa,
          Show: d.show,
        };
      });
      console.log(transformedDataProducts);
      const arr = [
        ...new Map(
          transformedDataProducts.map((item) => [JSON.stringify(item), item])
        ).values(),
      ];
      setProducts(arr);
      console.log(arr);
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
      <div>
        {products.map((prod) => (
          <ProizvodCardRating
            naziv={prod.Naziv}
            kolicina={prod.Kolicina}
            cena={prod.Cena}
            opis={prod.Opis}
            onClick={() => onReviewHandler(prod.ID)}
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
