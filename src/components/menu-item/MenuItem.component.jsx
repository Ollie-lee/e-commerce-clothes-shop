import React from "react";

import "./Menuitem.styles.scss";

export default function MenuItem({ title, sneaker, imageUrl, big }) {
  MenuItem.defaultProps = {
    sneaker: false,
    big: false,
  };
  const style = { backgroundImage: `url(${imageUrl})` };
  return (
    <div
      className={`menu-item ${sneaker && "menu-sneakers"} ${big && "big"}`}
      style={style}
    >
      <div className='content'>
        <h1 className='title'>{title}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
}
