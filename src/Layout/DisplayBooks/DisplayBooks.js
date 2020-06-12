import React from 'react';
import { connect } from 'react-redux';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import DisplayResults from '../DisplayResults/DisplayResults';

const DisplayBooks = (props) => {
  const displayBooks = () => {
    if (!props.searchBooksStarted) {
      return (
        <DisplayCategories
          manage={props.manage}
          containerClass={props.containerClass}
          deleteBookFunc={props.deleteBookFunc}
        />
      );
    } else {
      return (
        <DisplayResults
          manage={props.manage}
          containerClass={props.containerClass}
          books={props.books}
          text={props.inputText}
          deleteBookFunc={props.deleteBookFunc}
        />
      );
    }
  };

  return <>{displayBooks()}</>;
};

const mapStateToProps = (state) => {
  return {
    searchBooksStarted: state.searchBooksReducer.searchBooksStarted,
  };
};

export default connect(mapStateToProps, null)(DisplayBooks);
