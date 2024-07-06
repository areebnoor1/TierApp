import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getDatabase } from 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import {
  ref,
  onValue,
  push,
  update,
  remove,
  
} from 'firebase/database';
//import * as firebaseApp from 'firebase';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Pressable
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import TodoList from './components/TodoList';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ToDoApp from './components/ToDoApp';
import AddTask from './components/AddTask';
import TabNavigator from './components/TabNavigator';
import { TodoProvider } from './components/TodoContext';
import LoadingScreen from './components/LoadingScreen';
import Minutes from './components/Minutes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DailyGoal from './components/ActivityScreen/DailyGoal';
import firebase from "firebase/app";
import "firebase/auth";
import SignUp from "./components/SignUp"

import "./components/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function App() {
  

  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  var [uid, setuid] = useState(null);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
 

  useEffect(() => {

    //SHOULD BE REPLACED WITH RETRIEVEING THE TODOS

    // setTimeout( ()=>{clearAsyncStorage() }, 2000)
  }, []);

  const auth = getAuth();
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onChangeLoggedInUser(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (e) {
      console.error('Failed to clear AsyncStorage.');
    }
  };

  const firebaseConfig = {
    apiKey: "AIzaSyBNYrjkuW86Gvn4CO9qMUf9YiDoTFAUYyo",
    authDomain: "prettylib.firebaseapp.com",
    databaseURL: "https://prettylib-default-rtdb.firebaseio.com",
    projectId: "prettylib",
    storageBucket: "prettylib.appspot.com",
    messagingSenderId: "248488614748",
    appId: "1:248488614748:web:2520b043a65333fb56ff99",
    measurementId: "G-W2S4558058"
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false)


  //Checking if firebase has been initialized


  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        onChangeLoggedInUser(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };



  if (!isLoggedIn) {
    
    return (
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <Button title="Sign Up!" onPress={() => {createUser()
        setIsLoggedIn(true)}
        } />
        <Button title="Log in!" onPress={() => {login()
        setIsLoggedIn(true)}
        } />
      </View>
    );
  } else {
    return (

      <TodoProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </TodoProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});
