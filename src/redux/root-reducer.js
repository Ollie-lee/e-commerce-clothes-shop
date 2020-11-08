import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({
  //The key is that represent the individual slices of state i.e. the actual reducer
  user: userReducer,
});
