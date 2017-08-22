module.exports = {
  transformTranslations(translations) {
    const flattenedTranslations = {};

    const flattenTranslations = (translationsObject, previousKey) => (key) => {
      const concatenatedKey = previousKey ? `${previousKey}.${key}` : key;
      const value = translationsObject[key];

      if (typeof value === 'object') {
        Object
          .getOwnPropertyNames(value)
          .forEach(flattenTranslations(value, concatenatedKey));
      } else {
        flattenedTranslations[concatenatedKey] = value;
      }
    };

    Object
      .getOwnPropertyNames(translations)
      .forEach(flattenTranslations(translations));

    return flattenedTranslations;
  },
};
