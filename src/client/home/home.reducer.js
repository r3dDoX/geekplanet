import { HOME_TILES_LOADED, YOUTUBE_FEED_LOADED } from '../actions';

const initialState = {
  tiles: [],
  youTubeFeed: [],
};

export default (state = initialState, { type, tiles, youTubeFeed }) => {
  switch (type) {
    case HOME_TILES_LOADED:
      return {
        ...state,
        tiles,
      };
    case YOUTUBE_FEED_LOADED:
      return {
        ...state,
        youTubeFeed,
      };
    default:
      return state;
  }
};
