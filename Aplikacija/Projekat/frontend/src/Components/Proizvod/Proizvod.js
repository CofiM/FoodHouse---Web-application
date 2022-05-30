import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Proizvod.module.css";
import slicica from "../../pictures/logo.png";
import cartCtx from "../Korpa/CartContext";
import ImageGallery from "./ImageGallery";
import CartProvider from "../Korpa/CartProvider";

const Proizvod = (props) => {
  // const amountInputRef=useRef();
  // const addToCartHandler = () => {
  //    const amount = amountInputRef.current.value;
  //   cartCtx.addItem({
  //     id: props.id,
  //     name: props.name,
  //     amount: amount,
  //     price: props.price
  //   });
  // };
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.product); // result: 'some_value'
  }, [location]);

  return (
    <div className={classes["card-wrapper"]}>
      <ImageGallery />

      <div className={classes["product-content"]}>
        <h2 classname={classes["product-title"]}>{location.product.Naziv}</h2>
        <a href="#" classname={classes["product-link"]}>
          visit nike store
        </a>

        <div className={classes["product-price"]}>
          <p className="new-price">
            New Price: <span>{location.product.Cena}</span>
          </p>
        </div>

        <div className={classes["product-detail"]}>
          <h2>O proizvodu: </h2>
          <p>{location.product.Opis}</p>
        </div>

        <div className={classes["purchase-info"]}>
          <input
            //ref={amountInputRef}
            type="number"
            min="1"
            max="100"
            step="1"
            defaultValue="1"
          />
          <button
            onClick={props.handleClick(location.product.ID)}
            type="button"
            className={classes.btn}
          >
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proizvod;
