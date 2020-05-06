import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../store/actions/addBook';
import Loader from '../Loader/Loader';
import BookForm from '../BookForm/BookForm';

const AddBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('Kids');
  const [bookID, setBookID] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('noimage.jpg');

  const [submitted, setSubmitted] = useState(false);

  const changeInput = (e) => {
    switch (e.target.name) {
      case 'title': {
        setTitle(e.target.value);
        break;
      }
      case 'author':
        setAuthor(e.target.value);
        break;
      case 'year':
        setYear(e.target.value);
        break;
      case 'category':
        setCategory(e.target.value);
        break;
      case 'summary':
        setSummary(e.target.value);
        break;
      case 'bookID':
        setBookID(e.target.value);
        break;
      case 'price':
        setPrice(e.target.value);
        break;
      case 'image':
        setImage(e.target.value);
        break;
    }
  };

  const formValues = {
    author: author,
    bookID: bookID,
    category: category,
    image: image,
    price: price,
    summary: summary,
    title: title,
    year: year,
  };

  const formSubmit = (e) => {
    e.preventDefault();

    const book = {
      admin: localStorage.email,
      ...formValues,
      userId: localStorage.userId,
    };
    props.addBook(book);
    setSubmitted(true);
  };

  const images = require.context('../../images', true);
  let img = '';
  if (image) {
    img = images('./' + image);
  }

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
    <BookForm
      author={author}
      bookID={bookID}
      category={category}
      image={'noimage.jpg'}
      price={price}
      summary={summary}
      title={title}
      year={year}
      submitted={submitted}
      img={img}
      formSubmit={formSubmit}
      changeInput={changeInput}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer,
    loading: state.addReducer.loading,
    error: state.addReducer.error,
    errorDescription: state.addReducer.description.message,
  };
};

export default connect(mapStateToProps, { addBook })(AddBook);
