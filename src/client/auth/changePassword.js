import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import TextField from '../formHelpers/textField';
import AuthService from './authService';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 50px;
  max-width: 400px;
`;

function required(value) {
  if (!(value && value.length >= 1)) {
    return <FormattedMessage id="COMMON.FORM.REQUIRED" />;
  }

  return null;
}

class ChangePassword extends React.Component {
  constructor() {
    super();

    this.state = {
      showConfirmation: false,
    };
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        {this.state.showConfirmation ? (
          <p>
            {this.state.showConfirmation}
          </p>
        ) : (
          <form>
            <Field
              component={TextField}
              label={<FormattedMessage id="LOGIN.EMAIL" />}
              name="email"
              type="email"
              fullWidth
              validate={required}
            />
            <Button
              variant="contained"
              type="submit"
              label={<FormattedMessage id="LOGIN.RESET_PASSWORD" />}
              color="primary"
              fullWidth
              onClick={handleSubmit(({ email }) =>
                AuthService.resetPassword(email)
                  .then(() => this.setState({ showConfirmation: <FormattedMessage id="LOGIN.MAIL_SENT" /> }))
                  .catch(() => this.setState({ showConfirmation: <FormattedMessage id="LOGIN.MAIL_NOT_SENT" /> }))
              )}
            />
          </form>
        )}
      </Container>
    );
  }
}

ChangePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'changePassword',
})(ChangePassword);
