import { CHANGE_LOCALE } from "../types";

const initialState = {
  language: "fr"
};

export default function locale(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        language: action.locale
      };

    default:
      return state;
  }
}
