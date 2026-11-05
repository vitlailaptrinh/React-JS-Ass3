import { HIDE_POPUP, SHOW_POPUP } from '../actions/popupActions';

const initialState = {
  isVisible: false,
  product: null,
};

function popupReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_POPUP:
      return {
        isVisible: true,
        product: action.payload,
      };
    case HIDE_POPUP:
      return initialState;
    default:
      return state;
  }
}

export default popupReducer;
