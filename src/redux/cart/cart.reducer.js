import { CartActionTypes } from './cart.type';

import { addItemToCart } from './cart.util';

const initialState = {
  hidden: true,
  cartItems: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };

    case CartActionTypes.ADD_ITEM:
      return { ...state, cartItems: addItemToCart(state.cartItems, payload) };

    default:
      return state;
  }
};
