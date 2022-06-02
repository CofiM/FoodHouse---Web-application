import classes from './CartItem.module.css';
import { useCart } from "react-use-cart";

const CartItem = (props) => {
 

  const {updateItemQuantity,removeItem}=useCart();

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.naziv}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{props.cena}</span>
          <span className={classes.amount}>x {props.kolicina}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={()=>updateItemQuantity(props.id,-1)}>−</button>
        <button onClick={()=>updateItemQuantity(props.id,1)}>+</button>
        <button onClick={()=>removeItem(props.id)}>Obrisi</button>
      </div>
    </li>
  );
};

export default CartItem;