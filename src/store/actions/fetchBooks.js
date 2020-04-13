import {
  FETCH_BOOKS_START,
  FETCH_BOOKS,
  FETCH_BOOKS_FAILED,
} from '../actions/types';

import books from '../../api/books';

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_START });

  try {
    const response = await books.get('/store.json');
    dispatch({ type: FETCH_BOOKS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BOOKS_FAILED, payload: error });
  }
};

export const fetchBooksFailed = (error) => {
  return {
    type: FETCH_BOOKS_FAILED,
    payload: error,
  };
};
