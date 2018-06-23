import MenuItem from '@material-ui/core/MenuItem';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SuccessIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { accent1Color } from '../theme';

const green500 = green['500'];
const grey600 = grey['600'];
const orange500 = orange['500'];

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
        return <ErrorIcon nativeColor={this.getColor()} />;
      case inputState.SUCCESS:
        return <SuccessIcon nativeColor={this.getColor()} />;
      case inputState.CHECKING:
        return <CheckingIcon nativeColor={this.getColor()} />;
      default:
        return <AddIcon nativeColor={this.getColor()} />;
    }
  }

  render() {
    return (
      <MenuItem insetChildren leftIcon={this.getIcon()}>
        <TextField
          ref={(input) => { this.textInput = input; }}
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

                  setTimeout(() => {
                    this.setState({
                      inputState: inputState.NONE,
                    });
                    this.textInput.input.value = '';
                  }, 2000);
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
