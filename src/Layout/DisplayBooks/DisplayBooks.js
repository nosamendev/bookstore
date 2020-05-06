import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import DisplayResults from '../DisplayResults/DisplayResults';

const DisplayBooks = (props) => {
  const displayBooks = () => {
    if (!props.searchBooksStarted) {
      return <DisplayCategories showEdit={true} />;
    } else {
      return (
        <DisplayResults
          showEdit={true}
          books={props.books}
          text={props.inputText}
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
