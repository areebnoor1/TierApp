import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getDatabase } from 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
  Pressable,
  Alert
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
import { getApps, initializeApp } from "firebase/app";
import { createStackNavigator } from '@react-navigation/stack';
import DailyGoal from './components/ActivityScreen/DailyGoal';
import firebase from "firebase/app";
import "firebase/auth";
import SignUp from "./components/SignUp"

import { getApp, app, auth, getAuth} from "./components/firebase";
import {  createUserWithEmailAndPassword, setPersistence, onAuthStateChanged, onChangeLoggedInUser } from "firebase/auth";
import { initializeStreak } from './components/streaks';

export default function App() {
  

  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  var [uid, setuid] = useState(null);

  
 

  useEffect(() => {

    //SHOULD BE REPLACED WITH RETRIEVEING THE TODOS

   // setTimeout( ()=>{clearAsyncStorage() }, 2000)
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (e) {
      console.error('Failed to clear AsyncStorage.');
    }
  };






  //Checking if firebase has been initialized





    return (

      <TodoProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </TodoProvider>

    );
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
