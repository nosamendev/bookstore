import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import Loader from '../Loader/Loader';
import DisplayCategory from '../DisplayCategory/DisplayCategory';

const Manage = (props) => {
  useEffect(() => {
    if (!props.books) {
      props.fetchBooks();
    }
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
      <form>
        <label htmlFor="find">
          <span>Find a book</span>
          <input name="find" type="text"></input>
          Add book
        </label>
        <button type="button">Find</button>
      </form>
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
