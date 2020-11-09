import React, { Component } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/CustomButton';

import './cart-dropdown.scss';

export const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items"></div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
