import { LOADING_CATEGORIES_SUCCESS, LOADING_CATEGORIES_ERROR } from "../types";

const initialState = {
  loading: true,
  error: null,
  categories: []
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case LOADING_CATEGORIES_SUCCESS:
      return {
        loading: false,
        error: null,
        categories: action.payload
      };

    case LOADING_CATEGORIES_ERROR:
      return {
        loading: false,
        error: action.error,
        categories: []
      };

    default:
      return state;
  }
}
