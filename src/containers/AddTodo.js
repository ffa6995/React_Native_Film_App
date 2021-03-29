import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { addTodo, deleteTodo } from '../actions/todoActions';

import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

const AddTodo = ({ todo_list, addTodo, deleteTodo }) => {
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task), setTask('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <View style={StyleSheet.container}>
      <Card>
        <Card.Content>
          <Title>TODO APP</Title>
          <Text style={StyleSheet.paragraph}>Todo App with React Native and Redux</Text>
        </Card.Content>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add Todo Here</Title>

          <TextInput
            mode="outlined"
            label="Task"
            value={task}
            onChangeText={(task) => setTask(task)}
          />
          <Spacer />
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <Card>
                <Card.Title
                  title={`Task#${item.id}`}
                  left={(props) => <Icon name="tasks" size={24} color="black" />}
                  right={(props) => (
                    <ButtonIcon
                      iconName="close"
                      color="red"
                      onPress={() => handleDeleteTodo(item.id)}
                    />
                  )}
                />
                <Card.Content>
                  <Paragraph>{item.task}</Paragraph>
                </Card.Content>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = { addTodo, deleteTodo };

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
