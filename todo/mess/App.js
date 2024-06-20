import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import * as SecureStore from 'expo-secure-store';
const thunk = require('redux-thunk').thunk;

import ToDoApp from './components/ToDoApp.js';


const initialState = {
  todos: [],
  uid: null,
};

function setupTodoListener(userID) {
  firebaseApp
    .database()
    .ref('users/' + userID)
    .on('value', snapshot => {
      if (snapshot.val() !== null) {
        console.log(snapshot.val())
        store.dispatch({
          type: 'LOAD_TODO',
          payload: { todos: snapshot.val().todos },
        });
      } else {
        store.dispatch({
          type: 'LOAD_TODO',
          payload: { todos: [] },
        });
      }
    });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_TODO':
      return { ...state, todos: action.payload.todos };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload.add] };
    case 'DELETE_TODO':
      return { ...state, todos: deleteHelper(state.todos, action.payload.key) };
    case 'TOGGLE_CHECKED':
      return { ...state, todos: toggleHelper(state.todos, action.payload.key) }; 
    case 'UID_UPDATE':
      return { ...state, uid: action.payload.uid}
  }

  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

let deleteHelper = (todo, id) => {
  return todo.filter(todo => {
    if (todo.key !== id) return true;
  });
};

let toggleHelper = (todo, id) => {
  return todo.map(todo => {
    if (todo.key === id) todo.checked = !todo.checked;
    return todo;
  });
};

function storeTodo(userID, todo) {
  //Write this score to the database
  firebaseApp
    .database()
    .ref('users/' + userID)
    .set({
      todos: todo,
    });
}

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState(null);
  var [uid, setuid] = React.useState(null);

  useEffect(() => {
    /*checkForToken();
    checkForFirebaseCredential();
    
    
auth().onAuthStateChanged(user => {
      if (user != null) {
        setuid(user.uid);
        console.log('We are authenticated now!', `Hi ${user.uid}`);
        setupTodoListener(user.uid);
        store.dispatch({
          type: 'UID_UPDATE',
          payload: { uid: user.uid },
        });
      }
    });*/
  }, []);

  async function checkForToken() {
    let token = await SecureStore.getItemAsync('token');
    setToken(token);
    setLoading(false);
  }

  async function checkForFirebaseCredential() {
    let credential = await SecureStore.getItemAsync('firebaseCredential');
    if (credential) {
      firebaseApp
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log('Auth failed and here the error' + JSON.stringify(error));
        });
    }
  }

  let saveTokenToSecureStorage = async (token, credential) => {
    SecureStore.setItemAsync('token', token);
    SecureStore.setItemAsync('firebaseCredential', credential);
    setToken(token);
  };


 /* if (loading === true) {
    return <View />;
  } else if (token === null) {
    return (
      <View style={styles.login}>
        <Button  title="LogIn With Facebook" onPress={() => logIn()} />
      </View>
    );
  }*/
  return (
    <Provider store={store}>
      <ToDoApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
