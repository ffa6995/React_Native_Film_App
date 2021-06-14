import React, { useEffect, useState } from 'react';
import { View, Dimensions, Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { swipeLeft, swipeRight } from '../../actions/swipeActions';
import ActionFooter from './ActionFooter';
import ApiCaller from '../ApiCaller';
import Card from './Card';
import CardTitle from './CardTitle';
import Header from '../Header';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeScreen = ({ watchlist, swipeLeft, swipeRight }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentItem, setCurrentItem] = React.useState('');
  const [providers, setProviders] = React.useState('');
  const [data, setData] = useState([]);
  const [recommendationsId, setRecommendationsId] = useState(getRandomIDFromWatchlist());
  const apiCaller = new ApiCaller();

  let position = new Animated.ValueXY();
  let animatedValue = new Animated.Value(0);
  let value = 0;

  useEffect(() => {
    fetchCardData(recommendationsId);
  }, []);

  async function fetchCardData(id) {
    const resp = await apiCaller.fetchRecommendedMovies(id);

    setData(resp);
    setCurrentItem(resp.results[currentIndex]);
  }

  useEffect(() => {
    if (data != undefined && data.results != undefined) {
      console.log('curr index:' + currentIndex);
      // if (currentIndex == 5) {
      //   setCurrentIndex(0);
      //   fetchCardData(getRandomIDFromWatchlist());
      // }
      setCurrentItem(data.results[currentIndex]);
      async function fetchProviders() {
        setProviders(await apiCaller.fetchProviders('movie', currentItem.id));
      }
      fetchProviders();
    }
  }, [currentIndex, currentItem, data]);

  animatedValue.addListener(({ newValue }) => {
    value = newValue;
  });

  function getRandomIDFromWatchlist() {
    return watchlist.length > 0
      ? watchlist[Math.floor(Math.random() * watchlist.length)].id.toString()
      : '671';
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
      <View style={{ height: 70 }}>{<Header></Header>}</View>
      <View style={{ height: 60 }}>
        <CardTitle title={currentItem.original_title} providers={providers}></CardTitle>
      </View>
      {/* <View style={{ height: 30 }} /> */}
      <View>
        <Card
          data={data}
          position={position}
          currentIndex={currentIndex}
          swipeLeft={handleSwipeLeft}
          swipeRight={handleSwipeRight}></Card>
      </View>
      <ActionFooter handleChoice={handleChoice} />
    </View>
  );
};

//https://www.youtube.com/watch?v=StUrT_lJZQE

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
