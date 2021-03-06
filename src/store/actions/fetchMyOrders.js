import {
  FETCH_MY_ORDERS_START,
  FETCH_MY_ORDERS,
  FETCH_MY_ORDERS_FAILED,
} from '../actions/types';
import books from '../../api/books';

export const fetchMyOrders = (token, userId) => async (dispatch) => {
  dispatch({ type: FETCH_MY_ORDERS_START });

  const queryParams =
    '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

  try {
    const response = await books.get('/orders.json' + queryParams);
    dispatch({ type: FETCH_MY_ORDERS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_MY_ORDERS_FAILED, payload: error });
  }
};

export const fetchMyOrdersFailed = (error) => {
  return {
    type: FETCH_MY_ORDERS_FAILED,
    payload: error,
  };
};
