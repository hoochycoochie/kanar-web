import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  SALER_MANAGER_ROLE,
  ROOT_PATH,
  SALER_ROLE
} from "../../utils/constants";

const SalerManagerRoute = ({
  component: Component,
  authenticated,
  companyId,
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      checkUser(authenticated, roles, companyId) ? (
        <Component {...props} />
      ) : (
        <Redirect to={ROOT_PATH} />
      )
    }
  />
);

const checkUser = (authenticated, roles, companyId) => {
  if (!authenticated) {
    return false;
  }
  if (!companyId) {
    return false;
  }
  if (!roles || !roles.length) {
    return false;
  }
  const roleSalerIndex = roles.findIndex(
    r =>
      r.name.toString() == SALER_MANAGER_ROLE || r.name.toString() == SALER_ROLE
  );
  if (roleSalerIndex < 0) {
    return false;
  }

  return true;
};
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  roles: state.user && state.user.roles ? state.user.roles : null,
  companyId:
    state.user && state.user.company && state.user.company.id
      ? state.user.company.id
      : null
});

export default compose(connect(mapStateToProps))(withRouter(SalerManagerRoute));
