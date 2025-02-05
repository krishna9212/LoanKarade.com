import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import male from "./../assets/male.png";
import female from "./../assets/female.png";
import other from "./../assets/other.png";
import AlertMessage from "./Alert";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", gender: "" });
  const [alert, setAlert] = useState(null);

  const avatars = { male, female, other };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.firestoreId) {
          setUid(parsedUser.firestoreId);
        } else {
          console.warn("No Firestore document ID found in localStorage.");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage user:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!uid) return; // Prevent Firestore reads if UID is missing

      try {
        const db = getFirestore();
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData);
          setFormData(userData);
        } else {
          console.warn("User not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!uid) {
      setAlert({ message: "Error: No user ID found.", type: "error" });
      return;
    }
  
    try {
      const db = getFirestore();
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, formData);
  
      setUser(formData);
      setIsEditing(false);
  
      // Store user data in localStorage, including name separately
      localStorage.setItem("user", JSON.stringify({ ...formData, firestoreId: uid }));
      localStorage.setItem("name", formData.name); // Store the name separately
  
      setAlert({ message: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.error("Error updating user data:", error);
      setAlert({ message: "Failed to update profile.", type: "error" });
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAlert({ message: "Logged out successfully", type: "success" });
    // localStorage.removeItem('_grecaptcha');
    window.location.reload();
  };

  return (
    <div className={`flex justify-center items-center h-96 w-96  text-black dark:bg-gray-800  dark:text-white bg-gray-100 ${isEditing ? "-mt-5" : "mt-10"}`}>
      {loading ? (
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      ) : user ? (
        <div className="relative w-96 bg-gray-100 text-black dark:bg-gray-800  dark:text-white rounded-lg p-6">
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
                    name="name"
                    value={formData.name}
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
                    name="phone"
                    value={formData.phone}
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
                  <button onClick={handleSave} className="text-gray-100 outline-none  bg-blue-600  px-4 md:py-2 py-3 rounded-xl w-full hover:bg-blue-700 transition-all duration-700 text-sm md:text-base font-semibold  transform ">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {user.displayName || "N/A"}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email || "N/A"}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> {user.address || "N/A"}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Gender:</strong> {user.gender || ""}</p>
                  
                  
    <div className={`flex h-full w-full justify-between items-center gap-1 -mb-12  pt-4 ${isEditing ? "-mb-0  pt-0" : "-mb-12  pt-4"}`}>

  <button
    onClick={handleLogout}
    className="bg-red-600    dark:hover:bg-red-700 text-white px-4 md:py-2 py-3 w-1/2 border-[0.4px] rounded-xl hover:bg-red-500 transition-all duration-700 text-sm md:text-base font-semibold  transform "
  >
    Log Out
  </button>

 
  <button
    onClick={handleEdit}
    className=" text-gray-700 border-[0.4px] border-gray-300 dark:text-gray-200 px-4 md:py-2 py-3 rounded-xl w-1/2 hover:bg-gray-200  dark:hover:bg-gray-900 transition-all duration-700 text-sm md:text-base font-semibold  transform "
  >
    Edit Profile
  </button>
</div>

                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">User not found.</p>
      )}
      
      <div className="alert text-lg font-light">
        {alert && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
      </div>
    </div>
  );
}

export default UserProfile;

