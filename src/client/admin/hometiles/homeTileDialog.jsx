import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import HomeTileForm from './homeTileForm.jsx';

const HomeTileDialog = ({
  match,
}) => (
  <Dialog modal open>
    <HomeTileForm selectedTileId={match.params.id === 'new' ? '' : match.params.id} />
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
