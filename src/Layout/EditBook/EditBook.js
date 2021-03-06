import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBook } from '../../store/actions/fetchBook';
import { editBook } from '../../store/actions/editBook';
import Loader from '../Loader/Loader';
import BookForm from '../BookForm/BookForm';

const EditBook = (props) => {
  useEffect(() => {
    props.fetchBook(id);
  }, []);

  useEffect(() => {
    if (props.book.title) {
      setTitle(props.book.title);
      setAuthor(props.book.author);
      setYear(props.book.year);
      setCategory(props.book.category);
      setSummary(props.book.summary);
      setBookID(props.book.bookID);
      setPrice(props.book.price);
      setImage(props.book.image);
    }
  }, [props.book.title]);

  const id = props.location.pathname.slice(6);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [bookID, setBookID] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

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

  const images = require.context('../../images', true);
  let img = '';
  if (image) {
    img = images('./' + image);
  }

  const formValues = {
    author: author,
    bookID: bookID,
    category: category,
    id: id,
    image: image,
    price: price,
    summary: summary,
    title: title,
    year: year,
  };

  const formSubmit = (e) => {
    e.preventDefault();
    props.editBook(id, formValues);
    setSubmitted(true);
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

  return (
    <BookForm
      author={author}
      bookID={bookID}
      category={category}
      id={id}
      image={image}
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
    book: state.bookReducer,
    loading: state.bookReducer.loading,
    error: state.bookReducer.error,
    errorDescription: state.bookReducer.description.message,
  };
};

export default connect(mapStateToProps, { fetchBook, editBook })(EditBook);
