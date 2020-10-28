import React from "react";

import "./Menuitem.styles.scss";

export default function MenuItem({ title, sneaker, imageUrl, big }) {
  MenuItem.defaultProps = {
    sneaker: false,
    big: false,
  };
  const style = { backgroundImage: `url(${imageUrl})` };
  return (
    <div className={`menu-item ${sneaker && "menu-sneakers"} ${big && "big"}`}>
      <div className='background-image' style={style}>
        {/* decouple the background image from the menu item,
        we only need to the background image to increase*/}
        <div className='content'>
          <h1 className='title'>{title.toUpperCase()}</h1>
          <span className='subtitle'>SHOP NOW</span>
        </div>
      </div>
    </div>
  );
}
