import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database" 

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
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)