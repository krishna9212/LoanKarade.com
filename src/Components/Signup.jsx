import img from "./../assets/Login.jpg";
import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "./FireBase";
import AlertMessage from "./Alert";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

function Signup() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Initialize reCAPTCHA properly
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA Verified!");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired. Refreshing...");
        },
      });
    }
  };

  const storeUserData = (user) => {
    const userData = {
      uid: user.uid,
      phoneNumber: user.phoneNumber || "",
      displayName: user.displayName || "User",
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setupRecaptcha(); // Ensure reCAPTCHA is initialized

    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setAlert({ message: "OTP sent successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!confirmationResult) {
      setAlert({ message: "Please request OTP first.", type: "error" });
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      setAlert({ message: "OTP verified successfully!", type: "success" });
      storeUserData(result.user);
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      storeUserData(result.user);
      setAlert({ message: "Google sign-in successful!", type: "success" });
      window.location.reload();
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col  md:flex-row items-center justify-center dark:bg-gray-900">
      {alert && (
        <div className="absolute top-5 w-full flex justify-center">
          <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}

      {!user && (
        <div className="hidden md:block md:h-[55%] mb-[11rem] md:w-[40%]">
          <img src={img} alt="Login" className="w-full h-full object-cover rounded-lg" />
        </div>
      )}

      {user ? (
        <div className="w-full md:w-[50%] p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            Welcome, {user.displayName}!
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mt-2">{user.phoneNumber}</p>
        </div>
      ) : (
        <div className="w-full md:w-[50%] flex flex-col h-[88%] p-8 dark:bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
            Login to your account
          </h2>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center p-3 border rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
          >
            <FaGoogle className="mr-2 text-red-500" /> Continue with Google
          </button>
          <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp} className="pt-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-sm"
              required
            />
            {confirmationResult && (
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-sm mt-4"
                required
              />
            )}
            <button
              type="submit"
              className="w-full p-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
            >
              {confirmationResult ? "Verify OTP" : "Login with OTP"}
            </button>
          </form>
        </div>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Signup;
