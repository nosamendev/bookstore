import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import bookReducer from './bookReducer';
import authReducer from './authReducer';
import cartStatusReducer from './cartStatusReducer';
import editReducer from './editReducer';

export default combineReducers({
  booksReducer: booksReducer,
  bookReducer: bookReducer,
  authReducer: authReducer,
  cartStatusReducer: cartStatusReducer,
  editReducer: editReducer,
});
