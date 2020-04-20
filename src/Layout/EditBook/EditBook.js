import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBook } from '../../store/actions/fetchBook';
import { editBook } from '../../store/actions/editBook';
import Loader from '../Loader/Loader';

const EditBook = (props) => {
  useEffect(() => {
    if (!props.books || props.book.id != id) {
      props.fetchBook(id);
    }
  }, []);

  useEffect(() => {
    if (props.book.title) {
      setTitle(props.book.title);
    }
    if (props.book.author) {
      setAuthor(props.book.author);
    }
    if (props.book.year) {
      setYear(props.book.year);
    }
    if (props.book.category) {
      setCategory(props.book.category);
    }
    if (props.book.summary) {
      setSummary(props.book.summary);
    }
    if (props.book.bookID) {
      setBookID(props.book.bookID);
    }
    if (props.book.price) {
      setPrice(props.book.price);
    }
    if (props.book.image) {
      setImage(props.book.image);
    }
  }, [
    props.book.title,
    props.book.author,
    props.book.year,
    props.book.category,
    props.book.summary,
    props.book.id,
    props.book.bookID,
    props.book.price,
    props.book.image,
  ]);

  const id = props.location.pathname.slice(6);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [bookID, setBookID] = useState('');
  const [summary, setSummary] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

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

  let index = null;
  if (props.books) {
    //finds the book in books:
    index = 0;
    while (index < props.books.length && id != props.books[index].id) {
      index++;
    }
  }

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
  };

  if (props.loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={formSubmit}>
      <div className="book-details">
        <div className="book-image">
          <div
            className="image-container"
            style={img ? { backgroundImage: 'url(' + img + ')' } : null}
          ></div>
        </div>
        <div className="book-info">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Title:</strong>
                </td>
                <td>
                  <input
                    name="title"
                    type="text"
                    pattern="[a-z A-Z0-9''-.]{2,}"
                    placeholder="Title"
                    value={title}
                    onChange={changeInput}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Author:</strong>
                </td>
                <td>
                  <input
                    name="author"
                    type="text"
                    pattern="[a-z A-Z0-9''-.]{2,}"
                    placeholder="Author"
                    value={author}
                    onChange={changeInput}
                  ></input>
                </td>
              </tr>
              <tr className="category">
                <td>Category:</td>
                <td>
                  <select
                    name="category"
                    value={category}
                    onChange={changeInput}
                  >
                    <option value="Kids">Kids</option>
                    <option value="Romance">Romance</option>
                    <option value="Thriller">Thriller</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>
                  <input
                    name="year"
                    type="text"
                    pattern="[0-9]{4}"
                    title="Four digits only"
                    placeholder="0000"
                    value={year}
                    onChange={changeInput}
                  ></input>
                </td>
              </tr>
              <tr className="bookId">
                <td>BookID:</td>
                <td>
                  <input
                    type="text"
                    name="bookID"
                    pattern="[0-9]{10}"
                    title="Ten digits only"
                    placeholder="0000000000"
                    value={bookID}
                    onChange={changeInput}
                  ></input>
                </td>
              </tr>
              <tr className="summary">
                <td>Summary:</td>
                <td>
                  <textarea
                    name="summary"
                    placeholder="Summary"
                    onChange={changeInput}
                    value={summary}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Image:</td>
                <td>
                  <input
                    type="text"
                    name="image"
                    disabled="disabled"
                    value={image}
                    onChange={changeInput}
                  ></input>
                </td>
              </tr>
              <tr className="price">
                <td>Price:</td>
                <td>
                  $
                  <input
                    name="price"
                    type="text"
                    pattern="^\d+\.\d{2}$"
                    placeholder="00.00"
                    value={price}
                    onChange={changeInput}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksReducer.books,
    book: state.bookReducer,
    loading: state.booksReducer.loading,
  };
};

export default connect(mapStateToProps, { fetchBook, editBook })(EditBook);
