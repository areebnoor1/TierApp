import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ToDoApp from './components/ToDoApp';
import AddTask from './components/AddTask';
import TabNavigator from './components/TabNavigator';
import LoadingScreen from './components/LoadingScreen';
import Minutes from './components/Minutes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

/*GoogleSignin.configure({
  webClientId: '248488614748-698jn115oljro87m61oo3btad1vu5fud.apps.googleusercontent.com',
  iosClientId: '248488614748-nluheprsmq0kt501hoa8np8vb5mh1vm4.apps.googleusercontent.com',
  androidClientId: '248488614748-qj7corr2qet7tuvv1rvkqqr8vmmctmbm.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});*/
const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};
export const Stack = createStackNavigator();
export const HomeScreen = () => {
  return (
    <Stack.Navigator
      >
      <Stack.Screen component={HomeScreen} name="HomeScreen" options={{ title: "HomeScreen" }} />
      <Stack.Screen component={AddTask} name="AddTask" options={{ title: "AddTask" }} />
    </Stack.Navigator>
  )
}

export default function App() {

  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  var [uid, setuid] = useState(null);


  useEffect(() => {
    clearAsyncStorage();
    setTimeout (()=>{checkForToken()},2000)
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (e) {
      console.error('Failed to clear AsyncStorage.');
    }
  };
  
  // Call the function wherever you need to clear AsyncStorage


  const saveTokenToSecureStorage = async (token) => {
    SecureStore.setItemAsync("token", token)
  }
  const checkForToken = async () => {
    console.log('loading', loading)
    let stored_token = await SecureStore.getItemAsync('token')
    setToken(stored_token)
    console.log('loading', loading)
    setLoading(false)
  }
  const handleGoogleLogin = async () => {
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;
      console.log('token', idToken);

      if (idToken) {
        setToken(idToken);
        saveTokenToSecureStorage(idToken);
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

  if(loading === true){
    return(<LoadingScreen/>);
  }
  if (token === null) {
    //<Pressable onPress={handleGoogleLogin}><Text style={styles.text}>Continue with Google</Text></Pressable>
     
    return (
      <View style={styles.container}>
         </View>
    );
  } else {
    return (
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    );
  }
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
   // backgroundColor: '#F5FCFF',
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
