import React from 'react';
import { Link } from 'react-router-dom';

const BookLink = (props) => {
  const { id, author, title, text } = props;

  let author1 = author;
  let author2 = '';
  let author3 = '';

  const indexAuthor = author.toLowerCase().indexOf(text.toLowerCase());
  if (indexAuthor > -1) {
    author1 = author.slice(0, indexAuthor);
    author2 = author.slice(indexAuthor, indexAuthor + text.length);
    author3 = author.slice(indexAuthor + text.length);
  }

  let title1 = title;
  let title2 = '';
  let title3 = '';

  const indexTitle = title.toLowerCase().indexOf(text.toLowerCase());
  if (indexTitle > -1) {
    title1 = title.slice(0, indexTitle);
    title2 = title.slice(indexTitle, indexTitle + text.length);
    title3 = title.slice(indexTitle + text.length);
  }

  const newAuthor = (
    <span>
      {author1}
      <b>{author2}</b>
      {author3}
    </span>
  );

  const newTitle = (
    <span>
      {title1}
      <b>{title2}</b>
      {title3}
    </span>
  );

  return (
    <Link to={`/edit/${id}`}>
      {newTitle}, {newAuthor}
    </Link>
  );
};

export default BookLink;
