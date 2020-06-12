import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBook, openModal, cartIncr } from '../../../store/actions';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import Confirm from '../../Modal/ModalDialogs/Confirm';
import './BookDetails.css';

const BookDetails = (props) => {
  useEffect(() => {
    if (!props.books) {
      props.fetchBook(id);
    }
  }, []);

  const images = require.context('../../../images', true);

  const id = props.location.pathname.slice(7);

  let title = '';
  let author = '';
  let image = '';
  let category = '';
  let year = '';
  let bookId = '';
  let summary = '';
  let price = '';

  let img = '';

  if (props.books) {
    //finds the book in books:
    let index = 0;
    while (index < props.books.length && id != props.books[index].id) {
      index++;
    }

    title = props.books[index].title;
    author = props.books[index].author;
    image = props.books[index].image;
    category = props.books[index].category;
    year = props.books[index].year;
    bookId = props.books[index].bookID;
    summary = props.books[index].summary;
    price = props.books[index].price;
  } else {
    //books are not in the reducer, this is a stand alone page:
    title = props.book.title;
    author = props.book.author;
    image = props.book.image;
    category = props.book.category;
    year = props.book.year;
    bookId = props.book.bookID;
    summary = props.book.summary;
    price = props.book.price;
  }

  if (image) {
    img = images('./' + image);
  }

  const addToCart = () => {
    //save to local store
    let cart = JSON.parse(localStorage.cart);
    const book = {
      id: id,
      title: title,
      author: author,
      price: price,
      image: image,
    };
    cart.push(book);
    localStorage.cart = JSON.stringify(cart);
    props.cartIncr(1);
    props.openModal();
  };

  if (props.loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="book-details">
        <div className="book-image">
          <div
            className="image-container"
            style={img ? { backgroundImage: 'url(' + img + ')' } : null}
          ></div>
        </div>
        <div className="book-info">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Title:</strong>
                </td>
                <td>
                  <strong>{title}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Author:</strong>
                </td>
                <td>
                  <strong>{author}</strong>
                </td>
              </tr>
              <tr className="category">
                <td>Category:</td>
                <td>{category}</td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>{year}</td>
              </tr>
              <tr className="bookId">
                <td>BookID:</td>
                <td>{bookId}</td>
              </tr>
              <tr className="summary">
                <td>Summary:</td>
                <td>{summary}</td>
              </tr>
              <tr className="price">
                <td>Price:</td>
                <td>${price}</td>
              </tr>
            </tbody>
          </table>
          <div className="add-to-cart-button-container">
            <span className="button" onClick={addToCart}>
              Add to Cart
            </span>
          </div>
        </div>
      </div>
      <Modal>
        <Confirm title="The book was added to the Cart" />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    book: state.bookReducer,
    loading: state.booksReducer.loading,
  };
};

export default connect(mapStateToProps, { fetchBook, openModal, cartIncr })(
  BookDetails
);
