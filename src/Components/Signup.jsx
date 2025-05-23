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
      const checkUser = async () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
  
          // Check Firestore for existing user data based on email or phone
          const usersRef = collection(db, "users");
          const q = query(usersRef, 
            where("email", "==", parsedUser.email || ""), 
            where("phoneNumber", "==", parsedUser.phoneNumber || "")
          );
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const firestoreUser = querySnapshot.docs[0].data();
            firestoreUser.firestoreId = querySnapshot.docs[0].id; // Add firestoreId
            localStorage.setItem("user", JSON.stringify(firestoreUser)); // Update localStorage
            setUser(firestoreUser); // Use Firestore data
            console.log("User data loaded from Firestore:", firestoreUser);
          } else {
            setUser(parsedUser); // User local storage data as fallback
            console.log("User data loaded from localStorage:", parsedUser);
          }
        }
      };
  
      checkUser();
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
        const usersRef = collection(db, "users");

        // Query to check if the user exists using BOTH email and phone number
        let q = query(usersRef, 
            where("email", "==", authUser.email || ""),
            where("phoneNumber", "==", authUser.phoneNumber || "")
        );
        let querySnapshot = await getDocs(q);
        
        let firestoreId;
        let userData = {
            phoneNumber: authUser.phoneNumber || "",
            displayName: authUser.displayName || "User",
            email: authUser.email || "",
            address: authUser.address || "",
            gender: authUser.gender || "",
            createdAt: new Date(),
        };
        
        if (!querySnapshot.empty) {
            // If a matching user is found, update the existing record
            const existingUser = querySnapshot.docs[0];
            firestoreId = existingUser.id;
            await setDoc(doc(db, "users", firestoreId), userData, { merge: true });
            console.log("User updated:", userData);
        } else {
            // Create a new document with a unique Firestore ID
            const newUserRef = await addDoc(usersRef, userData);
            firestoreId = newUserRef.id;
            console.log("New user created:", userData);
        }
        
        // Save the correct user ID
        userData.firestoreId = firestoreId;
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
        address: "",  // You can add a form to collect this later
        gender: "",   // Same as above
      };
  
      await storeUserData(googleUser);
      setAlert({ message: "Google sign-in successful!", type: "success" });
      setUser(false);
      window.location.reload();

    } catch (error) {
      setAlert({ message: "Something went wrong during sign-in. Please reload the page and try again.", type: "error" });
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
        <div className="h-[100vh]  w-full flex flex-col md:flex-row items-center justify-center bg-gray-50 shadow-black shadow-2xl dark:bg-gray-900">
          {alert && (
            <div className="absolute top-5 z-50 w-full flex justify-center">
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
                className="w-full flex items-center justify-center p-3 text-black dark:text-gray-100 dark:border-black rounded-lg border-[0.2px]  dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
              >
                <FaGoogle className="mr-2 text-red-500" /> <p className="mt-[0.8px] md:mb-[0.3px] text-[0.9rem] md:text-[1rem]">Continue with Google</p>
              </button>
              <div className="linediv flex justify-between w-full items-center h-[4%]  gap-3 mt-6 -mb-2 ">
              <div className="line h-[0.1px] w-full bg-gray-500 md:bg-gray-400  "></div>
              <p className="text-center whitespace-nowrap text-gray-600  ">or continue with mobile number</p>
              <div className="line h-[0.1px] w-full bg-gray-500 md:bg-gray-400 "></div>

              </div>
  
              <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp} className="pt-10">
                {!confirmationResult ? (
                  <div>
                    <div className="flex items-center ">
                      <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-6 h-4 mr-2" />
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
                <div className="line h-[0.5px] md:h-[0.1px] w-full bg-gray-600 md:bg-gray-500 -mt-1"></div>
  
                <button
                  type="submit"
                  className="w-full p-3 mt-6 text-gray-100  hover:bg-transparent hover:border-blue-500 border-[0.2px] rounded-lg bg-blue-500 hover:text-gray-800 dark:hover:text-gray-200  transition duration-1000 shadow-md"
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
