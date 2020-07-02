import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyOrders } from '../../store/actions/fetchMyOrders';
import Book from '../Books/Book/Book';
import Loader from '../Loader/Loader';
import './MyOrders.css';

const MyOrders = (props) => {
  useEffect(() => {
    props.fetchMyOrders(props.token, props.userId);
  }, []);

  const displayAllOrders = () => {
    if (!props.loading && props.orders) {
      const orders = Object.values(props.orders);
      let dates = [];
      for (let i = 0; i < orders.length; i++) {
        dates[i] = orders[i].date;
      }
      const allOrders = [];
      for (let i = 0; i < orders.length; i++) {
        allOrders[i] = displayOrder(orders[i].books, dates[i]);
      }
      return allOrders;
    }
  };

  const displayOrder = (order, date) => {
    if (!props.loading && props.orders) {
      const books = order.map((book, _) => {
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
            changeCartFunc={() => {}}
            cartId={book.cartId}
          />
        );
      });

      return (
        <div className="order" key={Date.now() + Math.random()}>
          <span className="date">{date}</span>
          {books}
        </div>
      );
    } else return <Loader />;
  };

  return (
    <>
      <h3>My Orders</h3>
      <div className="my-orders">
        <section className="books">{displayAllOrders()}</section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    token: state.authReducer.token,
    orders: state.fetchMyOrdersReducer.orders,
    loading: state.fetchMyOrdersReducer.loading,
  };
};

export default connect(mapStateToProps, { fetchMyOrders })(MyOrders);
