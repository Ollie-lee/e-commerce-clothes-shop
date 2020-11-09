import { CartActionTypes } from './cart.type';

const initialState = {
  hidden: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };

    default:
      return state;
  }
};
