import img from "./../assets/Login.jpg";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "./FireBase";
import AlertMessage from "./Alert";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";

function Signup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(null);

  // Function to store user data in local storage
  const storeUserData = (user) => {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "No Name",
      photoURL: user.photoURL || "",
    };
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      storeUserData(result.user);
      setAlert({ message: "Google sign-in successful!", type: "success" });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  // Email Sign-in
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      storeUserData(result.user);
      setAlert({ message: "Login successful!", type: "success" });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  // Sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match!", type: "error" });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      storeUserData(result.user);
      setAlert({ message: "User signed up successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setAlert({ message: "Please enter your email first!", type: "error" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setAlert({ message: "Password reset email sent!", type: "success" });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="h-[100%] flex flex-col md:flex-row items-center justify-center dark:bg-gray-900">
      {/* Show Alert */}
      <div className="alert text-lg font-light">
        {alert && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>

      {/* Left side Image (for larger screens) */}
      <div className="hidden md:block md:h-[75%] md:w-1/2">
        <img src={img} alt="Login" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Right side Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-8 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={isSignUp ? handleSignUp : handleEmailSignIn}>
          {/* Email */}
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Confirm Password (Only for Signup) */}
          {isSignUp && (
            <div className="mb-2">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center p-3 mt-4 border rounded-lg bg-white hover:bg-gray-100 transition duration-300"
        >
          <FaGoogle className="mr-2 text-red-500" /> Sign in with Google
        </button>

        {/* Forgot Password */}
        {!isSignUp && (
          <p className="text-center mt-2 text-sm text-blue-500 cursor-pointer hover:underline" onClick={handleForgotPassword}>
            Forgot Password?
          </p>
        )}

        {/* Toggle between Login & SignUp */}
        <p className="text-center mt-4 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 cursor-pointer hover:underline">
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
