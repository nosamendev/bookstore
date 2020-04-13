import {
  FETCH_BOOK_START,
  FETCH_BOOK,
  FETCH_BOOK_FAILED,
} from '../actions/types';

import books from '../../api/books';

export const fetchBook = (id) => async (dispatch) => {
  dispatch({ type: FETCH_BOOK_START });

  try {
    const response = await books.get(`/store/books/${id}.json`);
    dispatch({ type: FETCH_BOOK, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOOK_FAILED, payload: error });
  }
};

export const fetchBookFailed = (error) => {
  return {
    type: FETCH_BOOK_FAILED,
    payload: error,
  };
};
