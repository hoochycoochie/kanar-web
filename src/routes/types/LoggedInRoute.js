import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

const LoggedInRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default compose(connect(mapStateToProps))(withRouter(LoggedInRoute));
