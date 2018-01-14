import Checkbox from 'material-ui/Checkbox';
import { grey100 } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ProducerPropType } from '../../propTypes';

const ProducerRow = styled.div`
  padding: 10px 10px 10px 50px;
  border-top: 1px solid #FFF;
  background-color: ${grey100};
`;

const Producers = ({
  producers,
  producersToFilter,
  toggleProducer,
}) => (
  <div>
    {producers.map(producer => (
      <ProducerRow key={producer._id}>
        <Checkbox
          label={producer.name}
          checked={!!producersToFilter.find(
            producerToFilter => producer._id === producerToFilter._id
          )}
          onCheck={(event, checked) => toggleProducer(producer, checked)}
        />
      </ProducerRow>
    ))}
  </div>
);

Producers.propTypes = {
  producers: PropTypes.arrayOf(ProducerPropType).isRequired,
  producersToFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleProducer: PropTypes.func.isRequired,
};

export default Producers;
