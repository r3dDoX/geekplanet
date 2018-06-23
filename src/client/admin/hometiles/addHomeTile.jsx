import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';

const grey500 = grey['500'];

const Container = styled.div`
  border: 4px dashed ${grey500};
  cursor: pointer;
  border-radius: 5px;
  padding: 50px;
  margin-left: 20px;
`;

const StyledAddIcon = styled(AddIcon)`
  width: 48px !important;
  height: 48px !important;
`;

const AddHomeTile = () => (
  <Container>
    <StyledAddIcon nativeColor={grey500} />
  </Container>
);

export default AddHomeTile;
