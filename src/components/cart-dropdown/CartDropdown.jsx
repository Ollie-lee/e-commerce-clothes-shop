import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/CustomButton';
import CartItem from '../cart-item/CartItem';

import './cart-dropdown.scss';

export const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem kry={item.id} item={item} />
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = ({ cart: { cartItems } }) => ({ cartItems });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
