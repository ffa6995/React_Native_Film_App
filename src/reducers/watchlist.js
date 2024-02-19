import { CHANGE_GENRES_PAGE, SWIPE_LEFT, SWIPE_RIGHT } from '../actions/actionTypes';

const initialState = {
	watchlist: [],
	dislikeList: [],
	favoriteGenres: [
		{
			id: 28,
			name: 'Action',
			page: 1
		},
		{
			id: 14,
			name: 'Fantasy',
			page: 1
		},
		{
			id: 878,
			name: 'Sciene Fiction',
			page: 1
		}
	]
};

export default function(state = initialState, action) {
	function checkIfInWatchlist(id) {
    let inList = false;
		state.watchlist.map((item) => {
      console.log("item id: "+item.id);
      console.log("id: " +id);
			if (item.id === id) {
        inList = true;
			}
		});
    return inList;
	}

	function checkIfInDislikeList(id) {
    let inList = false;
		state.dislikeList.map((item) => {
			if (item.id === id) {
				inList = true;
			}
		});
    return inList;
	}
	switch (action.type) {
		case SWIPE_RIGHT: {
			const { id, name, poster_path } = action.payload;
      console.log(id + " " + name);
			if (!checkIfInWatchlist(id)) {
        console.log("adding...");
				return {
					...state,
					watchlist: [...state.watchlist, { id, name, poster_path }]
				};
			} else {
        console.log("not adding...");
				return {
					...state
				};
			}
		}
		case SWIPE_LEFT: {
			const { id, name } = action.payload;
			if (!checkIfInDislikeList(id)) {
				return {
					...state,
					dislikeList: [...state.dislikeList, { id, name }]
				};
			} else {
				return {
					...state
				};
			}
		}
		case CHANGE_GENRES_PAGE: {
			const { id } = action.payload;
			state.favoriteGenres.map((item) => {
				if (item.id === id) {
					return item.page += 1;
				}
			});
			return {
				...state
			};
		}
		default:
			return state;
	}
}
