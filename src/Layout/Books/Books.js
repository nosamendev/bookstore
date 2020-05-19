import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBooks, searchStopped } from '../../store/actions';
import Loader from '../Loader/Loader';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import FindBook from '../FindBook/FindBook';
import DisplayBooks from '../DisplayBooks/DisplayBooks';
import './Books.css';

const Books = (props) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    props.fetchBooks();
    return () => {
      props.searchStopped();
    };
  }, []);

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

  //return <DisplayCategories showEdit={false} />;
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
      </div>
      <DisplayBooks
        books={props.books}
        inputText={inputText}
        showEdit={false}
      />
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

export default connect(mapStateToProps, { fetchBooks, searchStopped })(Books);
