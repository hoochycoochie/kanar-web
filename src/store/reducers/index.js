import { combineReducers } from "redux";
import user from "./user";
import locale from "./locale";
import { currentSalePoint, salepoints } from "./salepoint";
import products from "./product";
import categories from "./category";
import members from "./member";

const rootReducer = combineReducers({
  user,
  locale,
  salepoint: currentSalePoint,
  salepoints,
  products,
  categories,
  members
});

export default rootReducer;
