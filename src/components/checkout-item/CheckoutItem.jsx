import React from 'react';

import './checkout-item.scss';

export default function CheckoutItem({
  item: { name, imageUrl, price, quantity },
}) {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price * quantity}</span>
      <div className="remove-button"> &#10005;</div>
    </div>
  );
}
