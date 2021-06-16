import { SWIPE_LEFT, SWIPE_RIGHT } from '../actions/actionTypes';

const initialState = {
  watchlist: [
    // { id: '585', name: 'Monsters, Inc' },
    // { id: '557', name: 'Spider-Man' },
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
        watchlist: [...state.watchlist, { id, name }],
      };
    }
    case SWIPE_LEFT: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
