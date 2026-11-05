import { ON_LOGIN, ON_LOGOUT } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ON_LOGIN:
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case ON_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
