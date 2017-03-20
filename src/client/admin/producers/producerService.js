import Xhr from '../../xhr';

export default {
  loadProducers() {
    return Xhr.get('/api/producers');
  },
  saveProducer(data) {
    return Xhr.put('/api/producers', data, 'application/json');
  },
};
