import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoContext } from "./TodoContext";
import { initializeStreak, getStreak, setStreak } from './streaks';

const auth = getAuth();

const SettingsScreen = () => {
  const [user, setUser] = useState(null);
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bestStreak, setBestStreak] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const {
    goal,
  } = useContext(TodoContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getStreak(currentUser.uid)
          .then(streak => {
            if (streak !== null) {
              setBestStreak(streak);
            }
          })
          .catch(error => {
            console.error('Error fetching streak:', error);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkDebugMode = async () => {
      const debugModeValue = await AsyncStorage.getItem('debugMode') === 'true';
      setDebugMode(debugModeValue);
    };
    checkDebugMode();
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        Alert.alert("", "Invalid username and/or password", [
          { text: "OK" },
        ]);
      });
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        initializeStreak(user.uid).then(login());
      })
      .catch((error) => {
        Alert.alert("", "Invalid username and/or password", [
          { text: "OK" },
        ]);
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("signed out!");
      setIsLoggedIn(false);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const handleDebugToggle = async () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    await AsyncStorage.setItem('debugMode', newDebugMode.toString());
  };

  if (user !== null) {
    if ('streak' in goal && goal.streak > bestStreak) {
      setStreak(user.uid, goal.streak);
    }
    return (
      <View style={styles.container}>
        <View style={styles.settingsSection}>
          <View style={styles.settingItem}>
            <Icon name="person-outline" size={24} />
            <Text style={styles.settingText}>Account</Text>
          </View>
          <View style={styles.profileSection}>
            <Text style={styles.profileName}>{user.displayName}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <View style={styles.accountPlaceholder}>
            <Text>
              Best Streak: {goal.streak > bestStreak ? goal.streak : bestStreak}
            </Text>
            <Button title="Sign out" onPress={handleSignOut} />
          </View>
          <View style={styles.debugContainer}>
            <Button title="Toggle Debug Mode" onPress={handleDebugToggle} />
            <Text>Debug Mode: {debugMode ? "Enabled" : "Disabled"}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Button title="Sign Up!" onPress={createUser} />
        <Button title="Log in!" onPress={login} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  settingsSection: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
  },
  accountPlaceholder: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    width: '100%',
  },
  debugContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SettingsScreen;