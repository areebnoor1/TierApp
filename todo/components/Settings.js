import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, Switch, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getApp, app, auth, getAuth } from "./firebase";
import { TodoContext } from "./TodoContext";
//import { createUserWithEmailAndPassword, setPersistence, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeStreak, incrementStreak, resetStreak, getStreak, setStreak } from './streaks';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, setPersistence, onAuthStateChanged, signOut, onChangeLoggedInUser } from "firebase/auth";

const SettingsScreen = () => {
  const [user, setUser] = React.useState(null);
  //const [streak, setStreaks] = React.useState(0);
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [bestStreak, setBestStreak] = useState(false)

  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodoCompleted,
    completedThisWeek,
    goal,
    goalExists,
    updateGoal,
    setCompleted,
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




  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // onChangeLoggedInUser(user.email);
        setIsLoggedIn(true)
      })
      .catch((error) => {
        Alert.alert("", "Invalid username and/or password", [
          { text: "OK" },
        ]);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)

      });
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        initializeStreak(user.uid).then(
          login())
        //onChangeLoggedInUser(user.email);
      })
      .catch((error) => {
        Alert.alert("", "Invalid username and/or password", [
          { text: "OK" },
        ]);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("signed out!")
    }).catch((error) => {
      // An error happened.
    });
  }

  

  if (user !== null) {
    if('streak' in goal && goal.streak > bestStreak){
      setStreak(user.uid, goal.streak)
  
    }
    return (
      <View style={[styles.container]}>
        <View style={styles.settingsSection}>

          <View style={styles.settingItem}>
            <Icon name="person-outline" size={24} />
            <Text style={[styles.settingText]}>Account</Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={[styles.profileName]}>{user.displayName}</Text>
            <Text style={[styles.profileEmail]}>{user.email}</Text>
          </View>
          <View style={styles.accountPlaceholder}>
            {console.log(goal.streak)}
            {console.log('best', bestStreak)}
            <Text>
              Best Streak: {goal.streak > bestStreak ? goal.streak : bestStreak}
            </Text>
            <Text>
              Total tasks completed:
            </Text>
            <Button
              title="Sign out"

              onPress={() => handleSignOut()}
            />
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
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
        ></TextInput>
        <Button title="Sign Up!" onPress={() => {
          createUser()

        }
        } />
        <Button title="Log in!" onPress={() => {
          login()
        }
        } />
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
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
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
  icon: {
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
  icon: {
    color: '#fff',
  },
  input: {
    borderColor: '#555',
    backgroundColor: '#333',
    color: '#fff',
  },
});

export default SettingsScreen;
