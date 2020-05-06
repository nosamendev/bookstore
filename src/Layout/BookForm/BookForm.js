import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const BookForm = (props) => {
  const formSubmit = (e) => {
    props.formSubmit(e);
  };

  const changeInput = (e) => {
    props.changeInput(e);
  };

  let editRedirect = null;
  if (props.submitted) {
    editRedirect = <Redirect to="/manage" />;
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <div className="book-details">
          <div className="book-image">
            <div
              className="image-container"
              style={
                props.img ? { backgroundImage: 'url(' + props.img + ')' } : null
              }
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
                      value={props.title}
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
                      value={props.author}
                      onChange={changeInput}
                    ></input>
                  </td>
                </tr>
                <tr className="category">
                  <td>Category:</td>
                  <td>
                    <select
                      name="category"
                      value={props.category}
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
                      value={props.year}
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
                      value={props.bookID}
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
                      value={props.summary}
                      onChange={changeInput}
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
                      value={props.image}
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
                      value={props.price}
                      onChange={changeInput}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="button-container">
              <button type="submit">Save</button>
              <Link className="button second-level" to="/manage">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
      {editRedirect}
    </>
  );
};

export default BookForm;
