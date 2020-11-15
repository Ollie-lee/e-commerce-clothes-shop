import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.action';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/filebase.utils';

import CollectionPage from '../collection/CollectionPage';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import WithSpinner from '../../components/with-spinner/WithSpinner';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

function ShopPage({ match, updateCollections, location, history }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const collectionsRef = firestore.collection('collections');

    // /to fetch back the data associated to this collection.
    // Promised style, but only one-time off, not live update
    collectionsRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      //data has been stored in the reducer
      setLoading(false);
    });

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
    return () => {};
  }, []);

  return (
    <div className="shop-page">
      <h1>SHop Page</h1>
      <Switch>
        <Route
          exact
          path={`${match.path}`}
          render={() => <CollectionsOverviewWithSpinner isLoading={loading} />}
        />

        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(routeProps) => (
            <CollectionsPageWithSpinner isLoading={loading} {...routeProps} />
          )}
        />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
