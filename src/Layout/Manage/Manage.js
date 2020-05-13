import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import { closeFindBookDropdown } from '../../store/actions';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import FindBook from '../FindBook/FindBook';
import DisplayBooks from '../DisplayBooks/DisplayBooks';
import './Manage.css';

const Manage = (props) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    props.fetchBooks();
    props.closeFindBookDropdown();
  }, [props.deleted]);

  const inputRefFunc = (node) => {
    node.focus();
  };

  const searchStringFunc = (str) => {
    setInputText(str);
  };

  if (props.error) {
    return <p className="error">ERROR: {props.errorDescription}</p>;
  }

  if (props.loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="book-actions">
        <div className="find-book-container">
          <FindBook
            inputRefFunc={inputRefFunc}
            searchStringFunc={searchStringFunc}
            inputText={inputText}
          />
        </div>
        <div className="add-book-container">
          <Link to="/add" className="button">
            Add New Book
          </Link>
        </div>
      </div>
      <DisplayBooks books={props.books} inputText={inputText} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    errorDescription: state.booksReducer.description.message,
    error: state.booksReducer.error,
    loading: state.booksReducer.loading,
    deleted: state.deleteReducer.deleted,
  };
};

export default connect(mapStateToProps, {
  fetchBooks,
  closeFindBookDropdown,
})(Manage);
