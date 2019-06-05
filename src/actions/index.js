const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUESTED'
  }
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  }
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
};

const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
};

const bookDeleteToCart = (bookId) => {
  return {
    type: 'BOOK_DELETE_TO_CART',
    payload: bookId
  }
};

const bookMinusCountToCart = (bookId) => {
  return {
    type: 'BOOK_MINUS_COUNT_TO_CART',
    payload: bookId
  }
};

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

export {
  fetchBooks,
  bookAddedToCart,
  bookDeleteToCart,
  bookMinusCountToCart
};
