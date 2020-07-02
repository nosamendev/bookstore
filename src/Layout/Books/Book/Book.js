import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal, closeModal, cartContents } from '../../../store/actions';
import './Book.css';

const Book = (props) => {
  const images = require.context('../../../images', true);
  let img = images('./' + props.image);

  const gotoBookDetails = () => {
    if (props.manage) {
      props.history.replace(`/edit/${props.id}`);
    } else {
      props.history.replace(`/books/${props.id}`);
    }
  };

  const changeCart = (cart) => {
    props.changeCartFunc(cart);
  };

  const addToCart = () => {
    //save to local store
    const cart = JSON.parse(localStorage.cart);

    const book = {
      id: props.id,
      title: props.title,
      author: props.author,
      price: props.price,
      image: props.image,
      cartId: props.id + Math.floor(Math.random() * 100000),
    };
    cart.push(book);
    localStorage.cart = JSON.stringify(cart);
    //props.cartIncr(1);
    props.cartContents(cart.length);

    props.openModal();
  };

  const deleteFromCart = () => {
    const cart = JSON.parse(localStorage.cart);
    const cartNew = cart.filter((item, _) => {
      return item.cartId !== props.cartId;
    });
    localStorage.cart = JSON.stringify(cartNew);
    //props.cartDecr(1);
    props.cartContents(cartNew.length);
    changeCart(cartNew);
    props.openModal();
    setTimeout(() => props.closeModal(), 500);
  };

  const deleteBook = () => {
    props.deleteBookFunc(props.title, props.author, props.id);
  };

  return (
    <>
      <div className="book-container">
        <div
          className="image-container"
          style={{ backgroundImage: 'url(' + img + ')' }}
          onClick={gotoBookDetails}
        ></div>
        <div className="book-info" onClick={gotoBookDetails}>
          <div className="title">{props.title}</div>
          <div className="author">{props.author}</div>
        </div>
        <div className="action">
          <div className="price">${props.price}</div>
          {/*buttons*/}
          <div className="actions">
            <Link to={`/edit/${props.id}`} className="edit" title="Edit"></Link>
            <span className="delete" title="Delete" onClick={deleteBook}></span>
          </div>
          <button
            className="cart"
            title="Add to Cart"
            onClick={addToCart}
          ></button>
          <button
            className="delete-from-cart"
            title="Delete from Cart"
            onClick={deleteFromCart}
          ></button>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  openModal,
  closeModal,
  cartContents,
})(withRouter(Book));
