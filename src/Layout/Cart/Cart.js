import React, { useState } from 'react';
import Book from '../Books/Book/Book';
import { closeFindBookDropdown } from '../../store/actions';

const Cart = () => {
  const [cartState, setCartState] = useState(JSON.parse(localStorage.cart));

  const changeCartFunc = (cart) => {
    setCartState(cart);
  };

  const displayCartItems = () => {
    //load from local storage:
    let cart = JSON.parse(localStorage.cart);
    console.log('cart', cart);
    let items = null;

    if (cart.length != 0) {
      items = cart.map((book, i) => {
        return (
          <Book
            id={book.id}
            key={book.id + Math.floor(Math.random() * 100000)}
            title={book.title}
            author={book.author}
            price={book.price}
            image={book.image}
            manage={false}
            deleteBookFunc={() => {}}
            changeCartFunc={changeCartFunc}
            cartId={book.cartId}
          />
        );
      });
    }

    return items;
  };

  let msg = '';
  if (JSON.parse(localStorage.cart).length == 0) {
    msg = <p>No books in the cart.</p>;
  }

  return (
    <div className="cart-contents">
      <h3>Shopping Cart</h3>
      <div className="category-container">{displayCartItems()}</div>
      {msg}
    </div>
  );
};

export default Cart;
