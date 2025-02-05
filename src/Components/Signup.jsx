import img from "./../assets/Login.jpg";
import React, { useState, useEffect } from "react";
import { FaGoogle, FaSadCry } from "react-icons/fa";
import { auth, provider } from "./FireBase";
import AlertMessage from "./Alert";
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./FireBase"; // Ensure Firestore is correctly imported

function Signup() {
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState(null);
    const [country, setCountry] = useState("+91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setupRecaptcha();
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

  const storeUserData = async (authUser) => {
    try {
      // Reference Firestore collection
      const usersRef = collection(db, "users");
  
      // Query Firestore to check if user exists by email or phone
      const q = query(usersRef, where("email", "==", authUser.email || ""), where("phoneNumber", "==", authUser.phoneNumber || ""));
      const querySnapshot = await getDocs(q);
  
      let firestoreId;
      let userData = {
        phoneNumber: authUser.phoneNumber || "",
        displayName: authUser.displayName || "User",
        email: authUser.email || "",
        address: authUser.address || "N/A",  // Default if no address
        gender: authUser.gender || "N/A",   // Default if no gender
        createdAt: new Date(),
      };
  
      if (!querySnapshot.empty) {
        // User exists, update their Firestore document
        const existingUser = querySnapshot.docs[0];
        firestoreId = existingUser.id;
  
        await setDoc(doc(db, "users", firestoreId), userData, { merge: true });
      } else {
        // User doesn't exist, create a new document
        const newUserRef = await addDoc(usersRef, userData);
        firestoreId = newUserRef.id;
      }
  
      // Store Firestore ID
      userData.firestoreId = firestoreId;
      console.log("Stored User Data:", userData);
  
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };


  const handleSendOtp = async (e) => {
    
    e.preventDefault();

    const appVerifier = window.recaptchaVerifier;
    if (phoneNumber.length < 10) {
      setAlert({ message: "Enter a valid 10-digit phone number", type: "error" });
      return;
    }

    try {
      const fullPhoneNumber = country + phoneNumber;
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setAlert({ message: "OTP sent successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (!confirmationResult) {
        throw new Error("Please request an OTP first.");
      }
  
      const result = await confirmationResult.confirm(otp);
      
  
      const otpUser = {
        displayName: result.user.displayName || "User",
        phoneNumber: result.user.phoneNumber || "",
        email: result.user.email || "",
      };
  
      await storeUserData(otpUser);
      setAlert({ message: "OTP verified successfully!", type: "success" });
      setUser(false);
      setTimeout(() => window.location.reload(), 2000); // Reload after 2 seconds

      console.log("User Data:", otpUser);
    } catch (error) {
      setAlert({ message: "Invalid OTP. Please try again.", type: "error" });
      }
  
    setLoading(false);
  };
  
  
  const handleGoogleSignIn = async () => {
    setLoading(true); // Start loading
    try {
      const result = await signInWithPopup(auth, provider);
      
      const googleUser = {
        displayName: result.user.displayName,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber || "",
        address: "N/A",  // You can add a form to collect this later
        gender: "N/A",   // Same as above
      };
  
      await storeUserData(googleUser);
      setAlert({ message: "Google sign-in successful!", type: "success" });
      setUser(false);
      window.location.reload();

    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    }
    setLoading(false); // stop loading
  };
  
  
  
  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-10 pointer-events-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
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
            <div className="w-full md:w-[50%] p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                Welcome, {user.displayName}!
              </h2>
              <p className="text-center text-gray-500 dark:text-gray-300 mt-2">{user.phoneNumber}</p>
            </div>
          ) : (
            <div className="w-full md:w-[50%] flex flex-col h-[94%] p-8  dark:bg-gray-900 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
                Login to your account
              </h2>
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center p-3 border dark:border-black rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
              >
                <FaGoogle className="mr-2 text-red-500" /> Continue with Google
              </button>
  
              <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp} className="pt-10">
                {!confirmationResult ? (
                  <div>
                    <div className="flex items-center space-x-2">
                      <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-6 h-4" />
                      <p className="text-gray-700 dark:text-gray-300">{country}</p>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="Mobile Number"
                        minLength={10}
                        maxLength={10}
                        className="w-full p-3 rounded-lg focus:outline-none dark:bg-transparent dark:text-gray-200"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <input
                    type="tel"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
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
      )}
    </>
  );
}

export default Signup;
