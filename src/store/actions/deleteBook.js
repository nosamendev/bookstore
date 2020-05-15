import {
  DELETE_BOOK_START,
  DELETE_BOOK,
  DELETE_BOOK_FAILED,
  BOOK_TO_BE_DELETED,
} from '../actions/types';

import books from '../../api/books';

export const deleteBook = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BOOK_START });

  try {
    const response = await books.delete(`/store/books/${id}.json`);
    dispatch({ type: DELETE_BOOK, payload: response.data });
  } catch (error) {
    dispatch({ type: DELETE_BOOK_FAILED, payload: error });
  }
};

export const deleteBookFailed = (error) => {
  return {
    type: DELETE_BOOK_FAILED,
    payload: error,
  };
};

export const bookToBeDeleted = () => {
  return {
    type: BOOK_TO_BE_DELETED,
    payload: false,
  };
};
