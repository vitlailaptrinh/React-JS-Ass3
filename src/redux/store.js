import { combineReducers, legacy_createStore } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import popupReducer from './reducers/popupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  popup: popupReducer,
});

function getSavedUser() {
  try {
    const savedUser = JSON.parse(localStorage.getItem('userInfo') || 'null');
    return savedUser && typeof savedUser === 'object' ? savedUser : null;
  } catch {
    return null;
  }
}

function getSavedCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (Array.isArray(savedCart)) return savedCart;
    return Array.isArray(savedCart?.listCart) ? savedCart.listCart : [];
  } catch {
    return [];
  }
}

const savedUser = getSavedUser();
const savedCart = getSavedCart();
const store = legacy_createStore(rootReducer, {
  auth: {
    isLoggedIn: Boolean(savedUser),
    user: savedUser,
  },
  cart: {
    listCart: savedCart,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.listCart));
  } catch {
    // Keep the in-memory cart usable when browser storage is unavailable.
  }
});

export default store;
