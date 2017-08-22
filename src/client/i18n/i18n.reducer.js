import { TRANSLATIONS_LOADED } from '../actions';

const initialState = {
  translations: undefined,
  language: 'de-CH',
  locale: 'de',
};

export default function i18n(state = initialState, { type, translations }) {
  switch (type) {
    case TRANSLATIONS_LOADED:
      return Object.assign({}, state, { translations });
    default:
      return state;
  }
}
