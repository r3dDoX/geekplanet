import MenuItem from 'material-ui/MenuItem';
import { green500, grey600, orange500 } from 'material-ui/styles/colors';
import AutorenewIcon from 'material-ui/svg-icons/action/autorenew';
import SuccessIcon from 'material-ui/svg-icons/action/done';
import AddIcon from 'material-ui/svg-icons/content/add';
import ErrorIcon from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { accent1Color } from '../theme';

const inputState = {
  NONE: 'NONE',
  CHECKING: 'CHECKING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const CheckingIcon = styled(AutorenewIcon)`
  ransform-origin: center center;
  transform-box: fill-box;
  animation-name: rotation;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: reverse;
`;

class AddCoupon extends React.Component {
  constructor() {
    super();

    this.state = {
      inputState: inputState.NONE,
    };
  }

  getColor() {
    switch (this.state.inputState) {
      case inputState.ERROR:
        return accent1Color;
      case inputState.SUCCESS:
        return green500;
      case inputState.CHECKING:
        return orange500;
      default:
        return grey600;
    }
  }

  getIcon() {
    switch (this.state.inputState) {
      case inputState.ERROR:
        return <ErrorIcon color={this.getColor()} />;
      case inputState.SUCCESS:
        return <SuccessIcon color={this.getColor()} />;
      case inputState.CHECKING:
        return <CheckingIcon color={this.getColor()} />;
      default:
        return <AddIcon color={this.getColor()} />;
    }
  }

  render() {
    return (
      <MenuItem insetChildren leftIcon={this.getIcon()}>
        <TextField
          disabled={this.state.inputState === inputState.CHECKING}
          underlineStyle={{
            borderColor: this.getColor(),
          }}
          underlineDisabledStyle={{
            borderColor: this.getColor(),
          }}
          onKeyPress={(event) => {
            if (event.which === 13 && event.target.value.length === 19) {
              this.setState({
                inputState: inputState.CHECKING,
              });

              this.props.onAdd(event.target.value)
                .then(() => {
                  this.setState({
                    inputState: inputState.SUCCESS,
                  });

                  setTimeout(() => this.setState({
                    inputState: inputState.NONE,
                  }), 2000);
                })
                .catch(() => this.setState({
                  inputState: inputState.ERROR,
                }));
            }
          }}
          hintText="ABCD-EFGH-IJKL-MNOP"
        />
      </MenuItem>
    );
  }
}

AddCoupon.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddCoupon;
