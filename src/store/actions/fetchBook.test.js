import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { fetchBook, fetchBookFailed } from './fetchBook';
import books from '../../api/books';

describe('Testing fetchBook action creator', () => {
  beforeEach(() => {
    moxios.install(books);
  });
  afterEach(() => {
    moxios.uninstall(books);
  });
  test('adds book info response to state', () => {
    const book = {
      admin: 'test@test.com',
      author: 'someAuthor',
      bookID: '0123456789',
      category: 'Kids',
      id: 'someId',
      image: 'image1.jpg',
      price: '20.00',
      summary: 'someSummary',
      title: 'someTitle',
      userId: '0123456789xyz',
      year: '2003',
    };
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: book,
      });
    });

    const id = 'someId';

    return store.dispatch(fetchBook(id)).then(() => {
      const newState = store.getState().bookReducer;
      //console.log(newState);
      expect(newState.admin).toBe('test@test.com');
      expect(newState.author).toBe('someAuthor');
      expect(newState.bookID).toBe('0123456789');
      expect(newState.category).toBe('Kids');
      expect(newState.id).toBe('someId');
      expect(newState.image).toBe('image1.jpg');
      expect(newState.price).toBe('20.00');
      expect(newState.summary).toBe('someSummary');
      expect(newState.title).toBe('someTitle');
      expect(newState.userId).toBe('0123456789xyz');
      expect(newState.year).toBe('2003');
    });
  });
});
