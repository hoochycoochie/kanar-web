import {
  LOADING_MEMBERS,
  LOADING_MEMBERS_SUCCESS,
  LOADING_MEMBERS_ERROR
} from "../types";
import api from "../api"

export const fetchMembers = data => {
  return async (dispath, getState) => {
    try {
      await dispath({
        type: LOADING_MEMBERS
      });
      const company = await getState().user.company;
      const company_id = company.id;
      const body = { company_id, ...data };
      const {
        data: { data: payload }
      } = await api.user.getUsersByCompany(body);

      await dispath({
        type: LOADING_MEMBERS_SUCCESS,
        payload
      });
    } catch (error) {
      await dispath({
        type: LOADING_MEMBERS_ERROR,
        error: {
          ...error.response.data.error
        }
      });
    }
  };
};
