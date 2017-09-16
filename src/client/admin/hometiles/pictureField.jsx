import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { getPictureUrl } from '../../products/productService';
import { brandPrimary } from '../../theme';

const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding-bottom: 1px;
`;

const ProductPicture = styled.img`
  flex: 0 0 200px;
  width: 200px;
  cursor: pointer;
`;

const PictureField = ({
  input: {
    onChange,
    value,
  },
  label,
  pictures,
}) => (
  <div>
    <h4>{label}</h4>
    <PictureContainer>
      {pictures.map(picture => (
        <ProductPicture
          key={picture}
          alt="Category Product"
          src={getPictureUrl(picture)}
          onClick={() => onChange(picture)}
          style={value === picture ? { border: `1px solid ${brandPrimary}` } : null}
        />
      ))}
    </PictureContainer>
  </div>
);

PictureField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PictureField;

