import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import male from "./../assets/male.png";
import female from "./../assets/female.png";
import other from "./../assets/other.png";
import AlertMessage from "./Alert";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);

  const avatars = { male, female, other };
  const db = getFirestore();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.firestoreId) {
          setUid(parsedUser.firestoreId);
          setUser(parsedUser); // Load stored data while fetching latest from Firestore
  
          setFormData({
            name: parsedUser.displayName || "",
            email: parsedUser.email || "",
            phone: parsedUser.phoneNumber || "",
            address: parsedUser.address || "",
            city: parsedUser.city || "",
            createdAt: parsedUser.createdAt || "",
            firestoreId: parsedUser.firestoreId || "",
            gender: parsedUser.gender || "",
            employmentType: parsedUser.employmentType || "",
            salary: parsedUser.salary || "",
            company: parsedUser.company || "",
            businessName: parsedUser.businessName || "",
            grossIncome: parsedUser.grossIncome || "",
            loanAmount: parsedUser.loanAmount || "",
            PositionInCompany: parsedUser.PositionInCompany || "",
            CatagoryOfBusiness: parsedUser.CatagoryOfBusiness || "",
            TotalEmiYouPayPerMonth: parsedUser.TotalEmiYouPayPerMonth || "",
          });
        } else {
          console.warn("No Firestore document ID found in localStorage. Checking Firestore...");
          findUserInFirestore(parsedUser.email, parsedUser.phoneNumber);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error parsing localStorage user:", error);
      setLoading(false);
    }
  }, []);
  

  const findUserInFirestore = async (email, phoneNumber) => {
    try {
      if (!email && !phoneNumber) return;

      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("email", "==", email),
        where("phoneNumber", "==", phoneNumber)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUid(userDoc.id);
        setUser(userData);
        setFormData(userData);

        // Store in localStorage for future fast access
        localStorage.setItem("user", JSON.stringify({ ...userData, firestoreId: userDoc.id }));
      } else {
        console.warn("User not found in Firestore.");
      }
    } catch (error) {
      console.error("Error finding user in Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!uid) return;

      try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData);
          setFormData(userData);

          // Update localStorage
          localStorage.setItem("user", JSON.stringify({ ...userData, firestoreId: uid }));
        } else {
          console.warn("User not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) fetchUserData();
  }, [uid]);

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!uid) {
      setAlert({ message: "Error: No user ID found.", type: "error" });
      return;
    }
  
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const existingData = userSnap.data();
        const updatedData = { ...existingData, ...formData }; // Merge old data with new
        
        await updateDoc(userRef, updatedData);
        
        setUser(updatedData);
        setFormData(updatedData);
        setIsEditing(false);
        
        // Store updated user data in localStorage
        localStorage.setItem("user", JSON.stringify({ ...updatedData, firestoreId: uid }));
  
        setAlert({ message: "Profile updated successfully!", type: "success" });
      } else {
        console.warn("User document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setAlert({ message: "Failed to update profile.", type: "error" });
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAlert({ message: "Logged out successfully", type: "success" });
    window.location.reload();
  };


  return (
    <div className={`flex justify-center items-center h-96 w-96  text-black   shadow-black dark:bg-gray-800  dark:text-white bg-gray-200 ${isEditing ? "-mt-5" : "mt-10"}`}>
      {loading ? (
        <div className="animate-spin rounded-full h-10 w-10  border-t-2 border-blue-500"></div>
      ) : user ? (
        <div className="relative w-96  bg-gray-200 text-black dark:bg-gray-800  dark:text-white rounded-lg p-6">
          {/* Floating Avatar */}
          <div className="absolute left-1/2 -top-12 transform -translate-x-1/2">
            <img
              src={avatars[user.gender] || avatars.other} // Use user.gender for avatar
              alt="Avatar"
              className={`w-24 h-24 rounded-full border-1 border-gray-300 dark:border-gray-600 transition-opacity ${isEditing ? "hidden" : "opacity-100"}`}
            />
          </div>

          {/* Profile Details */}
          <div className="mt-10 text-center">
            <h1 className="text-2xl font-semibold  text-black dark:bg-gray-800  dark:text-white">User Profile</h1>
            <div className={` text-left space-y-2 ${isEditing ? "-mb-20" : "mt-4"}`}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 mt-4 rounded border-[0.2px] outline-none border-gray-300 dark:border-gray-600 "
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded border-[0.2px] outline-none border-gray-300 dark:border-gray-600"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    maxLength={10}
                    minLength={10}
                    className="w-full p-2 rounded border-[0.2px] outline-none border-gray-300 dark:border-gray-600"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 rounded border-[0.2px] outline-none border-gray-300 dark:border-gray-600"
                    placeholder="Address"
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-[100%] p-2 rounded border-[0.2px] outline-none  border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                  >
                    <option value="other" className="dark:text-gray-100 dark:bg-gray-700 p-2">Other</option>
                    <option value="male" className="dark:text-gray-100 dark:bg-gray-700 p-2">Male</option>
                    <option value="female" className="dark:text-gray-100 dark:bg-gray-700 p-2">Female</option>
                  </select>
                  <button onClick={handleSave} className="border-blue-600   dark:text-gray-200 dark:hover:bg-blue-700  text-black px-4 md:py-2 py-3 mt-2 w-full border-[0.2px] rounded-xl hover:bg-blue-200 transition-all duration-700 text-sm md:text-base font-semibold  transform ">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {user.displayName || ""}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email || ""}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {user.phoneNumber || ""}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> {user.address || ""}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Gender:</strong> {user.gender || ""}</p>
                  
                  
    <div className={`flex h-full w-full justify-between items-center gap-1 -mb-12  pt-4 ${isEditing ? "-mb-0  pt-0" : "-mb-12  pt-4"}`}>

  <button
    onClick={handleLogout}
    className="border-red-600 dark:text-gray-200   dark:hover:bg-red-500 text-black px-4 md:py-2 py-3 w-1/2 border-[0.2px] rounded-xl hover:bg-red-200 transition-all duration-1000 text-sm md:text-base font-semibold  transform "
  >
    Log Out
  </button>

 
  <button
    onClick={handleEdit}
    className=" text-gray-700 border-[0.2px] hover:bg-gray-300 border-gray-500 dark:text-gray-200 px-4 md:py-2 py-3 rounded-xl w-1/2   dark:hover:bg-gray-900 transition-all duration-700 text-sm md:text-base font-semibold  transform "
  >
    Edit Profile
  </button>
</div>

                </>
              )}
            </div>
          </div>
        </div>
      ) : localStorage.clear()}
      
      <div className="alert text-lg font-light">
        {alert && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>
    </div>
  );
}

export default UserProfile;

