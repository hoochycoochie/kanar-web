import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./containers/SalerManager/Dashboard";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import languageObject from "./i18n/messages";
import Orders from "./containers/SalerManager/Orders";
import CategoryList from "./containers/SalerManager/CategoryList";
import TeamList from "./containers/SalerManager/TeamList";
import ProductList from "./containers/SalerManager/ProductList";
import SalePointList from "./containers/SalerManager/SalePointList";
import ProductOperationList from "./containers/SalerManager/ProductOperationList";
import Blog from "./containers/home/Blog";
import SignIn from "./containers/login";
import GuestRoute from "./routes/types/GuestRoute";
import SalerManagerRoute from "./routes/types/SalerManagerRoute";
import ProfileSaleManager from "./containers/SalerManager/ProfileSaleManager";
import LoggedInRoute from "./routes/types/LoggedInRoute";
import OptionsScreen from "./containers/options/OptionsScreen";
import SalerWorkerRoute from "./routes/types/SalerWorkerRoute";
import ProductListWorker from "./containers/SalerWorker/ProductListWorker";
import SalePointListWorker from "./containers/SalerWorker/SalePointListWorker";
import ProductOperationListWorker from "./containers/SalerWorker/ProductOperationListWorker";
import {
  OPTION_PAGE_PATH,
  ROOT_PATH,
  LOGIN_PATH,
  SALER_MANAGER_ROOT_PATH,
  SALER_MANAGER_ORDERS_PATH,
  SALER_MANAGER_TEAM_PATH,
  SALER_MANAGER_CATEGORIES_PATH,
  SALER_MANAGER_PRODUCTS_PATH,
  SALER_MANAGER_OPERATIONS_PATH,
  SALER_MANAGER_PROFILE_PATH,
  SALER_WORKER_ROOT_PATH,
  SALER_WORKER_SALEPOINTS_PATH,
  SALER_WORKER_OPERATIONS_PATH,
  SALER_MANAGER_SALEPOINTS_PATH
} from "./utils/constants";

function App(props) {
  return (
    <BrowserRouter>
      <IntlProvider
        locale={props.locale}
        messages={languageObject[props.locale]}
      >
        <Switch>
          <GuestRoute path={ROOT_PATH} component={Blog} exact />
          <GuestRoute path={LOGIN_PATH} component={SignIn} />

          <SalerManagerRoute
            path={SALER_MANAGER_ROOT_PATH}
            component={Dashboard}
            exact
          />
          <SalerManagerRoute
            path={SALER_MANAGER_ORDERS_PATH}
            component={Orders}
          />
          <SalerManagerRoute
            path={SALER_MANAGER_TEAM_PATH}
            component={TeamList}
          />
          <SalerManagerRoute
            path={SALER_MANAGER_CATEGORIES_PATH}
            component={CategoryList}
          />
          <SalerManagerRoute
            path={SALER_MANAGER_PRODUCTS_PATH}
            component={ProductList}
          />
          <SalerManagerRoute
            path={SALER_MANAGER_SALEPOINTS_PATH}
            component={SalePointList}
          />
          <SalerManagerRoute
            path={SALER_MANAGER_OPERATIONS_PATH}
            component={ProductOperationList}
          />
          <SalerManagerRoute
            path={SALER_MANAGER_PROFILE_PATH}
            component={ProfileSaleManager}
          />

          <SalerWorkerRoute
            path={SALER_WORKER_ROOT_PATH}
            component={ProductListWorker}
          />

          <SalerWorkerRoute
            path={SALER_WORKER_SALEPOINTS_PATH}
            component={SalePointListWorker}
          />

          <SalerWorkerRoute
            path={SALER_WORKER_OPERATIONS_PATH}
            component={ProductOperationListWorker}
          />
          <LoggedInRoute path={OPTION_PAGE_PATH} component={OptionsScreen} />
        </Switch>
      </IntlProvider>
    </BrowserRouter>
  );
}
const mapStateToProps = state => ({ locale: state.locale.language });

export default connect(mapStateToProps)(App);
