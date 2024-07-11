import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { getDatabase } from "firebase/database";
import { NavigationContainer } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TemporaryWelcomeScreen from "./components/TemporaryWelcomeScreen";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { ref, onValue, push, update, remove } from "firebase/database";
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
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import TodoList from "./components/TodoList";
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ToDoApp from "./components/ToDoApp";
import AddTask from "./components/AddTask";
import TabNavigator from "./components/TabNavigator";
import { TodoProvider } from "./components/TodoContext";
import LoadingScreen from "./components/LoadingScreen";
import Minutes from "./components/Minutes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getApps, initializeApp } from "firebase/app";
import { createStackNavigator } from "@react-navigation/stack";
import DailyGoal from "./components/ActivityScreen/DailyGoal";
import firebase from "firebase/app";
import "firebase/auth";
import SignUp from "./components/SignUp";

import { getApp, app, auth, getAuth } from "./components/firebase";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  onAuthStateChanged,
  onChangeLoggedInUser,
} from "firebase/auth";
import { initializeStreak } from "./components/streaks";

export default function App() {
  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [debugMode, setDebugMode] = useState(false);
  const [showTemporaryWelcome, setShowTemporaryWelcome] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const firstLaunch = await AsyncStorage.getItem('firstLaunch');
      const debugModeValue = await AsyncStorage.getItem('debugMode') === 'true';

      setDebugMode(debugModeValue);
      if (firstLaunch === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      setLoading(false);
    };
    checkFirstLaunch();

    setTimeout(() => {
      setShowTemporaryWelcome(false);
    }, 2000); // Show welcome screen for 5 seconds
  }, []);

  

  if (showTemporaryWelcome) {
    return <TemporaryWelcomeScreen />;
  }

  return (
    <TodoProvider>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </TodoProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
