import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import authService from './authService';
import TextField from '../formHelpers/textField.jsx';
import { accent1Color } from '../theme';
import MainSpinner from '../layout/mainSpinner.jsx';

const styles = {
  container: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '50px',
    maxWidth: '350px',
  },
  socialButton: {
    marginBottom: '20px',
  },
  icon: {
    height: '45%',
    marginRight: '10px',
  },
  loginButton: {
    marginTop: '20px',
  },
  registerButton: {
    marginTop: '10px',
  },
  errorMessage: {
    display: 'block',
    margin: '15px 0 0',
    color: accent1Color,
  },
  hidden: {
    display: 'none',
  },
};

function required(value) {
  if (!(value && value.length >= 1)) {
    return <FormattedMessage id="COMMON.FORM.REQUIRED" />;
  }

  return null;
}

function getErrorMessage(error) {
  if (error.code === 'user_exists') {
    return <FormattedMessage id="LOGIN.USER_EXISTS" />;
  }

  return <FormattedMessage id="LOGIN.WRONG_USERNAME_PASSWORD" />;
}

const LoginForm = ({
  error,
  handleSubmit,
  onSubmit,
  isAuthenticating,
}) => (
  <div style={styles.container}>
    <RaisedButton
      label={<FormattedMessage id="LOGIN.FACEBOOK" />}
      backgroundColor="#4267b2"
      labelColor="#FFF"
      onClick={() => authService.authorize('facebook')}
      style={styles.socialButton}
      icon={
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 216 216"
          style={styles.icon}
        >
          <path
            fill="#ffffff"
            d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
              11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
              11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
              15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
              11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"
          />
        </svg>
      }
    />
    <RaisedButton
      label={<FormattedMessage id="LOGIN.GOOGLE" />}
      onClick={() => authService.authorize('google-oauth2')}
      style={styles.socialButton}
      icon={
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          style={styles.icon}
        >
          <g>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            <path fill="none" d="M0 0h48v48H0z" />
          </g>
        </svg>
      }
    />
    <Divider />
    {isAuthenticating ? <MainSpinner /> : null}
    <form name="login" style={isAuthenticating ? styles.hidden : null}>
      {error && (
        <div style={styles.errorMessage}>
          {getErrorMessage(error)}
        </div>
      )}
      <Field
        component={TextField}
        label={<FormattedMessage id="LOGIN.EMAIL" />}
        name="username"
        type="text"
        fullWidth
        validate={required}
      />
      <Field
        component={TextField}
        label={<FormattedMessage id="LOGIN.PASSWORD" />}
        name="password"
        type="password"
        fullWidth
        validate={required}
      />
      <RaisedButton
        type="submit"
        label={<FormattedMessage id="LOGIN.LOGIN" />}
        style={styles.loginButton}
        primary
        fullWidth
        onClick={handleSubmit(values => onSubmit({ ...values, submit: 'login' }))}
      />
      <RaisedButton
        type="submit"
        label={<FormattedMessage id="LOGIN.REGISTER" />}
        style={styles.registerButton}
        secondary
        fullWidth
        onClick={handleSubmit(values => onSubmit({ ...values, submit: 'register' }))}
      />
    </form>
  </div>
);

LoginForm.propTypes = {
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAuthenticating: PropTypes.boolean.isRequired,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
