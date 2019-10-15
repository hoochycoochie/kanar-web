import { LOADING_PRODUCTS_SUCCESS,LOADING_PRODUCTS_ERROR } from "../types";

const initialState = {
  loading: true,
  error: null,
  products: []
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS_SUCCESS:
      return {
        loading: false,
        error: null,
        products: action.payload
      };

    case LOADING_PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.error,
        products: []
      };

    default:
      return state;
  }
}
