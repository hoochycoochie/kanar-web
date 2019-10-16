import { LOADING_MEMBERS_SUCCESS, LOADING_MEMBERS_ERROR } from "../types";

const initialState = {
  loading: true,
  error: null,
  members: []
};

export default function members(state = initialState, action) {
  switch (action.type) {
    case LOADING_MEMBERS_SUCCESS:
      return {
        loading: false,
        error: null,
        members: action.payload
      };

    case LOADING_MEMBERS_ERROR:
      return {
        loading: false,
        error: action.error,
        members: []
      };

    default:
      return state;
  }
}
