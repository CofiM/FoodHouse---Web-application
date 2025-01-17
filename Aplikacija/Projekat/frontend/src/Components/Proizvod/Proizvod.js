import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Proizvod.module.css";
import ImageGallery from "./ImageGallery";
import { useCart } from "react-use-cart";
import CheckBox from "../Proizvod/CheckBox";
import { ExtractData } from "../../helper/extract";

const Proizvod = (props) => {

  //const cenaDostave = JSON.parse(localStorage.getItem("CenaDostave"));
  const idDomacinstva = JSON.parse(localStorage.getItem("DomacinstvoID"));
  //const idDostavljaca = JSON.parse(localStorage.getItem("idDostavljaca"));
  
  const imeDomacinstva = localStorage.getItem("naz");
  let token= localStorage.getItem("Token");
  let type = ExtractData(token,"role");
  const [show, setShow] = useState(false);
  const [cenaDostave, setCenaDostave] = useState(0);
  const [idDostavljaca, setIdDostavljaca] = useState(0);

  const idKorisnika = ExtractData(token,"serialnumber");


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/VratiDostavljacaZaDomacinstvo/" +
          idDomacinstva
      );
      const data = await response.json();
      console.log(data.dostavljac);
      console.log(data.dostavljac.cena);
      if (data.dostavljac !== null) {
        setCenaDostave(data.dostavljac.cena);
        setIdDostavljaca(data.dostavljac.id);
        setShow(true);
      }
    }
    fetchData();
  }, []);
  console.log(cenaDostave);
  console.log(idDostavljaca);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [Data, setData] = useState([]);

  const amountInputRef = useRef();

  const location = useLocation();

  const { inCart, addItem, updateItemQuantity, getItem, cartTotal } = useCart();

  var obj;

  const [isLoading, setIsLoading] = useState(false);
  console.log(checked);

  async function fetchAddNewDelivery(dal, count) {
    let temp = 0;
    if (dal === 0) {
      temp = 0;
    } else {
      temp = idDostavljaca;
    }
    console.log(dal);
    const response = await fetch(
      "https://localhost:5001/Narudzbine/DodatiNarudzbinu/" +
        idKorisnika +
        "/" +
        proba.id +
        "/" +
        idDomacinstva +
        "/" +
        temp +
        "/" +
        cenaDostave +
        "/" +
        dal +
        "/" +
        count +
        "/" +
        proba.price +
        "/" +
        proba.name,
      {
        method: "POST",
        body: JSON.stringify({ title: "Uspesno dodatno" }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  const cenaProizvoda = localStorage.getItem("CenaProizvoda");
  const idProizvoda = localStorage.getItem("IdProizvoda");
  const kategorijaProizvoda = localStorage.getItem("KategorijaProizvoda");
  const kolicinaProizvoda = localStorage.getItem("KolicinaProizvoda");
  const nazivProizvoda = localStorage.getItem("NazivProizvoda");
  const opisProizvoda = localStorage.getItem("OpisProizvoda");

  console.log(cenaProizvoda);
  console.log(idProizvoda);
  console.log(kategorijaProizvoda);
  console.log(kolicinaProizvoda);
  console.log(nazivProizvoda);
  console.log(opisProizvoda);

  // let item = JSON.parse(JSON.stringify(location.product));
  let proba = {
    id: idProizvoda,
    name: nazivProizvoda + " - " + imeDomacinstva,
    price: cenaProizvoda,
    quantity: kolicinaProizvoda,
  };

  const checkItem = () => {
    let check = inCart(proba.id);
    let dostavaCheck = 0;
    let count;
    console.log(checked);
    if (check === true) {
      let temp = getItem(proba.id);
      console.log(temp);
      let br1 = +amountInputRef.current.value;
      let br2 = +temp.quantity;
      let sab = br1 + br2;
      updateItemQuantity(proba.id, sab.toString());
      count = sab;
    } else {
      addItem(proba, amountInputRef.current.value);
      count = amountInputRef.current.value;
    }
    if (checked === true) {
      dostavaCheck = 1;
    }
    console.log(count);
    console.log(dostavaCheck);
    console.log(proba.name);
    fetchAddNewDelivery(dostavaCheck, count);
  };

  if (!isLoading) {
    return (
      <div className={classes["card-wrapper"]}>
        <ImageGallery IdSlike={proba.id} />

        <div className={classes["product-content"]}>
          <h2 className={classes["naslov"]}>{nazivProizvoda}</h2>
          <p>Zavisno od proizvoda,cena proizvoda je po komadu ili kilogramu</p>

          <div className={classes["product-price"]}>
            <p className="new-price">
              Cena: <span>{cenaProizvoda}.00 din</span>
            </p>
          </div>

          <div className={classes["product-detail"]}>
            <h2>O proizvodu: </h2>
            <p>{opisProizvoda}</p>
          </div>
          {show && <p>Usluga dostave : {cenaDostave}.00 din</p>}
          {show && (
            <CheckBox label="Dostava" value={checked} onChange={handleChange} />
          )}
          <div className={classes["purchase-info"]}>
            <input
              ref={amountInputRef}
              type="number"
              min="1"
              max="100"
              step="1"
              defaultValue="1"
            />
            <button onClick={checkItem} type="button" className={classes.btn}>
              Dodaj u korpu
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>loading..</p>;
  }
};

export default Proizvod;
