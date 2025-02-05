// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBW5dTPn21LOYZjFghtDyFZ5XkXiE62728",
  authDomain: "loankarade-1749f.firebaseapp.com",
  projectId: "loankarade-1749f",
  storageBucket: "loankarade-1749f.appspot.com",
  messagingSenderId: "382553234416",
  appId: "1:382553234416:web:09115e1bff87b7ba40db35",
  measurementId: "G-P77KPCYZFT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export necessary Firebase modules
export { auth, provider, db, RecaptchaVerifier, signInWithPhoneNumber, analytics };
