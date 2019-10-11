import { SALEPOINT_CHANGE, SALEPOINT_CHANGE_ERROR } from "../types";

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
