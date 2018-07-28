import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ErrorIcon from '@material-ui/icons/Clear';
import SuccessIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const green500 = green['500'];
const orange500 = orange['500'];
const red500 = red['500'];

const inputState = {
  NONE: 'NONE',
  CHECKING: 'CHECKING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const StyledErrorIcon = styled(ErrorIcon)`
  color: ${red500} !important;
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  color: ${green500} !important;
`;

const StyledCheckingIcon = styled(AutorenewIcon)`
  color: ${orange500} !important;
  transform-origin: center center;
  animation-name: rotation;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: reverse;
`;

class AddCoupon extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
    this.state = {
      inputState: inputState.NONE,
    };
  }

  getIcon() {
    switch (this.state.inputState) {
      case inputState.ERROR:
        return <StyledErrorIcon />;
      case inputState.SUCCESS:
        return <StyledSuccessIcon />;
      case inputState.CHECKING:
        return <StyledCheckingIcon />;
      default:
        return <AddIcon />;
    }
  }

  checkCoupon(event) {
    if (event.target.value.length !== 19) return;

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
          this.textInput.current.value = '';
        }, 2000);
      })
      .catch(() => this.setState({
        inputState: inputState.ERROR,
      }));
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          {this.getIcon()}
        </ListItemIcon>
        <ListItemText
          primary={
            <TextField
              inputRef={this.textInput}
              disabled={this.state.inputState === inputState.CHECKING || this.state.inputState === inputState.SUCCESS}
              error={this.state.inputState === inputState.ERROR}
              onKeyPress={(event) => {
                if (event.which === 13) {
                  this.checkCoupon(event);
                }
              }}
              onBlur={(event => this.checkCoupon(event))}
              placeholder="ABCD-EFGH-IJKL-MNOP"
              fullWidth
            />
          }
        />
      </ListItem>
    );
  }
}

AddCoupon.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddCoupon;
