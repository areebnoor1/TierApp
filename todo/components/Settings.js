import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Switch, StyleSheet, Image, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getApp, app, auth, getAuth } from "./firebase";
import { createUserWithEmailAndPassword, setPersistence, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeStreak, incrementStreak, resetStreak, getStreak } from './streaks';

const SettingsScreen = () => {
  const [user, setUser] = React.useState(null);
  const [streak, setStreaks] = React.useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getStreak(currentUser.uid)
          .then(streak => {
            if (streak !== null) {
              setStreaks(streak);
            }
          })
          .catch(error => {
            console.error('Error fetching streak:', error);
          });
      }
    });

() => {unsubscribe()};

  
  }, [streak]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("signed out!")
    }).catch((error) => {
      // An error happened.
    });
  }

if(user !== null){
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
          <Text>
            Streak: {streak}
          </Text>
          <Button
            title="Sign out"
    
            onPress={()=>handleSignOut()}
          />
        </View>
      </View>
    </View>
  );}else{
    return(
      <View><Text>Reload to Login or Signup</Text></View>
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
