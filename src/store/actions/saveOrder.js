import { SAVE_ORDER_START, SAVE_ORDER, SAVE_ORDER_FAILED } from './types';
import books from '../../api/books';

export const saveOrder = (order, token) => async (dispatch) => {
  dispatch({ type: SAVE_ORDER_START });

  try {
    const response = await books.post('/orders.json?auth=' + token, order);
    dispatch({ type: SAVE_ORDER, payload: response.data });
  } catch (error) {
    dispatch({ type: SAVE_ORDER_FAILED, payload: error });
  }
};
