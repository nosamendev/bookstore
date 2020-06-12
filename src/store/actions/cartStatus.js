import { CART_INCREASE, CART_DECREASE, CART_EMPTY } from '../actions/types';

export const cartIncr = (n) => {
  return {
    type: CART_INCREASE,
    payload: n,
  };
};

export const cartDecr = (n) => {
  return {
    type: CART_DECREASE,
    payload: n,
  };
};

export const cartEmpty = () => {
  return {
    type: CART_EMPTY,
    payload: 0,
  };
};
