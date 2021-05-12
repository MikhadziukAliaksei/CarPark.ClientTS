import { makeStyles } from '@material-ui/core/styles';
import { Field, Form, FormSpy } from 'react-final-form';
import React, { useState } from 'react';
import AppAppBar from '../components/AppAppBar';
import AppForm from '../components/AppForm';
import Link from '@material-ui/core/Link';
import RFTextField from '../components/RFTextField';
import FormFeedBack from '../components/FormFeedBack';
import FormButton from '../components/FormButton';
import Typography from '../components/Typography';

const useStyles = makeStyles((theme : any) => ({
    form: {
      marginTop: theme.spacing(6),
    },
    button: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    feedback: {
      marginTop: theme.spacing(2),
    },
  }));

  function SignIn() {
      const classes = useStyles();
      const [sent, setSent] = React.useState(false);
      const [login,setLogin]=useState(null);
      const [password,setPassword]=useState(null);


      const validate = (values: any) => {
        const errors = required(['email', 'password'], values);
    
        if (!errors.email) {
          const emailError = email(values.email, values);
          if (emailError) {
            errors.email = email(values.email, values);
          }
          setLogin(values.email)
          setPassword(values.password)
        }
        return errors;
      };

      const handleLogin=(e)=>
  {
    e.preventDefault();
    AuthService.login(login,password).then(
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage)
      }
    ).then(setSent(true));
  }

      return (
        <React.Fragment>
        <AppAppBar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {'Not a member yet? '}
              <Link href="/register" align="center" underline="always">
                Sign Up here
              </Link>
            </Typography>
          </React.Fragment>
          <Form onSubmit={handleLogin} subscription={{ submitting: true }} validate={validate}>
            {({ submitting }) => (
              <form onSubmit={handleLogin} className={classes.form} noValidate>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedBack className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                
                >
                  {submitting || sent ? 'In progress…' : 'Sign In'}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="#">
              Forgot password?
            </Link>
          </Typography>
        </AppForm>
      </React.Fragment>
      )
  };


  