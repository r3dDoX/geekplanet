import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import theme, { brandPrimary } from '../theme';
import YouTubeFeed from './youTubeFeed';

const Home = ({ intl }) => (
  <Container>
    <Helmet>
      <title>
        geekplanet - Tabletop Miniatures
      </title>
      <meta
        name="Description"
        content={intl.formatMessage({ id: 'HOME.DESCRIPTION' })}
      />
    </Helmet>
    <TileContainer>
      <Tile>
        <StyledCardMedia
          image="/api/products/pictures/BynXLvKgM_m"
          title="My Stupid Fucking Tile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Small Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Tile>
      <Tile rows="span 2" cols="span 2">
        <StyledCardMedia
          image="/api/products/pictures/S1itrtLBSoZ_m"
          title="My Stupid Fucking Tile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            BIG NEWS!
          </Typography>
          <Typography component="p">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est Lorem ipsum dolor sit amet.
          </Typography>
        </CardContent>
      </Tile>
      <AccentTile>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Accent Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </AccentTile>
      <AccentTile>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Accent Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </AccentTile>
      <Tile>
        <StyledCardMedia
          image="/api/products/pictures/By4TWrFLBSob_m"
          title="My Stupid Fucking Tile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Small Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Tile>
      <Tile>
        <StyledCardMedia
          image="/api/products/pictures/S1YtgSYUBrjW_m"
          title="My Stupid Fucking Tile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Small Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Tile>
      <Tile>
        <StyledCardMedia
          image="/api/products/pictures/BypBIPYxG_m"
          title="My Stupid Fucking Tile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Small Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Tile>
      <AccentTile>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Accent Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </AccentTile>
      <Tile>
        <StyledCardMedia
          image="/api/products/pictures/BynXLvKgM_m"
          title="My Stupid Fucking Tile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Small Tile
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Tile>
    </TileContainer>
    <YouTubeFeed />
  </Container>
);

Home.propTypes = {
  intl: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const Container = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
`;

const TileContainer = styled.div`
  flex: 1;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  
  @media screen and (max-width: ${theme.breakpoints.values.lg}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (max-width: ${theme.breakpoints.values.sm}px) {
    grid-template-columns: 1fr;
  }
`;

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
    ${props => props.rows && `grid-row: ${props.rows};`}
    ${props => props.cols && `grid-column: ${props.cols};`}
  }
`;

const AccentTile = styled(Tile)`
  background-color: ${brandPrimary} !important;
  
  * {
    color: white !important;
  }
`;

export default injectIntl(Home);
