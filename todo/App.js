import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import TodoList from './components/TodoList';
import ToDoApp from './components/ToDoApp';
import AddTask from './components/AddTask';
import TabNavigator from './components/TabNavigator';
import { TodoProvider } from './components/TodoContext';
import LoadingScreen from './components/LoadingScreen';
import Minutes from './components/Minutes';
import DailyGoal from './components/ActivityScreen/DailyGoal';
import WelcomeScreen from './components/FirstLaunch/WelcomeScreen';
import SignInScreen from './components//FirstLaunch/SignInScreen';
import SettingsScreen from './components/Settings';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <TodoProvider>
      <NavigationContainer>
        {user ? (
          <MainApp />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </TodoProvider>
  );
}

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HomePage() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={ToDoApp} options={{ title: "HomeScreen" }} />
      <Stack.Screen name="AddTask" component={AddTask} options={{ title: "AddTask" }} />
      <Stack.Screen name="DailyGoal" component={DailyGoal} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
});