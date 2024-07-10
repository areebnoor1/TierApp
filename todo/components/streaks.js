// streaks.js
import { firestore } from './firebase';
import { doc, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';

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
const setStreak = async (userId, num) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      streaks: num,
    });
    console.log('Streak incremented!');
  } catch (error) {

    console.error('Error incrementing streak:', error);
    console.log(error)
  }
};

// Function to reset the streak count
const resetStreak = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, { streaks: 1 });
    console.log('Streak reset!');
  } catch (error) {
    console.error('Error resetting streak:', error);
  }
};

// Function to retrieve the streak count
const getStreak = async (userId) => {
  try {
    console.log('yay')
    const userRef = doc(firestore, 'users', userId);
    console.log('yay')
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log('yay')
      return docSnap.data().streaks;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving streak:', error);
    return null;
  }
};

export { initializeStreak, setStreak, resetStreak, getStreak };
