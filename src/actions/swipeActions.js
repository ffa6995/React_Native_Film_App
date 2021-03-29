import { SWIPE_RIGHT, SWIPE_LEFT } from './actionTypes';

export const swipeRight = (name, id) => ({
  type: SWIPE_RIGHT,
  payload: {
    currentIndex: 0,
    id: id,
    name: name,
  },
});

export const swipeLeft = () => ({
  type: SWIPE_LEFT,
  payload: {
    currentIndex: 0,
  },
});
