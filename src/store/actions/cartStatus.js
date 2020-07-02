import { CART_CONTENTS } from '../actions/types';

export const cartContents = (n) => {
  return {
    type: CART_CONTENTS,
    payload: n,
  };
};
