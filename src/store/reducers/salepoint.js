import {
  SALEPOINT_SELECTED,
  SALEPOINT_CHANGE,
  SALEPOINT_CHANGE_ERROR,
  LOGOUT_USER_SUCCESS,
  LOADING_SALEPOINTS_SUCCESS,
  LOADING_SALEPOINTS_ERROR
} from "../types";
import { CURRENT_SALE_POINT } from "../../utils/constants";

const initialState = {
  selected: false,
  error: null,
  salepoint: null
};

export const currentSalePoint = (state = initialState, action) => {
  switch (action.type) {
    case SALEPOINT_SELECTED:
      return {
        selected: true,
        salepoint: action.payload
      };

    case SALEPOINT_CHANGE:
      localStorage.setItem(CURRENT_SALE_POINT, JSON.stringify(action.payload));
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
};

const initialState2 = {
  loading: true,
  error: null,
  salepoints: []
};

export const salepoints = (state = initialState2, action) => {
  switch (action.type) {
    case LOADING_SALEPOINTS_SUCCESS:
      return {
        loading: false,
        error: null,
        salepoints: action.payload
      };

    case LOADING_SALEPOINTS_ERROR:
      return {
        loading: false,
        error: action.error,
        salepoints: []
      };

    default:
      return state;
  }
};
