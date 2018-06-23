import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import HomeTileForm from './homeTileForm.jsx';

const HomeTileDialog = ({
  match,
}) => (
  <Dialog
    modal={false}
    open
    autoScrollBodyContent
  >
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
