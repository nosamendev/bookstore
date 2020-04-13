import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBooks } from '../../store/actions';
import Book from '../Books/Book/Book';
import Loader from '../Loader/Loader';

const Manage = (props) => {
  useEffect(() => {
    if (!props.books) {
      props.fetchBooks();
    }
  }, []);

  const displayCategory = () => {
    if (props.books) {
      let kidsBooks = [];
      let romanceBooks = [];
      let thrillerBooks = [];

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
            showEdit={true}
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
            showEdit={true}
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
            showEdit={true}
          />
        );
      });

      return (
        <div>
          <h3>KIDS</h3>
          <div className="category-container">{kidsCategory}</div>
          <h3>ROMANCE</h3>
          <div className="category-container">{romanceCategory}</div>
          <h3>THRILLER</h3>
          <div className="category-container">{thrillerCategory}</div>
        </div>
      );
    }
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

  return <React.Fragment>{displayCategory()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    errorDescription: state.booksReducer.description.message,
    error: state.booksReducer.error,
    loading: state.booksReducer.loading,
  };
};

export default connect(mapStateToProps, { fetchBooks })(Manage);
