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
    Pressable
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import TodoList from './TodoList';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ToDoApp from './ToDoApp';
import AddTask from './AddTask';
import HomePage from './HomePage';
import Minutes from './Minutes';
import Jars from './Jars';
import Hours from './Hours';
import Activity from './Activity';
import Days from './Days';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

export default function ActivityWrapper() {
    return (


        < View >
            {/*} <GoalProvider>
            <Activity />
    </GoalProvider>*/}
            <Activity />
        </View >
    );

}
