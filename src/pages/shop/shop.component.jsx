import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selector';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';

import CollectionPage from '../collection/CollectionPage';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import WithSpinner from '../../components/with-spinner/WithSpinner';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

function ShopPage({
  match,
  isCollectionFetching,
  fetchCollectionsStartAsync,
  isCollectionsLoaded,
}) {
  // fetch(`https://firestore.googleapis.com/v1/projects/crwn-db-9eca7/databases/(default)/documents/collections
  // `)
  //   .then((res) => res.json())
  //   .then((collections) => console.log(collections));

  //observe pattern
  //listen to firestore's data change, once changed, send back a collection snapshot
  //then we send it to reducer, change view
  // const unsubscribeCollection = collectionsRef.onSnapshot(
  //   //send snapshot first time and every time firestore data changed
  //   async (snapshot) => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     //data has been stored in the reducer
  //     setLoading(false);
  //   }
  // );

  useEffect(() => {
    fetchCollectionsStartAsync();
  }, []);

  return (
    <div className="shop-page">
      <h1>SHop Page</h1>
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={() => (
            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />
          )}
        />

        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(routeProps) => (
            <CollectionsPageWithSpinner
              //false means
              isLoading={!isCollectionsLoaded}
              {...routeProps}
            />
          )}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
