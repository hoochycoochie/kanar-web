import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUBMITING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR
} from "../types";
import { USER_LOCAL_STORE } from "../../utils/constants";

const initialState = {
  authenticated: false,
  error: null,
  loading: false
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      localStorage.setItem(USER_LOCAL_STORE, JSON.stringify(action.payload));
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };

    case LOGIN_USER_SUBMITING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_USER_ERROR:
      return {
        authenticated: false,
        loading: false,
        error: action.error
      };

    case LOGOUT_USER_SUCCESS:
      return {
        authenticated: false,
        loading: false,
        error: action.error
      };

    case LOGOUT_USER_ERROR:
      return state;

    default:
      return state;
  }
}
