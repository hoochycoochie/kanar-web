import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";
import { mainColor } from "../../utils/colors";

const products = "/saler-worker";
const salepoints = "/saler-worker/salepoints";
const operations = "/saler-worker/operations";
const activeStyle = { background: mainColor, color: "white" };

const SalerWorkerLeftNavbar = ({ props }) => {
  return (
    <div>
      <MenuItem
        button
        component={NavLink}
        to={products}
        style={
          props.location.pathname.toString() === products.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="products" />} />
      </MenuItem>

      <MenuItem
        component={NavLink}
        to={operations}
        style={
          props.location.pathname.toString() === operations.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="operations" />} />
      </MenuItem>

      <MenuItem
        component={NavLink}
        to={salepoints}
        style={
          props.location.pathname.toString() === salepoints.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="salepoints" />} />
      </MenuItem>
    </div>
  );
};

export default SalerWorkerLeftNavbar;
