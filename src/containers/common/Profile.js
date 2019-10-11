import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

const Profile = props => {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar
        alt="Remy Sharp"
        src="https://img.pngio.com/image-png-gratuite-image-png-gratuite-telecharger-256_256.png"
        className={classes.avatar}
      />
      <Avatar
        alt="Remy Sharp"
        src="https://img.pngio.com/image-png-gratuite-image-png-gratuite-telecharger-256_256.png"
        className={classes.bigAvatar}
      />
    </Grid>
  );
};

export default Profile;
