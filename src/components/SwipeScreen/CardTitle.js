import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import ApiKeys from '../../utils/ApiKeys';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const CardTitle = ({ title, providers }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <>
        {providers.results ? (
          <>
            {providers.results.AT && providers.results.AT.flatrate ? (
              <View>
                <Image
                  source={{
                    uri:
                      ApiKeys.MovieDBConfig.BASE_IMAGE_URL +
                      ApiKeys.MovieDBConfig.IMAGE_SIZE_0 +
                      providers.results.AT.flatrate[0].logo_path,
                  }}
                  style={styles.image}></Image>
              </View>
            ) : (
              <Text>No providers in Austria.</Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>loading...</Text>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 15,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CardTitle;
