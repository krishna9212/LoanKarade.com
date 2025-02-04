import img from "./../assets/Login.jpg";
import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, provider } from "./FireBase";
import AlertMessage from "./Alert";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

function Signup() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [country, setCountry] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Initialize reCAPTCHA on component mount
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA Verified!");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired. Refreshing...");
        },
        // badge: "inline", // Moves the reCAPTCHA badge inline
      });
    }
  }, []);
  

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

    if (phoneNumber.length < 10) {
      setAlert({ message: "Enter a valid 10-digit phone number", type: "error" });
      return;
    }

    try {
      const fullPhoneNumber = country + phoneNumber;
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
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
      setUser(false)
      window.location.reload();
    } catch (error) {
      setAlert({ message: "Invalid OTP. Please try again.", type: "error" });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      storeUserData(result.user);
      setAlert({ message: "Google sign-in successful!", type: "success" });
      setUser(false)
      window.location.reload();

    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="h-[100vh] w-full flex flex-col md:flex-row items-center justify-center dark:bg-gray-900">
      {alert && (
        <div className="absolute top-5 w-full flex justify-center">
          <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}

      {!user && (
        <div className="hidden md:block md:h-[60%] mb-[11rem] md:w-[40%]">
          <img src={img} alt="Login" className="w-full h-full object-cover rounded-lg" />
        </div>
      )}

      {user ? (
        <div className="w-full md:w-[50%] p-8  bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
            Welcome, {user.displayName}!
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mt-2">{user.phoneNumber}</p>
        </div>

      ) : (
        <div className="w-full md:w-[50%] flex flex-col h-[94%] p-8 dark:bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
            Login to your account
          </h2>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center  justify-center p-3 border dark:border-black rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
          >
            <FaGoogle className="mr-2 text-red-500" /> Continue with Google
          </button>

          <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp} className="pt-10">
  {!confirmationResult ? (
    // Phone Number Input - Visible only before OTP is sent
    <div>
      <div className="flex items-center space-x-2">
        <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-6 h-4" />
        <p className="text-gray-700 dark:text-gray-300">{country}</p>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            setPhoneNumber(inputValue);
          }}
          placeholder="Mobile Number"
          minLength={10}
          maxLength={10}
          className="w-full p-3 rounded-lg focus:outline-none dark:bg-transparent dark:text-gray-200"
          required
        />
      </div>
    </div>
  ) : (
    // OTP Input - Visible only after OTP is sent successfully
    <input
    type="tel"
    value={otp}
    onChange={(e) => {const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      setOtp(inputValue);
    }}
    minLength={6}
    maxLength={6}
    placeholder="Enter OTP"
    className="w-full p-3 rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white"
    required
    />
  )}
  <div className="line h-[0.1px] w-full bg-gray-300 mt-2"></div>

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
