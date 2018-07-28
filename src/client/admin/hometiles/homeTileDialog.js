import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import React from 'react';
import HomeTileForm from './homeTileForm';

const HomeTileDialog = ({
  match,
}) => (
  <Dialog
    keepMounted
    open
  >
    <DialogContent>
      <DialogContentText component="div">
        <HomeTileForm selectedTileId={match.params.id === 'new' ? '' : match.params.id} />
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

HomeTileDialog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default HomeTileDialog;
