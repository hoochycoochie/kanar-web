import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import store from "./store";
import setHeaders from "./utils/setHeaders";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { USER_LOCAL_STORE } from "./utils/constants";
import { LOGIN_USER_SUCCESS } from "./store/types";

if (localStorage.getItem(USER_LOCAL_STORE)) {
  const user = JSON.parse(localStorage.getItem(USER_LOCAL_STORE));
  setHeaders(user.token);
  store.dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
