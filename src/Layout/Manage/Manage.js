import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import DisplayCategory from '../DisplayCategory/DisplayCategory';
import './Manage.css';

const Manage = (props) => {
  useEffect(() => {
    props.fetchBooks();
  }, []);

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
          <input type="text"></input>
          <span className="button">Find a Book</span>
        </div>
        <div className="add-book-container">
          <Link to="/add" className="button">
            Add New Book
          </Link>
        </div>
      </div>

      <DisplayCategory showEdit={true} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    errorDescription: state.booksReducer.description.message,
    error: state.booksReducer.error,
    loading: state.booksReducer.loading,
  };
};

export default connect(mapStateToProps, { fetchBooks })(Manage);
