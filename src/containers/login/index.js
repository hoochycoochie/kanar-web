import React from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { compose } from "redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormattedMessage } from "react-intl";
import CopyRight from "../common/CopyRight";
import { signIn } from "../../store/actions/user";
import Loading from "../../components/Loading";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = props => {
  const {
    values,
    touched,
    errors,
    error,
    handleChange,
    handleSubmit,
    loading
  } = props;
  const classes = useStyles();
  let content = (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      {error && error.path && (
        <h1 style={{ color: "red", textAlign: "center" }}>
          {<FormattedMessage id={error.msg} />}
        </h1>
      )}

      <TextField
        variant="outlined"
        margin="normal"
        onChange={handleChange}
        fullWidth
        id="identifiant"
        label={<FormattedMessage id="mail_or_phone" />}
        value={values.identifiant}
        name="identifiant"
        required
        error={
          !!errors.identifiant ||
          (error && error.path.toString() === "identifiant")
        }
        helperText={
          touched.identifiant && errors.identifiant ? errors.identifiant : null
        }
      />

      <TextField
        variant="outlined"
        margin="normal"
        onChange={handleChange}
        fullWidth
        required
        id="reference"
        label={<FormattedMessage id="reference" />}
        value={values.reference}
        name="reference"
        error={
          !!errors.reference || (error && error.path.toString() === "reference")
        }
        helperText={
          touched.reference && errors.reference ? errors.reference : null
        }
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        onChange={handleChange}
        label={<FormattedMessage id="password" />}
        value={values.password}
        type="password"
        id="password"
        autoComplete="current-password"
        error={
          !!errors.password || (error && error.path.toString() === "password")
        }
        helperText={
          touched.password && errors.password ? errors.password : null
        }
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={async e => {
          e.preventDefault();

          await handleSubmit();
        }}
      >
        <FormattedMessage id="login" />
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            <FormattedMessage id="forgot_password_question" />
          </Link>
        </Grid>
        <br />
        <Grid item>
          <Link href="#" variant="body2">
            {<FormattedMessage id="no_account_question" />}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
  if (loading) {
    content = <Loading />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="login" />
        </Typography>
        {content}
      </div>
      <Box mt={8}>
        <CopyRight />
      </Box>
    </Container>
  );
};

const loginSchema = Yup.object().shape({
  identifiant: Yup.string().required(<FormattedMessage id="required" />),
  reference: Yup.number().required(<FormattedMessage id="required" />),
  password: Yup.string().required(<FormattedMessage id="required" />)
});
const mapDistpathToProps = dispatch => {
  return {
    login: credentials => dispatch(signIn(credentials))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    user: state.user,
    error: state.user.error || null
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDistpathToProps
  ),

  withFormik({
    validationSchema: loginSchema,
    mapPropsToValues: () => ({
      identifiant: "",
      reference: "",
      password: ""
    }),
    handleSubmit: async (
      { identifiant, reference, password },
      { props, setSubmitting, setFieldError, resetForm }
    ) => {
      try {
        const { login, user, history } = props;
        await login({ identifiant, reference, password });

        await history.push("/options-page");
      } catch (error) {
        throw error;
      }
    }
  })
)(Login);
