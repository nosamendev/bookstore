import React, { useState } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../store/actions';
import Book from '../Books/Book/Book';
import Modal from '../Modal/Modal';
import DeleteConfirmation from '../Modal/ModalDialogs/DeleteConfirmation';

const DisplayCategories = (props) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookId, setBookId] = useState('');

  const deleteBookFunc = (title, author, id) => {
    props.openModal();
    setBookTitle(title);
    setBookAuthor(author);
    setBookId(id);
  };

  if (props.books) {
    let kidsBooks = [];
    let romanceBooks = [];
    let thrillerBooks = [];

    //get the books in each category:
    for (let i = 0; i < props.books.length; i++) {
      switch (props.books[i].category) {
        case 'Kids': {
          kidsBooks.push(props.books[i]);
          break;
        }
        case 'Romance': {
          romanceBooks.push(props.books[i]);
          break;
        }
        case 'Thriller': {
          thrillerBooks.push(props.books[i]);
          break;
        }
      }
    }
    const kidsCategory = kidsBooks.map((_, i) => {
      return (
        <Book
          id={kidsBooks[i].id}
          key={kidsBooks[i].id}
          title={kidsBooks[i].title}
          author={kidsBooks[i].author}
          price={kidsBooks[i].price}
          image={kidsBooks[i].image}
          showEdit={props.showEdit}
          deleteBookFunc={deleteBookFunc}
        />
      );
    });

    const romanceCategory = romanceBooks.map((_, i) => {
      return (
        <Book
          id={romanceBooks[i].id}
          key={romanceBooks[i].id}
          title={romanceBooks[i].title}
          author={romanceBooks[i].author}
          price={romanceBooks[i].price}
          image={romanceBooks[i].image}
          showEdit={props.showEdit}
          deleteBookFunc={deleteBookFunc}
        />
      );
    });

    const thrillerCategory = thrillerBooks.map((_, i) => {
      return (
        <Book
          id={thrillerBooks[i].id}
          key={thrillerBooks[i].id}
          title={thrillerBooks[i].title}
          author={thrillerBooks[i].author}
          price={thrillerBooks[i].price}
          image={thrillerBooks[i].image}
          showEdit={props.showEdit}
          deleteBookFunc={deleteBookFunc}
        />
      );
    });

    return (
      <>
        <div>
          <h3>KIDS</h3>
          <div className="category-container">{kidsCategory}</div>
          <h3>ROMANCE</h3>
          <div className="category-container">{romanceCategory}</div>
          <h3>THRILLER</h3>
          <div className="category-container">{thrillerCategory}</div>
        </div>
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
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
  };
};

export default connect(mapStateToProps, { openModal })(DisplayCategories);
