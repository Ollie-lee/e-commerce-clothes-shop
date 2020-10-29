import React, { useState } from "react";
import { SHOP_DATA } from "../../data/shop_data";
import CollectionPreview from "../../components/preview-collection/preview-collection.component";

export default function ShopPage() {
  const [collections, setcollections] = useState(SHOP_DATA);
  return (
    <div className='shop-page'>
      <h1>SHop Page</h1>
      {collections.map(({ id, ...collection }) => (
        <CollectionPreview {...collection} key={id} />
      ))}
    </div>
  );
}
