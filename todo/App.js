import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
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
import TodoList from './components/TodoList';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ToDoApp from './components/ToDoApp';
import HomePage from './components/HomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/*function setupTodoListener(userID) {
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
function storeTodo(userID, todo) {
  //Write this score to the database
  firebaseApp
    .database()
    .ref('users/' + userID)
    .set({
      todos: todo,
    });
}
*/
GoogleSignin.configure({
  webClientId: '248488614748-698jn115oljro87m61oo3btad1vu5fud.apps.googleusercontent.com',
  iosClientId: '248488614748-nluheprsmq0kt501hoa8np8vb5mh1vm4.apps.googleusercontent.com',
  androidClientId: '248488614748-qj7corr2qet7tuvv1rvkqqr8vmmctmbm.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export default function App() {

  const Tab = createBottomTabNavigator();


  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  var [uid, setuid] = useState(null);


  /*function addNewTodo() {
    push(ref(db, '/todos'), {
      //fix object
    });
    setPresentTodo('');
  }*/

  const saveTokenToSecureStorage = async (token) => {
    SecureStore.setItemAsync("token", token)
  }
  const checkForToken = async () => {
    let stored_token = await SecureStore.getItemAsync('token')
    setToken(stored_token)
  }
  const handleGoogleLogin = async () => {
    //setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;
      console.log('token', idToken);

      if (idToken) {
        /*const resp = await authAPI.validateToken({
          token: idToken,
          email: user.email,
        });*/
        //await handlePostLoginData(resp.data);
        setToken(idToken);
        //saveTokenToSecureStorage(idToken);
      }
    } catch (apiError) {
      setError(
        apiError?.response?.data?.error?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
      console.log("loading", loading)
    }
  };

  /*
    let checkTodo = id => {
      setTodos(
        todos.map(todo => {
          if (todo.key === id) todo.checked = !todo.checked;
          return todo;
        })
      );
    };



<ScrollView style={styles.scroll}>
          {todos.map(item => (
            <TodoList
              text={item.text}
              key={item.key}
              checked={item.checked}
              setChecked={() => checkTodo(item.key)}
              deleteTodo={() => deleteTodo(item.key)}
            />
          ))}
        </ScrollView>

  */

  /*let deleteTodo = id => {
    setTodos(
      todos.filter(todo => {
        if (id !== todo.key)
          return true;
      })
    );
  }*/

  if (token === null) {
    return (
      <View style={styles.container}>
        <Pressable onPress={handleGoogleLogin}><Text style={styles.text}>Continue with Google</Text></Pressable>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name='Home' component={HomePage} />
        <Tab.Screen name='Minutes' component={ToDoApp} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
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
