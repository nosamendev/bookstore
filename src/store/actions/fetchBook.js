import {
  FETCH_BOOK_START,
  FETCH_BOOK,
  FETCH_BOOK_FAILED,
} from '../actions/types';

import books from '../../api/books';

export const fetchBookStart = () => {
  return { type: FETCH_BOOK_START };
};

export const fetchBookSuccess = (id, response) => {
  return { type: FETCH_BOOK, payload: response.data, id: id };
};

export const fetchBookFailed = (error) => {
  return {
    type: FETCH_BOOK_FAILED,
    payload: error,
  };
};

export const fetchBook = (id) => async (dispatch) => {
  dispatch(fetchBookStart());
  try {
    const response = await books.get(`/store/books/${id}.json`);
    dispatch(fetchBookSuccess(id, response));
  } catch (error) {
    dispatch(fetchBookFailed(error));
  }
};
