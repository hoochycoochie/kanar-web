import {
  LOADING_CATEGORIES_ERROR,
  LOADING_CATEGORIES,
  LOADING_CATEGORIES_SUCCESS
} from "../types";
import api from "../api";

export const fetchCats = data => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOADING_CATEGORIES
      });
      const company = await getState().user.company;
      const company_id = company.id;
      const body = { company_id, ...data };
      const {
        data: { data: payload }
      } = await api.categories.getCategoriesByCompany(body);

      await dispath({
        type: LOADING_CATEGORIES_SUCCESS,
        payload
      });
    } catch (error) {
      await dispath({
        type: LOADING_CATEGORIES_ERROR,
        error: {
          ...error.response.data.error
        }
      });
    }
  };
};
