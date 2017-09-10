import React from 'react';
import AddIcon from 'material-ui/svg-icons/content/add';
import styled from 'styled-components';
import { grey500 } from 'material-ui/styles/colors';

const Container = styled.div`
  border: 4px dashed ${grey500};
  cursor: pointer;
  border-radius: 5px;
  padding: 50px;
`;

const StyledAddIcon = styled(AddIcon)`
  width: 48px !important;
  height: 48px !important;
`;

const AddHomeTile = () => (
  <Container>
    <StyledAddIcon color={grey500} />
  </Container>
);

export default AddHomeTile;
