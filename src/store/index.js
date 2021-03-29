import { createStore } from 'redux';
import { rootReducer } from '../reducers';

/**
 * Store holds our state
 */
export default store = createStore(rootReducer);
