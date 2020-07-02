import { CART_CONTENTS } from '../actions/types';

const INITIAL_STATE = {
  cartItems: 0,
};
const cartStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_CONTENTS:
      return { ...state, cartItems: action.payload };

    default:
      return state;
  }
};

export default cartStatusReducer;
