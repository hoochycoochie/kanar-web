import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { changeSalepoint } from "../../store/actions/salepoint";
import { Box, Container } from "@material-ui/core";
import SalerWorkerOptions from "../../components/SalerWorkerOptions";

function OptionsScreen(props) {
  const chooseSalePoint = async salepoint => {
    const { selectSalepoint } = props;
    await selectSalepoint(salepoint);
    await props.history.push("/saler-worker");
  };

  const ifOnlyWorker = user => {
    const roles = user.roles;
    const workerIndex = roles.findIndex(
      r => r.name.toString() === "salerWorker"
    );

    if (workerIndex > -1 && roles.length == 1) {
      return <SalerWorkerOptions user={user} select={chooseSalePoint} />;
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
