import axios from 'axios';

export default axios.create({
  baseURL: 'https://bookstore-fb02e.firebaseio.com/',
});
