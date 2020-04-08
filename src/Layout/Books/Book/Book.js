import React from 'react';
import './Book.css';

const Book = (props) => {
  const images = require.context('../../../images', true);
  let img = images('./' + props.image);

  return (
    <div className="book-container">
      <div
        className="image-container"
        style={{ backgroundImage: 'url(' + img + ')' }}
      ></div>
      <div className="book-info">
        <div className="title">{props.title}</div>
        <div className="author">{props.author}</div>
      </div>
      <div className="action">
        <div className="price">${props.price}</div>
        <button className="cart" title="Add to Cart"></button>
      </div>
    </div>
  );
};

export default Book;
