import ActionTypes from '../actionTypes';

const initialState = {
  translations: undefined,
  language: 'de-CH',
  locale: 'de',
};

export default function i18n(state = initialState, { type, data }) {
  switch (type) {
    case ActionTypes.TRANSLATIONS_LOADED:
      return Object.assign({}, state, {
        translations: data,
      });
    default:
      return state;
  }
}
