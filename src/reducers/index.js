import { combineReducers } from 'redux';
import watchlist from './watchlist';
import todos from './todos';

/**
 * Reducer receives the action and modifies the state to give us a new state
 */

export const rootReducer = combineReducers({
  todos,
  watchlist,
});
