import { ADD_BOOK_START, ADD_BOOK, ADD_BOOK_FAILED } from './types';

import books from '../../api/books';

export const addBook = (book) => async (dispatch) => {
  dispatch({ type: ADD_BOOK_START });

  try {
    const response = await books.post('/store/books.json', book);
    dispatch({ type: ADD_BOOK, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_BOOK_FAILED, payload: error });
  }
};

export const addBookFailed = (error) => {
  return {
    type: ADD_BOOK_FAILED,
    payload: error,
  };
};
