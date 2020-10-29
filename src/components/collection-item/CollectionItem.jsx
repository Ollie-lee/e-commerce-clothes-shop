import React from "react";

import "./CollectionItem.scss";

export default function CollectionItem({ imageUrl, name, price }) {
  return (
    <div className='collection-item'>
      <div
        className='bg-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
    </div>
  );
}
