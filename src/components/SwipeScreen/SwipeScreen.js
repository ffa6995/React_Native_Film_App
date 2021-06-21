import React, { useEffect, useState } from 'react';
import { View, Dimensions, Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { swipeLeft, swipeRight } from '../../actions/swipeActions';
import ActionFooter from './ActionFooter';
import ApiCaller from '../ApiCaller';
import Card from './Card';
import CardTitle from './CardTitle';
import Header from '../Header';
import { Text } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeScreen = ({ watchlist, swipeLeft, swipeRight }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentItem, setCurrentItem] = React.useState('');
  const [providers, setProviders] = React.useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendationsId, setRecommendationsId] = useState(getRandomIDFromWatchlist());
  const apiCaller = new ApiCaller();

  let position = new Animated.ValueXY();
  let animatedValue = new Animated.Value(0);
  let value = 0;

  useEffect(() => {
    fetchCardData(recommendationsId);
  }, []);

  async function fetchCardData(id) {
    setLoading(true);
    let resp = await apiCaller.fetchRecommendedMovies(id);
    // TODO: fetch also from other genres and concat them
    // TODO: also filter on things in a dislike list
    // filter on movies that are already in watchlist and randomize the order
    resp.results = resp.results
      .filter((item) => {
        return !movieExistsInWatchlist(item.id);
      })
      .map((item) => {
        return item;
      });
    resp.results.sort(() => Math.random() - 0.5);
    setData(resp);
    setCurrentIndex(0);
    setCurrentItem(resp.results[0]);
    setLoading(false);
  }

  async function fetchProviders() {
    setProviders(await apiCaller.fetchProviders('movie', currentItem.id));
  }

  useEffect(() => {
    if (currentItem == undefined) {
      fetchCardData(getRandomIDFromWatchlist());
    }
  }, [currentItem]);

  useEffect(() => {
    if (data != undefined && data.results != undefined && currentItem) {
      setCurrentItem(data.results[currentIndex]);
      fetchProviders();
    }
  }, [currentIndex, currentItem]);

  animatedValue.addListener(({ newValue }) => {
    value = newValue;
  });

  function getRandomIDFromWatchlist() {
    return watchlist.length > 0
      ? watchlist[Math.floor(Math.random() * watchlist.length)].id.toString()
      : '671';
  }

  function movieExistsInWatchlist(id) {
    return watchlist.some((el) => {
      return el.id === id;
    });
  }

  const handleSwipeLeft = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
    swipeLeft();
  };

  const handleSwipeRight = () => {
    setCurrentIndex(currentIndex + 1);
    swipeRight(currentItem.original_title, currentItem.id);
  };

  const handleChoice = (direction) => {
    if (direction < 0) {
      Animated.timing(position, {
        duration: 500,
        toValue: { x: -SCREEN_WIDTH - 100, y: -100 },
        useNativeDriver: true,
      }).start(handleSwipeLeft);
    } else if (direction > 0) {
      Animated.timing(position, {
        duration: 500,
        toValue: { x: direction * SCREEN_WIDTH + 0.5 * SCREEN_WIDTH, y: -100 },
        useNativeDriver: true,
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
                <CardTitle title={currentItem.original_title} providers={providers}></CardTitle>
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
              swipeRight={handleSwipeRight}></Card>
          </View>
          <ActionFooter handleChoice={handleChoice} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

//https://www.youtube.com/watch?v=StUrT_lJZQE

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
  },

  gradient: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    right: 10,
    height: 100,
    borderRadius: 20,
  },

  flipCard: {},

  flipCardBack: {},
});

const mapStateToProps = (state) => {
  return {
    watchlist: state.watchlist.watchlist,
  };
};

const mapDispatchToProps = { swipeRight, swipeLeft };

export default connect(mapStateToProps, mapDispatchToProps)(SwipeScreen);
