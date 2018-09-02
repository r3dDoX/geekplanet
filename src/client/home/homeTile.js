import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import styled from 'styled-components';
import { getPictureUrl } from '../products/productService';
import { HomeTilePropType } from '../propTypes';
import theme, { brandPrimary } from '../theme';

const HomeTile = ({
  tile,
}) => {
  const SpecificTile = tile.picture
    ? Tile
    : AccentTile;

  return (
    <SpecificTile
      key={tile._id}
      rows={tile.rows || 1}
      cols={tile.cols || 1}
    >
      {tile.picture && (
        <StyledCardMedia
          image={tile.picture ? getPictureUrl(tile.picture) : '/assets/images/notFound.jpg'}
          title={tile.de.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {tile.de.title}
        </Typography>
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: tile.de.text }}
        />
      </CardContent>
    </SpecificTile>
  );
};

HomeTile.propTypes = {
  tile: HomeTilePropType.isRequired,
};

const StyledCardMedia = styled(CardMedia)`
  &::before {
    content: "";
    display: block;
    padding-bottom: 50%;
  }
`;

const Tile = styled(Card)
  .attrs({
    square: true,
  })`
  @media screen and (min-width: ${theme.breakpoints.values.sm + 1}px) {
    ${props => props.rows && `grid-row: ${props.rows} span;`}
    ${props => props.cols && `grid-column: ${props.cols} span;`}
  }
`;

const AccentTile = styled(Tile)`
  background-color: ${brandPrimary} !important;
  
  * {
    color: white !important;
  }
`;

export default HomeTile;
