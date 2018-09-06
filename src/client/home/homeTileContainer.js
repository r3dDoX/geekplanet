import styled from 'styled-components';
import theme from '../theme';

const HomeTileContainer = styled.div`
  flex: 1;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 5px;
  
  @media screen and (max-width: ${theme.breakpoints.values.xl}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  
  @media screen and (max-width: ${theme.breakpoints.values.lg}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    grid-template-columns: 1fr;
  }
`;

export default HomeTileContainer;
