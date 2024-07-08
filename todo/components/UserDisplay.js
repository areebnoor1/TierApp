import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeStreak, incrementStreak, resetStreak, getStreak } from './streaks';

export default function UserDisplay() {
  const [user, setUser] = React.useState(null);
  const [streak, setStreaks] = React.useState(0);

  const handleIncrementStreak = () => {
    if (user) {
      incrementStreak(user.uid);
    }

  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getStreak(user.uid)
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

    return () => unsubscribe();
  }, []);

  const fetchStreaks = async () => {
    try {
      const streak = await getStreak(userId);
      if (streak !== null) {
        setStreaks(streak);
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  };

  return (<View>

    <Button title="Increment Streak" onPress={handleIncrementStreak} />
    <Button title="Fetch Streak" onPress={() => { 
    getStreak(user.uid)
      .then(streak => {
        if (streak !== null) {
          setStreaks(streak);
        }
      })
      .catch(error => {
        console.error('Error fetching streak:', error);
      }); }} />
    <Text>{streak}</Text>
  </View>);

}