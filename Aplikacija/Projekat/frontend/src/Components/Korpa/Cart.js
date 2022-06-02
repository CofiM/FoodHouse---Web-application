import { useContext, useEffect, useState } from "react";
import classes2 from "./CartItem.module.css";
import { CartProvider, useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import React from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "./CartContext";

const Cart = (props) => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const history = useHistory();

  if (isEmpty)
    return (
      <div>
        <p>prazno...</p>
      </div>
    );
  console.log(items);

  return (
    <>
      <ul>
        {items.map((item) => (
          <li className={classes2["cart-item"]}>
            <div>
              <h2>{item.name}</h2>
              <div className={classes2.summary}>
                <span className={classes2.price}>{item.price}</span>
                <span className={classes2.amount}>x {item.quantity}</span>
              </div>
            </div>
            <div className={classes2.actions}>
              <button
                onClick={() => updateItemQuantity(item.id, +item.quantity - 1)}
              >
                −
              </button>
              <button
                onClick={() => updateItemQuantity(item.id, +item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeItem(item.id)}>
                <ion-icon name="trash"></ion-icon>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.total}>
        <span>Ukupan racun</span>
        <span>{cartTotal}.00 din</span>
      </div>
      <div className={classes.actions}>
        <button className={classes.button}>Naruci</button>
        <button
          onClick={() => {
            history.push({ pathname: "/Naslovna" });
          }}
          className={classes.button}
        >
          Vrati se na soping <ion-icon name="cart"></ion-icon>
        </button>
      </div>
    </>
  );
};
export default Cart;
