import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const AdminRoute = ({
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
        <Redirect to="/" />
      )
    }
  />
);

const checkUser = (authenticated, roles) => {
  if (!authenticated) {
    return false;
  }

  const roleSalerIndex = roles.findIndex(r => r.name.toString() == "admin");
  if (roleSalerIndex < 0) {
    return false;
  }

  return true;
};
const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  roles: state.user.roles
});

export default compose(connect(mapStateToProps))(withRouter(AdminRoute));
