import api from "../api";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUBMITING,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS
} from "../types";
import setHeaders from "../../utils/setHeaders";
import { USER_LOCAL_STORE } from "../../utils/constants";

export const signIn = credentials => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOGIN_USER_SUBMITING
      });
      const {
        data: { data: payload }
      } = await api.user.login(credentials);

      await setHeaders(payload.token);
      await dispath({
        type: LOGIN_USER_SUCCESS,
        payload
      });
    } catch (error) {
      await dispath({
        type: LOGIN_USER_ERROR,
        error: {
          ...error.response.data.error
        }
      });
    }
  };
};

export const signOut = () => {
  return async (dispath, getState) => {
    try {
      await localStorage.removeItem(USER_LOCAL_STORE);
      await dispath({
        type: LOGOUT_USER_SUCCESS
      });
    } catch (error) {
      await dispath({
        type: LOGOUT_USER_ERROR,
        error: {
          ...error.response.data.error
        }
      });
    }
  };
};
