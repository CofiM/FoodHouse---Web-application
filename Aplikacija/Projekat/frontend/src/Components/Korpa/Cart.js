import { useContext,useEffect } from 'react';

import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from './CartContext';






const Cart = (props) => {
  // const cartCtx = useContext(CartContext);
  // console.log(cartCtx)
  // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // const hasItems = cartCtx.items.length > 0;

  // const cartItemRemoveHandler = (id) => {
  //   cartCtx.removeItem(id);
  // };

  // const cartItemAddHandler = (item) => {
  //   cartCtx.addItem({ ...item, amount: 1 });
  // };

  // const cartItemDeleteHandler = (id) => {
  //   cartCtx.deleteItem(id);
  // };

  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = props.cart.filter((item) => item.id !== id);
    props.setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    props.cart.map((item) => (ans += item.amount * item.price));
    props.setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  const cartItems = (
    <ul className={classes['cart-items']}>
      {props.cart.map((item) => (
        <CartItem
          key={item.id}
          thatItem={item}
           // onRemove={props}
          // onAdd={cartItemAddHandler.bind(null, item)}
          // onDelete={cartItemDeleteHandler.bind(null,item.id)}
          onChangeAmount={props.handleChange}
          onRemove={props.handleRemove}
        />
      ))}
    </ul>
  );

  return (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </div>
        

  );
};

export default Cart;