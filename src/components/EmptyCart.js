import React, { Component } from "react";
import emptyCartImg from '../empty-cart.png';

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src={emptyCartImg}
        alt="empty-cart"
      />
      <h2>You cart is empty!</h2>
    </div>
  );
};

export default EmptyCart;