import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";

import SendIcon from "@material-ui/icons/Send";

import { FormattedMessage } from "react-intl";
import { mainColor } from "../utils/colors";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const SalerWorkerOptions = ({ user, select }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography style={{ color: mainColor }}>
        <FormattedMessage id="choose_working_places" />
      </Typography>

      <MenuList>
        {user.salepoints.map(s => (
          <MenuItem
            key={s.id}
            button
            onClick={async e => {
              await select(s);
            }}
          >
            <ListItemIcon key={s.id}>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">{s.name}</Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};

export default SalerWorkerOptions;
