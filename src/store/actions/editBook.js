import { EDIT_BOOK_START, EDIT_BOOK, EDIT_BOOK_FAILED } from './types';

import books from '../../api/books';

export const editBook = (id, formValues) => async (dispatch) => {
  dispatch({ type: EDIT_BOOK_START });

  try {
    const response = await books.patch(`/store/books/${id}.json`, formValues);
    dispatch({ type: EDIT_BOOK, payload: response.data, id: id });
  } catch (error) {
    dispatch({ type: EDIT_BOOK_FAILED, payload: error });
  }
};

export const editBookFailed = (error) => {
  return {
    type: EDIT_BOOK_FAILED,
    payload: error,
  };
};
