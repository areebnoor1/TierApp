import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('./logingif.gif')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Animated.View style={{ ...styles.textContainer, opacity: fadeAnim }}>
        <Text style={styles.title}>Welcome</Text>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('SignIn')}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});