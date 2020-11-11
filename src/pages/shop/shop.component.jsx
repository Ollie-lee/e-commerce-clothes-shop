import React from 'react';

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';

function ShopPage({ collections }) {
  return (
    <div className="shop-page">
      <h1>SHop Page</h1>
      <CollectionsOverview />
    </div>
  );
}

export default ShopPage;
