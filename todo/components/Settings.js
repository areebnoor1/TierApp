import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { initializeStreak, incrementStreak, resetStreak, getStreak } from './streaks';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { TodoContext } from './TodoContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const SettingsScreen = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [bestStreak, setBestStreak] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    todos, goal,
  } = useContext(TodoContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getStreak(currentUser.uid).then((streak) => {
          if (streak !== null) {
            setBestStreak(streak);
          }
        }).catch((error) => {
          console.error('Error fetching streak:', error);
        });
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      setIsLoggedIn(true);
    }).catch((error) => {
      Alert.alert('', 'Invalid username and/or password', [{ text: 'OK' }]);
      console.error(error.message);
    });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      initializeStreak(user.uid).then(() => handleLogin());
    }).catch((error) => {
      Alert.alert('', 'Invalid username and/or password', [{ text: 'OK' }]);
      console.error(error.message);
    });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('signed out!');
      setUser(null);
      setIsLoggedIn(false);
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <Text style={styles.profileName}>{user.displayName}</Text>
      <Text style={styles.profileEmail}>{user.email}</Text>
      <View style={styles.accountPlaceholder}>
        <Text>Best Streak: {goal.streak > bestStreak ? goal.streak : bestStreak}</Text>
        <Button title="Sign out" onPress={handleSignOut} />
      </View>
    </View>
  );

  const renderAuthSection = () => (
    <View style={styles.authSection}>
      <Text style={styles.title}>TASKJARS</Text>
      <Text>Want to save your streak?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
      />
      {isSignUp ? (
        <>
          <Button title="Sign Up" onPress={handleSignUp} />
          <TouchableOpacity onPress={() => setIsSignUp(false)}>
            <Text>Already have an account? Log In</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Button title="Log In" onPress={handleLogin} />
          <TouchableOpacity onPress={() => setIsSignUp(true)}>
            <Text>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {user ? renderProfileSection() : renderAuthSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  accountPlaceholder: {
    marginTop: 16,
    alignItems: 'center',
  },
  authSection: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    width: '100%',
  },
});

export default SettingsScreen;

