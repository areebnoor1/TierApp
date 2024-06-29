import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
//import * as firebaseApp from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TodoList from './TodoList';

import { db } from "./firebase.js"

export default function ToDoApp() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState({});
  
  const todosKeys = Object.keys(todos);

  useEffect(() => {
    return onValue(ref(db, '/todos'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let todoItems = {...data};
      setTodos(todoItems);
    });
  }, []);

  let addTodo = () => {
    push(ref(db, '/todos'), {
      text: value, key: Date.now(), checked: false
    });
    if (value.length > 0) {
    //  setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
      setValue('');
    }
  };

  let checkTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  let deleteTodo = id => {
    remove(ref(db, '/todos/' + id));
  }
  
  return (<View style={styles.container}>
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
      <TouchableOpacity onPress={() => addTodo()}>
        <Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    </View>
    <ScrollView style={styles.scroll}>
      {
      todosKeys.map(key => (
        <TodoList
          text={todos[key].text}
          key={todos[key].key}
          todoItem={todos[key].checked}
          setChecked={() => todos[key].key}
          deleteTodo={() => deleteTodo(key)}
        />
      ))      
      }
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
  text: {
    fontSize: 40,
    paddingTop: 70,
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
