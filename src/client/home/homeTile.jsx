import { grey300, grey800 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPictureUrl } from '../products/productService';
import { HomeTilePropType } from '../propTypes';

const TileTitle = styled.h1`
  margin: 0;
  padding: 8px;
  font-size: 1.2em;
  font-weight: 400;
  background-color: ${grey300};
  box-shadow: inset 0 2px 5px -3px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 5px 5px;
  text-align: center;
`;

const Tile = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 280px;
  max-width: 400px;
  margin: 5px;
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  color: ${grey800};
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    transition: background-color .45s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }
  
  &:hover {
    &::before {
      background-color: rgba(255, 255, 255, 0.3);
    }
    
    img {
      transform: scale(0.96);
    }
  }
`;

const TileImage = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
  transition: transform 2s cubic-bezier(0.23, 1, 0.32, 1);
`;

const HomeTile = ({
  tile,
  onClick,
  link,
  id,
}) => (
  <Tile
    itemScope
    itemType="http://schema.org/Thing"
    to={link}
    onClick={onClick}
    data-id={id}
  >
    <meta itemProp="url" content={link} />
    <TileImage
      itemProp="image"
      content={tile.picture ? getPictureUrl(tile.picture) : '/assets/images/notFound.jpg'}
      src={tile.picture ? getPictureUrl(tile.picture) : '/assets/images/notFound.jpg'}
      alt="Product Category"
    />
    <TileTitle itemProp="name">
      {tile.de.name}
    </TileTitle>
  </Tile>
);

HomeTile.defaultProps = {
  onClick: undefined,
  id: undefined,
};

HomeTile.propTypes = {
  tile: HomeTilePropType.isRequired,
  onClick: PropTypes.func,
  link: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default HomeTile;
