import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { LOGIN_PATH } from "../../utils/constants";

const LoggedInRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to={LOGIN_PATH} />
    }
  />
);
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default compose(connect(mapStateToProps))(withRouter(LoggedInRoute));
