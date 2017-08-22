const underTest = require('./translationService');

describe('transformTranslations', () => {
  it('should map first level keys as is', () => {
    const translations = {
      TEST: 'someTranslation',
      TEST2: 'someOtherTranslation',
    };

    const result = underTest.transformTranslations(translations);

    expect(result.TEST).toBe('someTranslation');
    expect(result.TEST2).toBe('someOtherTranslation');
  });

  it('should flatten deeper keys to one level concatenating keys with "."', () => {
    const translations = {
      TEST: {
        TRANSLATION: 'someTranslations',
        DEEP: {
          TRANSLATION2: 'someOtherTranslations',
        },
      },
    };

    const result = underTest.transformTranslations(translations);

    expect(result['TEST.TRANSLATION']).toBe('someTranslations');
    expect(result['TEST.DEEP.TRANSLATION2']).toBe('someOtherTranslations');
  });
});
