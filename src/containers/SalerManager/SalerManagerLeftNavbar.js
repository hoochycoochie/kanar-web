import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";
import { mainColor } from "../../utils/colors";

const Dashboard = "/saler-manager";
const teams = "/saler-manager/teams";
const categories = "/saler-manager/categories";
const products = "/saler-manager/products";
const salepoints = "/saler-manager/salepoints";
const operations = "/saler-manager/operations";
const profile = "/saler-manager/profile";

const activeStyle = { background: mainColor, color: "white" };
const SalerManagerLeftNavbar = ({ props }) => {
  return (
    <div>
      <MenuItem
        button
        component={NavLink}
        to={Dashboard}
        style={
          props.location.pathname.toString() === Dashboard.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="dashboard" />} />
      </MenuItem>

      <MenuItem
        button
        component={NavLink}
        to={categories}
        style={
          props.location.pathname.toString() === categories.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="categories" />} />
      </MenuItem>

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
        to={teams}
        style={
          props.location.pathname.toString() === teams.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="teams" />} />
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


      <MenuItem
        component={NavLink}
        to={profile}
        style={
          props.location.pathname.toString() === profile.toString()
            ? activeStyle
            : null
        }
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="profile" />} />
      </MenuItem>
    </div>
  );
};

export default SalerManagerLeftNavbar;
