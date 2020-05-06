import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import Loader from '../Loader/Loader';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import './Books.css';

const Books = (props) => {
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

  return <DisplayCategories showEdit={false} />;
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    errorDescription: state.booksReducer.description.message,
    error: state.booksReducer.error,
    loading: state.booksReducer.loading,
  };
};

export default connect(mapStateToProps, { fetchBooks })(Books);
