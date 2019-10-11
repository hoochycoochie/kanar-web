import { combineReducers } from "redux";

import user from "./user";
import locale from "./locale";
import salepoint from "./salepoint";

const rootReducer = combineReducers({
  user,
  locale,
  salepoint
});

export default rootReducer;
