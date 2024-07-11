import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TemporaryWelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to TaskJar</Text>
      <Image
        source={require('../assets/landingjar.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a8cccc', // Set the background color
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: '20%', // Move the text further up
  },
  logo: {
    width: 150, // Adjust the size as needed
    height: 150,
    resizeMode: 'contain',
  },
});

export default TemporaryWelcomeScreen;