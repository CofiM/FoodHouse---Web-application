import React,{ useRef } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Proizvod.module.css';
import slicica from '../../pictures/logo.png';
import cartCtx from '../Korpa/CartContext';
import ImageGallery from './ImageGallery';
import { useEffect } from 'react';
import { CartProvider, useCart } from "react-use-cart";


const Proizvod = (props) => {
  


  const amountInputRef=useRef();

  const location = useLocation();

  const{inCart,addItem,updateItemQuantity,getItem}=useCart();

  const ID = JSON.parse(localStorage.getItem("DomacinstvoID"));

  useEffect(() => {
    console.log(location.pathname); 
    console.log(location.search); 
    console.log(location.product); 
  }, [location]);

  console.log(location.product)

  let item = JSON.parse(JSON.stringify(location.product));
  let proba = {
    id:item.ID,
    name:item.Naziv,
    price:item.Cena,
    quantity:item.Kolicina,
  }

  const checkItem = ()=> {
    let check = inCart(proba.id);
    console.log(check);
    if(check === true)
    {
      let temp = getItem(proba.id);
      console.log(temp);
      let br1 = +amountInputRef.current.value;
      let br2 = +temp.quantity;
      let sab = br1+br2;
      updateItemQuantity(proba.id,sab.toString());
    }
    else
    {
      addItem(proba,amountInputRef.current.value);
    }
  }

    return (
          <div  className = {classes['card-wrapper']}>
            <ImageGallery/>
        
          <div className = {classes['product-content']}>
            <h2 classname = {classes['product-title']}>{location.product.Naziv}</h2>
            <a href = '#' classname = {classes['product-link']}>visit nike store</a>
  
            <div className = {classes['product-price']}>
              <p className = 'new-price'>New Price: <span>{location.product.Cena}</span></p>
            </div>
  
            <div className = {classes['product-detail']}>
              <h2>O proizvodu: </h2>
              <p>{location.product.Opis}</p>
            </div>

            <div className = {classes['purchase-info']}>
              <input ref={amountInputRef} type='number' min='1' max='100' step='1' defaultValue='1'/>
              <button onClick={checkItem} type = 'button' className = {classes.btn}>
                Dodaj u korpu
              </button>
            </div>       
          </div>
      </div>
  );
};

export default Proizvod;
