import React from 'react';
import { View, FlatList } from 'react-native';
import { Title, Paragraph, Card } from 'react-native-paper';
import { swipeRight } from '../actions/swipeActions';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Spacer from '../components/Spacer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Watchlist = ({ watchlist, addToWatchlist }) => {
  const [name, setMedia] = React.useState('');

  const handleAddToWatchlist = () => {
    addToWatchlist(name), setMedia('');
  };

  return (
    <View>
      <Spacer />
      <Title>My Watchlist</Title>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <Card>
                <TouchableOpacity>
                  <Card.Title
                    title={`Film#${item.id}`}
                    left={(props) => <Icon name="film" size={24} color="black" />}
                  />
                  <Card.Content>
                    <Paragraph>{item.name}</Paragraph>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    watchlist: state.watchlist.watchlist,
  };
};

const mapDispatchToProps = { addToWatchlist: swipeRight };

export default connect(mapStateToProps)(Watchlist);
