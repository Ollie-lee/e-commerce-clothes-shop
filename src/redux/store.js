import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import logger from 'redux-logger';

//middleware expect an array,for scalability
// if we ever needed to add more things to the middleware we can just add it to this array
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  // middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// persistor is essentially a persisted version of our store
export const persistor = persistStore(store);
