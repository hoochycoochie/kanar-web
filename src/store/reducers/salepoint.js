import {
  SALEPOINT_SELECTED,
  SALEPOINT_CHANGE,
  SALEPOINT_CHANGE_ERROR,
  LOGOUT_USER_SUCCESS
} from "../types";

const initialState = {
  selected: false,
  error: null,
  salepoint: null
};

export default function currentSalePoint(state = initialState, action) {
  switch (action.type) {
    case SALEPOINT_SELECTED:
      return {
        selected: true,
        salepoint: action.payload
      };

    case SALEPOINT_CHANGE:
      return {
        selected: true,
        loading: false,
        salepoint: action.payload
      };
    case SALEPOINT_CHANGE_ERROR:
      return {
        selected: false,
        error: action.error,
        salepoint: {}
      };

    case LOGOUT_USER_SUCCESS:
      return {
        selected: false,
        error: action.error,
        salepoint: {}
      };
    default:
      return state;
  }
}
