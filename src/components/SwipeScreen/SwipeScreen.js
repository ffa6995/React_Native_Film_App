import React from 'react';
import { Text, View, Dimensions, Image, Animated, PanResponder, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import Header from '../Header';
import { swipeLeft, swipeRight } from '../../actions/swipeActions';
import { Pictures } from './pictures.js';
import Footer from './Footer';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeScreen = ({ watchlist, currentIndex, swipeLeft, swipeRight }) => {
  const [media, setMedia] = React.useState('');
  const [id, setId] = React.useState('');

  let position = new Animated.ValueXY();

  const handleSwipeLeft = () => {
    swipeLeft(), setMedia('');
  };

  const handleSwipeRight = () => {
    Pictures.map((item, i) => {
      if (i == currentIndex) {
        swipeRight(item.name, item.id), setMedia(''), setId('');
      }
    });
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  const cardDescriptionOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 1, 1],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const swipeLeftAnimation = (gestureState) => {
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
      useNativeDriver: true,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
    });
    handleSwipeLeft();
  };

  const swipeRightAnimation = (gestureState) => {
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
      useNativeDriver: true,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
    });
    handleSwipeRight();
  };

  const handleChoice = (direction) => {
    if (direction < 0) {
      Animated.spring(position, {
        toValue: { x: -SCREEN_WIDTH - 100, y: -100 },
        useNativeDriver: true,
      }).start(() => {
        position.setValue({ x: 0, y: 0 });
      });
      handleSwipeLeft();
    } else if (direction > 0) {
      Animated.spring(position, {
        toValue: { x: SCREEN_WIDTH + 100, y: -100 },
        useNativeDriver: true,
      }).start(() => {
        position.setValue({ x: 0, y: 0 });
      });
      handleSwipeRight();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        swipeRightAnimation(gestureState);
      } else if (gestureState.dx < -120) {
        swipeLeftAnimation(gestureState);
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  let renderPictures = () => {
    return Pictures.map((item, i) => {
      if (i < currentIndex) {
        return null;
      } else if (i == currentIndex) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={item.id}
            style={[
              rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
              },
            ]}>
            <Animated.View
              style={{
                opacity: cardDescriptionOpacity,
                position: 'absolute',
                bottom: 30,
                left: 30,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  color: 'white',
                  fontSize: 32,
                  fontWeight: 'normal',
                  padding: 10,
                }}>
                {item.name}
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: likeOpacity,
                transform: [{ rotate: '-30deg' }],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: dislikeOpacity,
                transform: [{ rotate: '30deg' }],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.9)']}
              style={styles.gradient}></LinearGradient>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              {
                opacity: nextCardOpacity,
                transform: [{ scale: nextCardScale }],
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              },
            ]}>
            <Animated.View
              style={{
                opacity: cardDescriptionOpacity,
                position: 'absolute',
                bottom: 30,
                left: 30,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                  fontWeight: 'normal',
                  padding: 10,
                }}>
                {item.name}
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: '-30deg' }],
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: '30deg' }],
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 1000,
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 32,
                  fontWeight: '800',
                  padding: 10,
                }}>
                NOPE
              </Text>
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={item.uri}
            />

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.9)']}
              style={styles.gradient}></LinearGradient>
          </Animated.View>
        );
      }
    }).reverse();
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 30 }}>
        <Header></Header>
      </View>
      {/* <View style={{ height: 30 }} /> */}
      <View style={{ flex: 1, marginBottom: 10 }}>{renderPictures()}</View>
      <Footer handleChoice={handleChoice} />
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
});

const mapStateToProps = (state) => {
  return {
    watchlist: state.watchlist.watchlist,
    currentIndex: state.watchlist.currentIndex,
  };
};

const mapDispatchToProps = { swipeRight, swipeLeft };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
