import React from 'react';
import { Text, View, Image, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ApiKeys from '../../utils/ApiKeys';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Card = ({ data, currentIndex, swipeLeft, swipeRight, position }) => {
  const handleSwipeLeft = () => {
    position.setValue({ x: 0, y: 0 });
    swipeLeft();
  };

  const handleSwipeRight = () => {
    data.results.map((item, i) => {
      if (i == currentIndex) {
        swipeRight(item.original_title, item.id);
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
    Animated.timing(position, {
      duration: 300,
      toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
      useNativeDriver: true,
    }).start(handleSwipeLeft);
  };

  const swipeRightAnimation = (gestureState) => {
    Animated.timing(position, {
      duration: 300,
      toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
      useNativeDriver: true,
    }).start(handleSwipeRight);
  };

  const frontInterpolate = position.x.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = position.x.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateX: backInterpolate }],
  };

  const flipCardAnimation = () => {
    if (value >= 90) {
      console.log('> 90');
      Animated.spring(position, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      console.log('< 90');
      Animated.spring(position, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
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

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        swipeRightAnimation(gestureState);
        console.log(gestureState.dx, gestureState.dy);
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
    onPanResponderGrant: (evt, gestureState) => {
      console.log(gestureState);
      // if (gestureState.x0 > 315) {
      //   flipCardAnimation();
      //   console.log('right part');
      // } else if (gestureState.x0 < 80) {
      //   flipCardAnimation();
      //   console.log('left');
      // }

      // https://codedaily.io/tutorials/Create-a-Flip-Card-Animation-with-React-Native

      // https://morioh.com/p/afefc76830e6 maybe use this component
    },
  });

  let renderCards = () => {
    if (data != undefined && data.results != undefined) {
      return data.results
        .map((item, cardIndex) => {
          if (cardIndex < currentIndex) {
            return null;
          } else if (cardIndex == currentIndex) {
            return (
              <View key={item.id}>
                <Animated.View
                  {...panResponder.panHandlers}
                  style={[
                    rotateAndTranslate,
                    {
                      height: SCREEN_HEIGHT - 220,
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
                    {/* <Text
                      style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        color: 'white',
                        fontSize: 32,
                        fontWeight: 'normal',
                        padding: 10,
                      }}>
                      {item.original_title}
                    </Text> */}
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
                        fontSize: 50,
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
                        fontSize: 50,
                        fontWeight: '800',
                        padding: 10,
                      }}>
                      NOPE
                    </Text>
                  </Animated.View>
                  <Image
                    style={{
                      flex: 1,
                      height: 'auto',
                      width: '100%',
                      resizeMode: 'cover',
                      borderRadius: 20,
                    }}
                    source={{
                      uri:
                        ApiKeys.MovieDBConfig.BASE_IMAGE_URL +
                        '/' +
                        ApiKeys.MovieDBConfig.IMAGE_SIZE_0 +
                        item.poster_path,
                    }}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.gradient}></LinearGradient>
                </Animated.View>

                <Animated.View {...panResponder.panHandlers} style={[backAnimatedStyle]}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: 'cover',
                      borderRadius: 20,
                    }}
                    source={{
                      uri:
                        ApiKeys.MovieDBConfig.BASE_IMAGE_URL +
                        '/' +
                        ApiKeys.MovieDBConfig.IMAGE_SIZE_0 +
                        item.poster_path,
                    }}
                  />
                </Animated.View>
              </View>
            );
          } else if (cardIndex === currentIndex + 1) {
            return (
              <Animated.View
                key={item.id}
                style={[
                  {
                    opacity: nextCardOpacity,
                    transform: [{ scale: nextCardScale }],
                    height: SCREEN_HEIGHT - 220,
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
                  {/* <Text
                    style={{
                      color: 'white',
                      fontSize: 32,
                      fontWeight: 'normal',
                      padding: 10,
                    }}>
                    {item.original_title}
                  </Text> */}
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
                      fontSize: 50,
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
                      fontSize: 50,
                      fontWeight: '800',
                      padding: 10,
                    }}>
                    NOPE
                  </Text>
                </Animated.View>

                <Image
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: 'cover',
                    borderRadius: 20,
                  }}
                  source={{
                    uri:
                      ApiKeys.MovieDBConfig.BASE_IMAGE_URL +
                      '/' +
                      ApiKeys.MovieDBConfig.IMAGE_SIZE_0 +
                      item.poster_path,
                  }}
                />

                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={styles.gradient}></LinearGradient>
              </Animated.View>
            );
          }
        })
        .reverse();
    }
  };

  return <View>{renderCards()}</View>;
};

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

export default Card;
