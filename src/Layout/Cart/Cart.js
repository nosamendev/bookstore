import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  openModal,
  closeModal,
  saveOrder,
  saveSuccess,
  cartContents,
} from '../../store/actions';
import Book from '../Books/Book/Book';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import Confirm from '../Modal/ModalDialogs/Confirm';
import './Cart.css';

const Cart = (props) => {
  const [cartState, setCartState] = useState(JSON.parse(localStorage.cart));
  const changeCartFunc = (cart) => {
    setCartState(cart);
  };

  const cartItems = useCallback((node) => {
    if (node) {
      const cart = JSON.parse(localStorage.cart);
      node.innerHTML = cart.length + ' items';
    }
  });

  const total = useCallback((node) => {
    if (node) {
      const cart = JSON.parse(localStorage.cart);
      let sum = 0;
      for (let i = 0; i < cart.length; i++) {
        sum = sum + Number(cart[i].price);
      }
      node.innerHTML = 'Total: $' + sum.toFixed(2);
    }
  });

  const displayCartItems = () => {
    //load from local storage:
    const cart = JSON.parse(localStorage.cart);

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

  const orderHandler = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.cart);

    const order = {
      email: localStorage.email,
      books: cart,
      userId: props.userId,
      date: new Date().toLocaleDateString(),
    };

    props.saveOrder(order, props.token);
    props.openModal();
    if (props.error) {
      localStorage.cart = JSON.stringify([]);
      props.cartContents(localStorage.cart.length);
    }
  };

  let orderBtn = null;
  let msg = '';

  if (!props.success) {
    orderBtn = (
      <button
        type="submit"
        onClick={(e) => {
          orderHandler(e);
        }}
      >
        Order
      </button>
    );
  } else {
    msg = <p>No books in the cart.</p>;
  }

  if (JSON.parse(localStorage.cart).length == 0) {
    orderBtn = null;
    msg = <p>No books in the cart.</p>;
  }

  let loginMsg = '';
  if (!props.userId) {
    loginMsg = <p>Please authorize to finish your order.</p>;
  } else {
    loginMsg = (
      <>
        <div className="cart-summary">
          <span ref={cartItems}></span>
          <span ref={total}></span>
        </div>
        {orderBtn}
      </>
    );
  }

  let errMsg = null;
  if (props.error) {
    errMsg = <p className="error">ERROR: {props.errorDescription}</p>;
    props.closeModal();
  }

  let orderSavedMsg = <Loader />;
  if (props.success) {
    orderSavedMsg = <Confirm title="Your order has been saved." />;
    localStorage.cart = JSON.stringify([]);
    props.cartContents(0);
  }

  return (
    <form>
      <div className="cart-contents">
        <h3>Shopping Cart</h3>
        <div className="category-container">{displayCartItems()}</div>
        {msg}
      </div>
      <hr></hr>
      {loginMsg}
      {errMsg}
      <Modal>{orderSavedMsg}</Modal>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    errorDescription: state.saveOrderReducer.description.message,
    error: state.saveOrderReducer.error,
    success: state.saveOrderReducer.success,
  };
};

export default connect(mapStateToProps, {
  openModal,
  closeModal,
  saveOrder,
  saveSuccess,
  cartContents,
})(Cart);
