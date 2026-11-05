import { ADD_CART, DELETE_CART, UPDATE_CART } from '../actions/cartActions';

function getProductId(product) {
  const id = product?._id;
  return typeof id === 'object' && id !== null ? id.$oid : id;
}

const initialState = {
  listCart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART: {
      const { product, quantity } = action.payload;
      const productId = getProductId(product);
      const amount = Math.max(1, Math.floor(Number(quantity) || 1));
      const existingItem = state.listCart.find(
        (item) => String(getProductId(item)) === String(productId),
      );

      if (existingItem) {
        return {
          ...state,
          listCart: state.listCart.map((item) =>
            String(getProductId(item)) === String(productId)
              ? { ...item, quantity: (Number(item.quantity) || 1) + amount }
              : item,
          ),
        };
      }

      return {
        ...state,
        listCart: [...state.listCart, { ...product, quantity: amount }],
      };
    }
    case UPDATE_CART: {
      const { productId, quantity } = action.payload;
      const amount = Math.max(1, Math.floor(Number(quantity) || 1));
      return {
        ...state,
        listCart: state.listCart.map((item) =>
          String(getProductId(item)) === String(productId)
            ? { ...item, quantity: amount }
            : item,
        ),
      };
    }
    case DELETE_CART:
      return {
        ...state,
        listCart: state.listCart.filter(
          (item) => String(getProductId(item)) !== String(action.payload),
        ),
      };
    default:
      return state;
  }
}

export default cartReducer;
