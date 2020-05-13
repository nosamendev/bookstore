import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BookLink from './BookLink/BookLink';
import {
  closeFindBookDropdown,
  openFindBookDropdown,
} from '../../store/actions/findBookDropdown';
import { searchStarted } from '../../store/actions/searchBooks';
import './FindBook.css';

const FindBook = (props) => {
  //const [text, setText] = useState('');

  //autofocus:
  const inputRef = useCallback((node) => {
    if (node) {
      props.inputRefFunc(node);
    }
  });

  const dropdownRef = useCallback((node) => {
    if (node) {
      if (!props.isFindBookDropdownOpen || !props.inputText) {
        node.classList.add('hide');
      } else {
        node.classList.remove('hide');
      }
    }
  });

  const onInputChange = (e) => {
    //setText(e.target.value);
    props.openFindBookDropdown();
    props.searchStringFunc(e.target.value);
  };

  const onCloseClick = () => {
    props.closeFindBookDropdown();
    props.searchStringFunc('');
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    props.searchStarted();
    props.closeFindBookDropdown();
  };

  let booksFound = null;
  if (props.books) {
    booksFound = props.books.map((book, _) => {
      const authorLowerCase = book.author.toLowerCase();
      const titleLowerCase = book.title.toLowerCase();
      const textLowerCase = props.inputText.toLowerCase();

      if (
        authorLowerCase.includes(textLowerCase) ||
        titleLowerCase.includes(textLowerCase)
      ) {
        return (
          <BookLink
            id={book.id}
            title={book.title}
            author={book.author}
            text={props.inputText}
            key={book.id}
          />
        );
      }
    });
  }
  return (
    <form onSubmit={(e) => onFormSubmit(e)}>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={props.inputText}
          onChange={(e) => onInputChange(e)}
          placeholder="Find a Book (title, author)"
        ></input>
        <span className="close" onClick={onCloseClick}></span>

        <div className="find-results" ref={dropdownRef}>
          {booksFound}
        </div>
        <button type="submit">Find</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    isFindBookDropdownOpen:
      state.findBookDropdownReducer.isFindBookDropdownOpen,
  };
};

export default connect(mapStateToProps, {
  closeFindBookDropdown,
  openFindBookDropdown,
  searchStarted,
})(withRouter(FindBook));
