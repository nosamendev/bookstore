import { CART_INCREASE, CART_DECREASE, CART_EMPTY } from '../actions/types';

const INITIAL_STATE = {
  cartItems: 0,
};
const cartStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_INCREASE:
      return { ...state, cartItems: state.cartItems + action.payload };
    case CART_DECREASE:
      return { ...state, cartItems: state.cartItems - action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: action.payload };

    default:
      return state;
  }
};

export default cartStatusReducer;
