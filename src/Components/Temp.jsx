import React, { useState, useEffect } from "react";
import { auth, db } from "./FireBase";
import { doc, getDoc } from "firebase/firestore";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No user data found!");
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      {userData ? (
        <div className="text-center">
          <img
            src={userData.photoURL || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-xl font-semibold dark:text-white">{userData.displayName}</h2>
          <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
          <p className="text-gray-600 dark:text-gray-300">{userData.phoneNumber}</p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
