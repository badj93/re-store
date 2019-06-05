const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

const getIndexCartBooks = (cartItems, id) => {
  return cartItems.findIndex((book) => book.id === id);
};

const updateCartItems = (cartItems, item, idx) => {
  if (idx === -1) {
    return [
      ...cartItems,
      item
    ];
  }
  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

const deleteCartItems = (cartItems, id) => {
  const idx = getIndexCartBooks(cartItems, id);
  return [
    ...cartItems.slice(0, idx),
    ...cartItems.slice(idx + 1)
  ];
};

const minusCountToCart = ({ cartItems, books }, id) => {
  const idx = getIndexCartBooks(cartItems, id);
  const oldItem = cartItems[idx];
  const item = books.find((book) => book.id === id);

  if (oldItem.count < 2) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }

  oldItem.count = oldItem.count - 1;
  oldItem.total = cartItems[idx].total - item.price;

  return [
    ...cartItems.slice(0, idx),
    oldItem,
    ...cartItems.slice(idx + 1)
  ];
};

const addTotal = (cartItems, item) => {
  const oldItem = cartItems[item.id];
  return oldItem.total + item;
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'FETCH_BOOKS_REQUESTED':
      return {
        ...state,
        books: [],
        loading: true,
        error: null,
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId);
      const idx = state.cartItems.findIndex((item) => item.id === book.id);
      const oldItem = state.cartItems[idx];

      const newItem = {
        id: book.id,
        title: book.title,
        count: 1,
        total: book.price
      };

      if (oldItem) {
        newItem.count += oldItem.count;
        newItem.total += oldItem.total;
      }

      return {
        ...state,
        orderTotal: state.orderTotal + book.price,
        cartItems: updateCartItems(state.cartItems, newItem, idx)
      };

    case 'BOOK_DELETE_TO_CART':
      return {
        ...state,
        cartItems: deleteCartItems(state.cartItems, action.payload)
      };

    case 'BOOK_MINUS_COUNT_TO_CART':
      return {
        ...state,
        cartItems: minusCountToCart(state, action.payload)
      };

    default:
      return state;
  }
};

export default reducer;
