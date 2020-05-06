import React from 'react';
import { withRouter } from 'react-router-dom';
import Book from '../Books/Book/Book';

const DisplayResults = (props) => {
  let msg = (
    <h3>
      Results for '<b>{props.text}</b>'
    </h3>
  );

  //const text = props.location.param;
  const text = props.text;

  if (text == '') {
    msg = <p>No results found.</p>;
  }

  let booksFound = null;
  if (props.books && text) {
    booksFound = props.books.map((book, _) => {
      const authorLowerCase = book.author.toLowerCase();
      const titleLowerCase = book.title.toLowerCase();
      const textLowerCase = text.toLowerCase();

      if (
        authorLowerCase.includes(textLowerCase) ||
        titleLowerCase.includes(textLowerCase)
      ) {
        return (
          <Book
            id={book.id}
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            image={book.image}
            showEdit={props.showEdit}
          />
        );
      }
    });
  }

  return (
    <div>
      {msg}
      <div className="category-container">{booksFound}</div>
    </div>
  );
};

export default withRouter(DisplayResults);
