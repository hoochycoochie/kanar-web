import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { changeSalepoint } from "../../store/actions/salepoint";
import { Box, Container } from "@material-ui/core";
import SalerWorkerOptions from "../../components/SalerWorkerOptions";
import SalerManagerOptions from "../../components/SalerManagerOptions";
import SalerOptions from "../../components/SalerOptions";
import {
  SALER_WORKER_ROOT_PATH,
  SALER_MANAGER_ROOT_PATH,
  SALER_MANAGER_ROLE,
  SALER_WORKER_ROLE,
  SALER_ROLE
} from "../../utils/constants";

function OptionsScreen(props) {
  const chooseSalePoint = async salepoint => {
    const { selectSalepoint } = props;
    await selectSalepoint(salepoint);
    await props.history.push(SALER_WORKER_ROOT_PATH);
  };
  const goToManagerScreen = async () => {
    await props.history.push(SALER_MANAGER_ROOT_PATH);
  };

  const ifOnlyWorker = user => {
    const roles = user.roles;
    const workerIndex = roles.findIndex(
      r => r.name.toString() === SALER_WORKER_ROLE
    );

    if (workerIndex > -1 && roles.length == 1) {
      return <SalerWorkerOptions user={user} select={chooseSalePoint} />;
    }
    const salerManagerIndex = roles.findIndex(
      r => r.name.toString() === SALER_MANAGER_ROLE
    );

    if (salerManagerIndex > -1 && roles.length == 1) {
      return <SalerManagerOptions user={user} select={goToManagerScreen} />;
    }

    if (salerManagerIndex > -1 && workerIndex > -1) {
      return (
        <div>
          <SalerManagerOptions user={user} select={goToManagerScreen} />

          <h1>OU</h1>
          <SalerWorkerOptions user={user} select={chooseSalePoint} />
        </div>
      );
    }

    const salerIndex = roles.findIndex(r => r.name.toString() === SALER_ROLE);

    if (salerIndex > -1) {
      return <SalerOptions select={goToManagerScreen} />;
    }

    return null;
  };
  const { user } = props;
  return (
    <Container maxWidth="sm">
      <Box color="text.primary" clone xs={12}>
        {ifOnlyWorker(user)}
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    salepoint: state.salepoint
  };
};

const mapStateDispatchProps = dispatch => {
  return {
    selectSalepoint: salepoint => dispatch(changeSalepoint(salepoint))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapStateDispatchProps
  )
)(OptionsScreen);
