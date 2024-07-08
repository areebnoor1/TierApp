import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { GoalProvider } from "./DailyGoalContext";
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
  Pressable,
  Settings
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import TodoList from './TodoList';
import UserDisplay from './UserDisplay';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ToDoApp from './ToDoApp';
import AddTask from './AddTask';
import HomePage from './HomePage';
import Minutes from './Minutes';
import Jars from './Jars';
import Hours from './Hours';
import Activity from './Activity';
import ActivityWrapper from './ActivityWrapper';
import Days from './Days';
import SettingsScreen from './Settings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';



export default function TabNavigator() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          //backgroundColor:  "#232138",
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },

      }}

    >
      <Tab.Screen name='Home' options={{ tabBarIcon: () => (<Ionicons name='home' style={styles.icon} size={30} />) }} component={HomePage} />
      <Tab.Screen name='Jars' component={Jars} options={{ tabBarIcon: () => (<FontAwesome6 name='jar' style={styles.icon} size={30} />) }} />
      
        <Tab.Screen name='Activity' component={Activity} options={{ tabBarIcon: () => (<MaterialIcons name='playlist-add-check' style={styles.icon} size={30} />) }} />
       
      <Tab.Screen name='Settings' component={SettingsScreen} options={{ tabBarIcon: () => (<Feather name='settings' style={styles.icon} size={30} />) }} />


    </Tab.Navigator>

  );

}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    height: '100%'
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
