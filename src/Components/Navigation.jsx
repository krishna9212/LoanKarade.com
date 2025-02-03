import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from './../assets/MainLogo.png';
import Signup from './Signup';

function Navigation() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // For modal visibility

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Google Sign In
 
  return (
    <nav className="h-[10%] w-full flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white transition-all duration-300 px-4 md:px-10 shadow-md">
      {/* Logo */}
      <div className="flex items-center h-full">
        <img src={logo} alt="LoanKarade" className="h-[60%] md:h-12 w-auto" />
      </div>

      {/* Actions: Theme Toggle & Signup */}
      <div className="flex items-center space-x-3 md:space-x-6 pt-2">
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="px-[8px] py-[9px] rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center"
        >
          {darkMode ? <FaSun className="text-yellow-500 text-lg" /> : <FaMoon className="text-gray-900 text-lg" />}
        </button>

        {/* Signup Button */}
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all text-sm md:text-base font-medium"
        >
          Sign Up
        </button>
      </div>

      {/* Modal for Signup / Sign-in */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50  backdrop-blur-xs z-10 pointer-events-auto">
          <div className="w-[95%] md:w-[60%] rounded-xl overflow-hidden  h-[70%] md:h-[76%] bg-white dark:bg-gray-800 shadow-lg  relative">
            <Signup></Signup>
            <button
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-6 text-gray-800 dark:text-white text-3xl font-semibold "
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
