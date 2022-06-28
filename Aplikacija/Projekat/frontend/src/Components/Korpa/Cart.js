import { useContext, useEffect, useState } from 'react';

import classes from './Cart.module.css';
import classes2 from './CartItem.module.css';
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom';
import CartModal from './CartModal';
import s2 from '../../pictures/f.png';
import { ExtractData } from "../../helper/extract.js";

const Cart = (props) => {
  
  const [open, setOpen] = useState(false);
  const [dostava,setDostava] = useState(0);
  const token = localStorage.getItem("Token");


  const handleClose = () => {
    setOpen(false);
  };

  const {
    isEmpty,
    totalUniqueItems,
    items,
    inCart,
    updateItemQuantity,
    removeItem,
    emptyCart,
    cartTotal,
  } = useCart();

  const history = useHistory();

  if (isEmpty)
    return (
      <div className={classes.center}>
        <br/>
        <br/>
        <h2>Vaša korpa je trenutno prazna. Naručite proizvode!</h2>
      </div>
  );

  const idKorisnika = ExtractData(token,"serialnumber");

  const UpdateQuantityMinus=(itemID,itemQuantity)=>
  {
    console.log(itemQuantity);
    if(itemQuantity==0)
    {
      const response = fetch('https://localhost:5001/Narudzbine/ObrisiNarudzbinu/'+idKorisnika+'/'+itemID,{
        method:'DELETE',
        body:JSON.stringify({title:'Uspesno dodatno'}),
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
    else
    {
      const response = fetch('https://localhost:5001/Narudzbine/PromenitiKvantitet/'+idKorisnika+'/'+itemID+'/'+itemQuantity,{
        method:'PUT',
        body:JSON.stringify({title:'Uspesno dodatno'}),
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
    updateItemQuantity(itemID,itemQuantity);
  }

  const UpdateQuantityPlus=(itemID,itemQuantity)=>
  {
    console.log(itemQuantity);

      const response = fetch('https://localhost:5001/Narudzbine/PromenitiKvantitet/'+idKorisnika+'/'+itemID+'/'+itemQuantity,{
        method:'PUT',
        body:JSON.stringify({title:'Uspesno dodatno'}),
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    
    updateItemQuantity(itemID,itemQuantity);
  }

  const RemoveItem = (itemID) =>
  {
    const response = fetch('https://localhost:5001/Narudzbine/ObrisiNarudzbinu/'+idKorisnika+'/'+itemID,{
        method:'DELETE',
        body:JSON.stringify({title:'Uspesno dodatno'}),
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      removeItem(itemID);
  }

  async function onNaruciHandler() 
  {

    // const response = fetch('https://localhost:5001/Narudzbine/IzracunajDostavu/'+idKorisnika,
    // {
    //   headers:{
    //     'Content-Type':'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }
    // }).then(setDostava( await response.json())).then(setOpen(true));
    

            var req = new XMLHttpRequest();
            req.open('GET','https://localhost:5001/Narudzbine/IzracunajDostavu/'+idKorisnika, false);
            req.setRequestHeader('Authorization', 'Bearer ' + token);
            req.onload  = function() {
               var jsonResponse = JSON.parse(req.responseText);
               // do something with jsonResponse
               console.log(jsonResponse);
               setDostava(jsonResponse);
            };
            req.send(null);
            setOpen(true);
  }

  async function onPrihvatiHandler()
  {
          var datum = fetch("https://localhost:5001/Narudzbine/PreuzetiNarudzbine/" + idKorisnika)
          .then((response) => response.json())
          .then((data) => {
          return Promise.all(data.map(item => {
          return fetch("https://localhost:5001/Kupovina/DodatiKupovinu/"+item.proizvodFK+"/"+idKorisnika+"/"+item.dostavljacFK+"/"+item.brojProizvoda,{
          method:'POST',
          body:JSON.stringify({title:'Uspesno dodatno'}),
          headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
          }})
            .then(data => {
              item["filters"] = data
              return item
            })
           }));
              }).then(
                fetch("https://localhost:5001/Narudzbine/ObrisiNarudzbine/"+idKorisnika,{
                  method:'DELETE',
                  body:JSON.stringify({title:'Uspesno dodatno'}),
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                })
      ).then(emptyCart()).then(handleClose())
  }

  console.log(items);
    //za dugmice "-" napraviti funkciju koja zove updateItemQuantity i ako je item.quantity==0 pozvati obrisatiNarudzvinuController,slicno za remove
  return (
    <div>
      <ul>
        {items.map((item)=>(

            <li key={item.id} className={classes2["cart-item"]}>
            <div>
              <h3>{item.name}</h3>
              <div className={classes2.summary}>
                <span className={classes2.price}>{item.price}.00 din</span>
                <span className={classes2.amount}>x {item.quantity}</span>
              </div>
            </div>

          <div className={classes2.actions}>
            <button onClick={()=>UpdateQuantityMinus(item.id, +item.quantity - 1)}>−</button>
            <button onClick={()=>UpdateQuantityPlus(item.id, +item.quantity + 1)}>+</button>
            <button onClick={() => RemoveItem(item.id)}><ion-icon name="trash"></ion-icon></button>
          </div>
          </li>
        ))}
         <div className={classes.actions}>
            <button onClick={onNaruciHandler}className={classes.button}>Naruči</button>
            <button onClick={()=>{ history.push({ pathname: "/Domacinstva"})}} className={classes.button}>Vrati se na šoping <ion-icon name="cart"></ion-icon></button>
          </div>
            <CartModal
            show={open}
            dost={dostava}
            onClose={handleClose}
            onPrihvati={onPrihvatiHandler}
            />
      </ul>
    </div>
  );
};
export default Cart;

