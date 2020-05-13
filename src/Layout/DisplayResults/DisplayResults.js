import React from 'react';
import { withRouter } from 'react-router-dom';
import Book from '../Books/Book/Book';

const DisplayResults = (props) => {
  const text = props.text;

  let booksFiltering = [];
  if (props.books && text) {
    booksFiltering = props.books.map((book, _) => {
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
      } else return null;
    });
  }

  const booksFound = booksFiltering.filter((item, _) => {
    return item !== null;
  });

  let msg = (
    <>
      <h3>
        Results for '<b>{props.text}</b>'
      </h3>
      <p>{booksFound.length} books found.</p>
    </>
  );

  return (
    <div>
      {msg}
      <div className="category-container">{booksFound}</div>
    </div>
  );
};

export default withRouter(DisplayResults);
