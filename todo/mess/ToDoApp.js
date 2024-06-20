import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TodoList from './TodoList.js';
import { connect } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { ref } from "firebase/database" 

import { db } from "./firebase.js" 

//

function mapDispatchToProps(dispatch) {
  return {
    deleteTodo: itemkey => {
      dispatch( (dispatch, getState) => {
        dispatch({ type: 'DELETE_TODO', payload: { key: itemkey } });
        ref(db, 'users/'+ getState().uid)
          .set(getState());
      })
    },
    setChecked: itemkey => {
      dispatch( (dispatch, getState) => {

        dispatch({ type: 'TOGGLE_CHECKED', payload: { key: itemkey } });
        ref(db, 'users/'+getState().uid)
          .set(getState());
      })
    },
    setTodos: todo => {
      dispatch((dispatch, getState) => {

        dispatch({ type: 'ADD_TODO', payload: { add: todo } });
    ref( db, 'users/'+getState().uid)
          .set(getState());
      })
    },
  };
}

function mapStateToProps(state) {
  return {
    todoList: state.todos,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);


function ToDoApp(props) {
  const [value, setValue] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="What do you want to do today?"
          placeholderTextColor="#abbabb"
          value={value}
          onChangeText={_value => setValue(_value)}
        />
        <TouchableOpacity
          onPress={() => {
            if (value.length > 0) {
              console.log("setTodos called")
              props.setTodos({ text: value, key: Date.now(), checked: false });
              setValue('');
            }
          }}>
          <Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
      {console.log(props.todoList)}
        {props.todoList.map(item => (
          <TodoList
            text={item.text}
            key={item.key}
            checked={item.checked}
            set={() => props.setChecked(item.key)}
            delete={() => props.deleteTodo(item.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    marginTop: '15%',
    fontSize: 20,
    color: 'red',
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: 10,
    minHeight: '3%',
  },
});
