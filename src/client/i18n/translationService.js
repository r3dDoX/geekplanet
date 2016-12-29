import Xhr from '../xhr';

export default {
  loadTranslations(locale) {
    return Xhr.get(`/assets/translations/${locale}.json`);
  },
};
