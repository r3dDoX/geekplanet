import Xhr from '../../xhr';

export default {
  loadTags() {
    return Xhr.get('/api/tags');
  },
  saveTag(data) {
    return Xhr.put('/api/tags', data);
  },
};
