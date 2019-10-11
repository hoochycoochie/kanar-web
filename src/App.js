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

function App(props) {
  return (
    <BrowserRouter>
      <IntlProvider
        locale={props.locale}
        messages={languageObject[props.locale]}
      >
        <Switch>
          <GuestRoute path="/" component={Blog} exact />
          <GuestRoute path="/login" component={SignIn} />

          <SalerManagerRoute
            path="/saler-manager"
            component={Dashboard}
            exact
          />
          <SalerManagerRoute path="/saler-manager/orders" component={Orders} />
          <SalerManagerRoute path="/saler-manager/teams" component={TeamList} />
          <SalerManagerRoute
            path="/saler-manager/categories"
            component={CategoryList}
          />
          <SalerManagerRoute
            path="/saler-manager/products"
            component={ProductList}
          />
          <SalerManagerRoute
            path="/saler-manager/salepoints"
            component={SalePointList}
          />
          <SalerManagerRoute
            path="/saler-manager/operations"
            component={ProductOperationList}
          />
          <SalerManagerRoute
            path="/saler-manager/profile"
            component={ProfileSaleManager}
          />

          <SalerWorkerRoute
            path="/saler-worker"
            component={ProductListWorker}
          />

          <SalerWorkerRoute
            path="/saler-worker/salepoints"
            component={SalePointListWorker}
          />

          <SalerWorkerRoute
            path="/saler-worker/operations"
            component={ProductOperationListWorker}
          />
          <LoggedInRoute path="/options-page" component={OptionsScreen} />
        </Switch>
      </IntlProvider>
    </BrowserRouter>
  );
}
const mapStateToProps = state => ({ locale: state.locale.language });

export default connect(mapStateToProps)(App);
