import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import FindBook from '../FindBook/FindBook';
import DisplayResults from '../DisplayResults/DisplayResults';

const Results = (props) => {
  useEffect(() => {
    props.fetchBooks();
  }, []);

  const inputRefFunc = (node) => {
    node.focus();
  };

  return (
    <>
      <div className="book-actions">
        <div className="find-book-container">
          <FindBook inputRefFunc={inputRefFunc} />
        </div>
      </div>

      <DisplayResults showEdit={true} books={props.books} />
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

export default connect(mapStateToProps, { fetchBooks })(Results);
