import {
  FETCH_BOOKS,
  FETCH_BOOKS_START,
  FETCH_BOOKS_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
  description: '',
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      const books = Object.values(action.payload.books);
      const keys = Object.keys(action.payload.books);
      //including the IDs into each book:
      for (let i = 0; i < books.length; i++) {
        books[i].id = keys[i];
      }

      return { ...state, books, loading: false };
    case FETCH_BOOKS_START:
      return { ...state, loading: true };
    case FETCH_BOOKS_FAILED:
      return {
        ...state,
        loading: false,
        description: action.payload,
        error: true,
      };

    default:
      return state;
  }
};

export default booksReducer;
