import {
  SALEPOINT_CHANGE,
  SALEPOINT_CHANGE_ERROR,
  LOADING_SALEPOINTS_ERROR,
  LOADING_SALEPOINTS_SUCCESS,
  LOADING_SALEPOINTS
} from "../types";
import api from "../api";

export const changeSalepoint = salepoint => {
  return async dispath => {
    try {
      await dispath({
        type: SALEPOINT_CHANGE,
        payload: salepoint
      });
    } catch (error) {
      await dispath({
        type: SALEPOINT_CHANGE_ERROR,
        error
      });
    }
  };
};

export const fetchSalepoints = data => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOADING_SALEPOINTS
      });
      const company = await getState().user.company;
      const company_id = company.id;
      const body = { company_id, ...data };
      const {
        data: { data: payload }
      } = await api.salepoints.getSalepointsByCompany(body);

      await dispath({
        type: LOADING_SALEPOINTS_SUCCESS,
        payload
      });
    } catch (error) {
      await dispath({
        type: LOADING_SALEPOINTS_ERROR,
        error: {
          ...error.response.data.error
        }
      });
    }
  };
};
