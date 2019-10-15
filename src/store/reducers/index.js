import { combineReducers } from "redux";
import user from "./user";
import locale from "./locale";
import salepoint from "./salepoint";
import products from "./product";

const rootReducer = combineReducers({
  user,
  locale,
  salepoint,
  products
});

export default rootReducer;
