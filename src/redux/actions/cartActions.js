export const ADD_CART = 'ADD_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';

export const addCart = (product, quantity = 1) => ({
  type: ADD_CART,
  payload: { product, quantity },
});

export const updateCart = (productId, quantity) => ({
  type: UPDATE_CART,
  payload: { productId, quantity },
});

export const deleteCart = (productId) => ({
  type: DELETE_CART,
  payload: productId,
});
