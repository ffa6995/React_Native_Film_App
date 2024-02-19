/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
	View, Dimensions, Animated, StyleSheet, Text
} from 'react-native';
import { connect } from 'react-redux';
import { swipeLeft, swipeRight, changeGenresPage } from '../../actions/swipeActions';
import ActionFooter from './ActionFooter';
import ApiCaller from '../ApiCaller';
import Card from './Card';
import CardTitle from './CardTitle';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * The main Screen of the application which includes the card recommendations.
 */
const SwipeScreen = ({
	watchlist,
  dislikeList,
	favoriteGenres,
  swipeLeft,
  swipeRight,
  changeGenresPage
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState('');
  const [providers, setProviders] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendationsId, setRecommendationsId] = useState(getRandomIDFromWatchlist());
  const apiCaller = new ApiCaller();

  const position = new Animated.ValueXY();

  useEffect(() => {
    fetchCardData(recommendationsId);
  }, []);

  /**
   * Fetch new recommendations if currentItem is undefined.
   */
  useEffect(() => {
    if (currentItem === undefined) {
      fetchCardData(getRandomIDFromWatchlist());
    }
  }, [currentItem]);

  /**
   * Set the current item and the provider, when item is changing.
   */
  useEffect(() => {
    if (data !== undefined && data.results !== undefined && currentItem) {
      setCurrentItem(data.results[currentIndex]);
      fetchProviders();
    }
  }, [currentIndex, currentItem]);

  /**
   * Fetch recommendations from the api and filter the result.
   * @param {number} id
   */
  async function fetchCardData(id) {
    setLoading(true);
    const randGenres = getRandomIDFromFavoriteGenres();
    const resp = await apiCaller.fetchRecommendedMovies(id);
    const resp2 = await apiCaller.fetchMoviesByGenres(randGenres, getFavGenresPage(randGenres));
    changeGenresPage(randGenres);
    resp.results = [...resp.results, ...resp2.results];
    if (watchlist.length > 0) {
      const randId = getRandomIDFromWatchlist();
      if (randId !== id) {
        const resp3 = await apiCaller.fetchRecommendedMovies(randId);
        resp.results = [...resp.results, ...resp3.results];
      }
    }

    resp.results = resp.results
      .filter(item => !movieExistsInWatchlist(item.id));
    resp.results = resp.results
      .filter(item => !movieExistsInDislikeList(item.id));
    resp.results = resp.results.sort(() => Math.random() - 0.5);
    setData(resp);
    setCurrentIndex(0);
    setCurrentItem(resp.results[0]);
    setLoading(false);
  }

  /**
   * Fetch the provider of the current item.
   */
  async function fetchProviders() {
    setProviders(await apiCaller.fetchProviders('movie', currentItem.id));
  }

  /**
   * Selects a random id from the watchlist.
   * @returns random Id
   */
  function getRandomIDFromWatchlist() {
    return watchlist.length > 0
      ? watchlist[Math.floor(Math.random() * watchlist.length)].id.toString()
      : '671';
  }

  /**
   * Selects a random id from favorite genres list.
   * @returns random Id
   */
  function getRandomIDFromFavoriteGenres() {
    const rand = Math.floor(Math.random() * favoriteGenres.length);
    return favoriteGenres.length > 0 ? favoriteGenres[rand].id : '28';
  }

  /**
   * Get page of favorite Genres for the next API call.
   * @param {number} genresID
   */
  function getFavGenresPage(genresID) {
    favoriteGenres.map((genres) => {
      if (genres.id === genresID) {
        return genres.page;
      } else {
        return 1;
      }
    });
  }

  /**
   * Checks if a specific movie exists in the watchlist.
   * @param {number} id
   * @returns
   */
  function movieExistsInWatchlist(id) {
    return watchlist.some(el => el.id === id);
  }

  function movieExistsInDislikeList(id) {
    return dislikeList.some(el => el.id === id);
  }

  const handleSwipeLeft = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
    swipeLeft(currentItem.title, currentItem.id);
  };

  const handleSwipeRight = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
    swipeRight(currentItem.title, currentItem.id, currentItem.poster_path);
  };

  const handleChoice = (direction) => {
    if (direction < 0) {
      Animated.timing(position, {
        duration: 500,
        toValue: { x: -SCREEN_WIDTH - 100, y: -100 },
        useNativeDriver: true
      }).start(handleSwipeLeft);
    } else if (direction > 0) {
      Animated.timing(position, {
        duration: 500,
        toValue: { x: direction * SCREEN_WIDTH + 0.5 * SCREEN_WIDTH, y: -100 },
        useNativeDriver: true
      }).start(handleSwipeRight);
    }
  };

  return (
	<View style={styles.container}>
		{!loading ? (
			<>
				<View style={{ height: 60 }}>
					{currentItem ? (
						<>
							<CardTitle title={currentItem.title} providers={providers} />
						</>
            ) : (
	<Text>Loading...</Text>
            )}
				</View>

				<View>
					<Card
						data={data}
						position={position}
						currentIndex={currentIndex}
						swipeLeft={handleSwipeLeft}
						swipeRight={handleSwipeRight}
					/>
				</View>
				<ActionFooter handleChoice={handleChoice} />
			</>
      ) : (
	<Text>Loading...</Text>
      )}
	</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: '#1A1A1A',
  }
});

const mapStateToProps = state => ({
    watchlist: state.watchlist.watchlist,
    dislikeList: state.watchlist.dislikeList,
    favoriteGenres: state.watchlist.favoriteGenres
  });

const mapDispatchToProps = { swipeRight, swipeLeft, changeGenresPage };

export default connect(mapStateToProps, mapDispatchToProps)(SwipeScreen);
