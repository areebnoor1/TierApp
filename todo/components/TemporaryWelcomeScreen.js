// components/TemporaryWelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TemporaryWelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Ensure the background color is set
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TemporaryWelcomeScreen;