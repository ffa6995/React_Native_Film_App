import { SWIPE_RIGHT, SWIPE_LEFT, CHANGE_GENRES_PAGE } from './actionTypes';

export const swipeRight = (name, id, poster_path) => ({
	type: SWIPE_RIGHT,
	payload: {
		id,
		name,
		poster_path
	}
});

export const swipeLeft = (name, id) => ({
	type: SWIPE_LEFT,
	payload: {
		id,
		name
	}
});

export const changeGenresPage = id => ({
	type: CHANGE_GENRES_PAGE,
	payload: {
		id
	}
});
