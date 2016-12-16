import Xhr from '../xhr';

export default {
  loadProducers() {
    return Xhr.get('/api/producers');
  },
  saveProducer(data) {
    return Xhr.post('/api/producers', data);
  },
};
