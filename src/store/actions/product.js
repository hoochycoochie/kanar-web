import api from "../api";
import {
  LOADING_PRODUCTS_ERROR,
  LOADING_PRODUCTS,
  LOADING_PRODUCTS_SUCCESS
} from "../types";

export const fetchProducts = data => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOADING_PRODUCTS
      });
      const company = await getState().user.company;
      const salepoint = await getState().salepoint;
      const companyId = company.id;
      const salepointId = salepoint.salepoint.salepoint_id;

      const query = { companyId, salepointId, ...data };
      const {
        data: { data: payload }
      } = await api.products.getProductBySalepoint(query);
console.log("payload",payload)
      await dispath({
        type: LOADING_PRODUCTS_SUCCESS,
        payload
      });
    } catch (error) {
      await dispath({
        type: LOADING_PRODUCTS_ERROR,
        error: {
          ...error.response.data.error
        }
      });
    }
  };
};
