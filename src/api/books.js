import axios from 'axios';

export default axios.create({
  baseURL: 'https://bookstore-1b578.firebaseio.com/'
});
