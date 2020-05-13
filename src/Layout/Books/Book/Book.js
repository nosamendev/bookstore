import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openModal } from '../../../store/actions/modal';
import Modal from '../../Modal/Modal';
import Loader from '../../Loader/Loader';
import ConfirmOk from '../../Modal/ModalDialogs/ConfirmOk';
import ConfirmErr from '../../Modal/ModalDialogs/ConfirmErr';
import DeleteConfirmation from '../../Modal/ModalDialogs/DeleteConfirmation';
import './Book.css';

const Book = (props) => {
  const images = require.context('../../../images', true);
  let img = images('./' + props.image);

  const gotoBookDetails = () => {
    if (props.showEdit) {
      props.history.replace(`/edit/${props.id}`);
    } else {
      props.history.replace(`/books/${props.id}`);
    }
  };

  const addToCart = () => {
    //save to local store
    //redirect to cart
    props.history.replace('/cart');
  };

  const deleteBook = () => {
    props.deleteBookFunc(props.title, props.author, props.id);
  };

  let buttons = null;
  if (props.showEdit) {
    buttons = (
      <div className="actions">
        <Link to={`/edit/${props.id}`} className="edit" title="Edit"></Link>
        <span className="delete" title="Delete" onClick={deleteBook}></span>
      </div>
    );
  } else {
    buttons = (
      <button className="cart" title="Add to Cart" onClick={addToCart}></button>
    );
  }

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
          {buttons}
        </div>
      </div>
    </>
  );
};

export default connect(null, { openModal })(withRouter(Book));
