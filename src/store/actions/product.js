import api from "../api";
import {
  LOADING_PRODUCTS_ERROR,
  LOADING_PRODUCTS,
  LOADING_PRODUCTS_SUCCESS
} from "../types";

export const fetchProductBySalePoint = data => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOADING_PRODUCTS
      });
      const company = await getState().user.company;
      const salepoint = await getState().salepoint;
      const company_id = company.id;
      const salepoint_id = salepoint.salepoint.salepoint_id;

      const query = { company_id, salepoint_id, ...data };
      const {
        data: { data: payload }
      } = await api.products.getProductBySalepoint(query);

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

export const fetchProducts = data => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOADING_PRODUCTS
      });
      const company = await getState().user.company;
      const salepoint = await getState().salepoint;
      const company_id = company.id;
      //const salepoint_id = salepoint && salepoint.salepoint && salepoint.salepoint.salepoint_id :null;

      const query = { company_id, ...data };
      console.log("query", query);
      const {
        data: { data: payload }
      } = await api.products.getProducts(query);

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
