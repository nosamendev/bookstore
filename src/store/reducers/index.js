import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import bookReducer from './bookReducer';
import authReducer from './authReducer';
import cartStatusReducer from './cartStatusReducer';
import editReducer from './editReducer';
import addReducer from './addReducer';
import deleteReducer from './deleteReducer';
import findBookDropdownReducer from './findBookDropdownReducer';
import searchBooksReducer from './searchBooksReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  booksReducer: booksReducer,
  bookReducer: bookReducer,
  authReducer: authReducer,
  cartStatusReducer: cartStatusReducer,
  editReducer: editReducer,
  addReducer: addReducer,
  findBookDropdownReducer: findBookDropdownReducer,
  searchBooksReducer: searchBooksReducer,
  modalReducer: modalReducer,
  deleteReducer: deleteReducer,
});
