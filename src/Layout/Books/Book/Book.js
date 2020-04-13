import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Book.css';

const Book = (props) => {
  const images = require.context('../../../images', true);
  let img = images('./' + props.image);

  const gotoBookDetails = () => {
    props.history.replace(`/books/${props.id}`);
  };

  const addToCart = () => {
    //save to local store
    //redirect to cart
    props.history.replace('/cart');
  };

  let buttons = null;
  if (props.showEdit) {
    buttons = (
      <div className="actions">
        <Link to="/edit" className="edit" title="Edit"></Link>
        <Link to="/delete" className="delete" title="Delete"></Link>
      </div>
    );
  } else {
    buttons = (
      <button className="cart" title="Add to Cart" onClick={addToCart}></button>
    );
  }

  return (
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
  );
};

export default withRouter(Book);
