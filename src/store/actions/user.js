import api from "../api";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUBMITING
} from "../types";
import setHeaders from "../../utils/setHeaders";

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
