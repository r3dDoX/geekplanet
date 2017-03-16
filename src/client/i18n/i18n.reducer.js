import ActionTypes from '../actionTypes';

const initialState = {
  translations: undefined,
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
