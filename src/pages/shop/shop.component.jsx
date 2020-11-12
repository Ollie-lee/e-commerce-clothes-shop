import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CollectionPage from '../collection/CollectionPage';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';

function ShopPage({ match, location, history }) {
  return (
    <div className="shop-page">
      <h1>SHop Page</h1>
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={() => <CollectionsOverview />}
        />

        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(routeProps) => <CollectionPage {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

export default ShopPage;
