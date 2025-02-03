// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW5dTPn21LOYZjFghtDyFZ5XkXiE62728",
  authDomain: "loankarade-1749f.firebaseapp.com",
  projectId: "loankarade-1749f",
  storageBucket: "loankarade-1749f.appspot.com",
  messagingSenderId: "382553234416",
  appId: "1:382553234416:web:09115e1bff87b7ba40db35",
  measurementId: "G-P77KPCYZFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
