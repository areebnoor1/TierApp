import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodoProvider } from './components/TodoContext';
import TabNavigator from './components/TabNavigator';
import TemporaryWelcomeScreen from './components/TemporaryWelcomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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

export default App;