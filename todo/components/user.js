// streaks.js
import { firestore } from './firebaseConfig';
import { doc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';

// Function to set initial streak count for a user
const initializeStreak = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await setDoc(userRef, { streaks: 0 }, { merge: true });
    console.log('Streak initialized!');
  } catch (error) {
    console.error('Error initializing streak:', error);
  }
};

// Function to increment the streak count
const incrementStreak = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      streaks: increment(1),
    });
    console.log('Streak incremented!');
  } catch (error) {
    console.error('Error incrementing streak:', error);
  }
};

// Function to reset the streak count
const resetStreak = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, { streaks: 0 });
    console.log('Streak reset!');
  } catch (error) {
    console.error('Error resetting streak:', error);
  }
};

export { initializeStreak, incrementStreak, resetStreak };
