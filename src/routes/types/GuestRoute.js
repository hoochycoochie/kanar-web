import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { OPTION_PAGE_PATH } from "../../utils/constants";

const GuestRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={OPTION_PAGE_PATH} />
      )
    }
  />
);
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default compose(connect(mapStateToProps))(withRouter(GuestRoute));
