import Xhr from '../xhr';

export default {
  loadTranslations(locale) {
    const translationsPromise = Xhr.get(`/assets/translations/${locale}.json`);
    const flattenedTranslations = {};

    const flattenTranslations = (translationsObject, previousKey) => (key) => {
      const concatenatedKey = previousKey ? `${previousKey}.${key}` : key;
      const value = translationsObject[key];

      if (typeof value === 'object') {
        Object.getOwnPropertyNames(value)
          .forEach(flattenTranslations(value, concatenatedKey));
      } else {
        flattenedTranslations[concatenatedKey] = value;
      }
    };

    return translationsPromise.then((translationsObject) => {
      Object.getOwnPropertyNames(translationsObject)
        .forEach(flattenTranslations(translationsObject));

      return flattenedTranslations;
    });
  },
};
