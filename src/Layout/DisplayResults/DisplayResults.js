import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../store/actions';
import Book from '../Books/Book/Book';
import Modal from '../Modal/Modal';
import DeleteConfirmation from '../Modal/ModalDialogs/DeleteConfirmation';

const DisplayResults = (props) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookId, setBookId] = useState('');

  const deleteBookFunc = (title, author, id) => {
    props.openModal();
    setBookTitle(title);
    setBookAuthor(author);
    setBookId(id);
  };

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
          <>
            <Book
              id={book.id}
              key={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              image={book.image}
              showEdit={props.showEdit}
              deleteBookFunc={deleteBookFunc}
            />
            <Modal>
              <DeleteConfirmation
                modalTitle="Are you sure you want to delete:"
                title={bookTitle}
                author={bookAuthor}
                id={bookId}
              />
            </Modal>
          </>
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

export default connect(null, { openModal })(withRouter(DisplayResults));
