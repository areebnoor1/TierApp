
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

var firebaseConfig = {
    apiKey: "AIzaSyBNYrjkuW86Gvn4CO9qMUf9YiDoTFAUYyo",
    authDomain: "prettylib.firebaseapp.com",
    projectId: "prettylib",
    storageBucket: "prettylib.appspot.com",
    messagingSenderId: "248488614748",
    appId: "1:248488614748:web:2520b043a65333fb56ff99",
    measurementId: "G-W2S4558058"
  };
// Initialize Firebase

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore = getFirestore(app);

export { app, auth, getApp, getAuth, firestore};

//export const db = getDatabase(app)