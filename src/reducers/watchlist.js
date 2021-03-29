import { SWIPE_LEFT, SWIPE_RIGHT } from '../actions/actionTypes';

const initialState = {
  currentIndex: 0,
  watchlist: [
    { id: '55', name: 'test' },
    { id: '66', name: '1234' },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWIPE_RIGHT: {
      console.log(action);
      const { id, name } = action.payload;
      console.log(state.watchlist);
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        watchlist: [...state.watchlist, { id, name }],
      };
    }
    case SWIPE_LEFT: {
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    }
    default:
      return state;
  }
}
