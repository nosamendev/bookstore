import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchBooks,
  bookToBeDeleted,
  openModal,
  closeModal,
  searchStopped,
} from '../../store/actions';
import { closeFindBookDropdown } from '../../store/actions';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import FindBook from '../FindBook/FindBook';
import DisplayBooks from '../DisplayBooks/DisplayBooks';
import Modal from '../Modal/Modal';
import DeleteConfirmation from '../Modal/ModalDialogs/DeleteConfirmation';
import './Manage.css';

const Manage = (props) => {
  const [inputText, setInputText] = useState('');
  //the book to be deleted:
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookId, setBookId] = useState('');

  useEffect(() => {
    props.fetchBooks();
    props.closeFindBookDropdown();
    props.bookToBeDeleted();
    props.closeModal();
    return () => {
      props.searchStopped();
    };
  }, [props.deleted]);

  const inputRefFunc = (node) => {
    node.focus();
  };

  const searchStringFunc = (str) => {
    setInputText(str);
  };

  const deleteBookFunc = (title, author, id) => {
    props.openModal();
    setBookTitle(title);
    setBookAuthor(author);
    setBookId(id);
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
        <div className="add-book-container">
          <Link to="/add" className="button">
            Add New Book
          </Link>
        </div>
      </div>
      <DisplayBooks
        books={props.books}
        inputText={inputText}
        manage={true}
        containerClass="manage-books"
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
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    errorDescription: state.booksReducer.description.message,
    error: state.booksReducer.error,
    loading: state.booksReducer.loading,
    deleted: state.deleteReducer.deleted,
  };
};

export default connect(mapStateToProps, {
  fetchBooks,
  closeFindBookDropdown,
  bookToBeDeleted,
  openModal,
  closeModal,
  searchStopped,
})(Manage);
