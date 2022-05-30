import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: function (item) {},
  removeItem: function (id) {},
  deleteItem: function (id)  {}
});

export default CartContext;