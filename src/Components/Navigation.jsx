import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "./../assets/MainLogo.png";
import logo2 from "./../assets/Logo2.png";
import Signup from "./Signup";
import AlertMessage from "./Alert";
import UserProfile from "./UserProfile";

function Navigation() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" ||
          (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [ShowUser, setShowUser] = useState(false);

  // Apply theme preference on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Check for stored user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <nav className="h-[9%] md:h-[10%] fixed z-50 w-full flex items-center justify-between bg-white dark:bg-[#000000] dark:text-white transition-all duration-300 px-4 md:px-10 shadow-md">
        {/* Logo */}
        <div className="flex items-center h-full">
        {darkMode ? 
        <img
            src={logo2} // Switch logo based on dark mode
            alt="LoanKarade"
            className="h-[60%]  md:h-12 w-auto transition-all duration-300"/> 
            : 
          <img
          src={logo}// Switch logo based on dark mode
          alt="LoanKarade"
          className="h-[60%] md:h-12 w-auto transition-all duration-300"
        />}
          
        </div>

        {/* Actions: Theme Toggle & Sign Up / Log Out */}
        <div className="flex items-center space-x-3 md:space-x-6 pt-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-[9px] py-[11.3px] rounded-md transition-all duration-1000 border-[0.4px] border-gray-400 dark:bg-gray-900 dark:hover:bg-transparent hover:bg-gray-200 flex items-center justify-center"
          >
            {darkMode ? (
              <FaSun className="text-gray-200 text-lg" />
            ) : (
              <FaMoon className="text-gray-900 text-lg" />
            )}
          </button>

          {/* Conditionally render Sign Up / User Profile */}
          {!user ? (
            <button
              onClick={() => setShowModal(true)}
              className="border-blue-600 border-[0.2px] duration-700 text-gray-800 dark:text-gray-200 px-4 py-[9px] md:py-[7.5px] rounded-md hover:bg-blue-600 hover:text-gray-200 transition-all text-sm md:text-base font-medium"
            >
              Sign Up
            </button>
          ) : (
            <button
              className="px-[11px] py-[12px] rounded-md transition-all duration-1000 border-[0.4px] border-gray-400 dark:bg-gray-900 dark:hover:bg-transparent hover:bg-gray-200 flex items-center justify-center"
              onClick={() => setShowUser(true)}
            >
              <i className="fa-solid fa-user"></i>
            </button>
          )}
        </div>
      </nav>

      {/* User Profile Modal */}
      {ShowUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-10 pointer-events-auto">
          <div className="w-min-[95%] md:w-min-[60%] rounded-xl overflow-hidden h-[55%] md:h-[65%] bg-gray-200 dark:bg-gray-800 relative">
            <UserProfile />
            <button
              onClick={() => setShowUser(false)}
              className="absolute top-4 right-6 text-gray-800 dark:text-white text-3xl font-semibold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-10 pointer-events-auto">
          <div className="w-[95%] md:w-[60%] rounded-xl overflow-hidden h-[50%] md:h-[76%] bg-white dark:bg-gray-800 shadow-lg relative">
            <Signup />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-gray-800 dark:text-white text-3xl font-semibold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Alert Message */}
      {alert && (
        <div className="alert text-lg font-light">
          <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}
    </>
  );
}

export default Navigation;
