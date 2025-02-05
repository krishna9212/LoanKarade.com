// Import required Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW5dTPn21LOYZjFghtDyFZ5XkXiE62728",
  siteKey:"6Legdc0qAAAAAJBJpDqKZEU4uFIcDW5t-6dfdS_t",
  authDomain: "loankarade-1749f.firebaseapp.com",
  projectId: "loankarade-1749f",
  storageBucket: "loankarade-1749f.appspot.com",
  messagingSenderId: "382553234416",
  appId: "1:382553234416:web:09115e1bff87b7ba40db35",
  measurementId: "G-P77KPCYZFT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Set Firebase Authentication language to device default
// auth.useDeviceLanguage();

// Export necessary modules
export { auth, provider, db, RecaptchaVerifier, signInWithPhoneNumber, analytics };
