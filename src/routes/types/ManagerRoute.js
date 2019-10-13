import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { MANAGER_ROLE, ROOT_PATH } from "../../utils/constants";

const ManagerRoute = ({
  component: Component,
  authenticated,
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      checkUser(authenticated, roles) ? (
        <Component {...props} />
      ) : (
        <Redirect to={ROOT_PATH} />
      )
    }
  />
);

const checkUser = (authenticated, roles) => {
  if (!authenticated) {
    return false;
  }

  const roleSalerIndex = roles.findIndex(
    r => r.name.toString() == MANAGER_ROLE
  );
  if (roleSalerIndex < 0) {
    return false;
  }

  return true;
};
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  roles: state.user.roles
});

export default compose(connect(mapStateToProps))(withRouter(ManagerRoute));
