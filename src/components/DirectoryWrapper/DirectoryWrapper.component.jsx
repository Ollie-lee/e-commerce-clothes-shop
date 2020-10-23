import React, { useState } from "react";
import { sections } from "./directory.data";
import MenuItem from "../../components/menu-item/MenuItem.component";
import Directory from "../../components/Directory/Directory.component";

export default function DirectoryWrapper() {
  const [menuItems, setMenuItems] = useState(sections);
  const upperItems = menuItems.slice(0, 3);
  const lowerItems = menuItems.slice(3, 5);

  return (
    <>
      <Directory columnWidth='30rem'>
        {upperItems.map((item, i) =>
          i === 2 ? (
            <MenuItem key={item.id} {...item} sneaker={true} />
          ) : (
            <MenuItem key={item.id} {...item} />
          )
        )}
      </Directory>

      <Directory columnWidth='50rem'>
        {lowerItems.map((item) => (
          <MenuItem key={item.id} {...item} big={true} />
        ))}
      </Directory>
    </>
  );
}
