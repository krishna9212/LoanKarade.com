import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from './../assets/MainLogo.png';

function Navigation() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="h-[12%] w-full flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white transition-all duration-300 px-3 md:px-8 pt-3 ">
      
      {/* Left: Logo */}
      <div className="flex h-full items-center  w-1/2">
        <img src={logo} alt="LoanKarade" className="h-[75%] md:h-[90%] w-auto" />
      </div>

      {/* Right: Signup & Theme Toggle */}
      <div className="flex items-center space-x-4">
        
          {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="rounded-md px-2 py-[8px] md:py-[10px] bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          {darkMode ? <FaSun className="text-yellow-500 text-lg" /> : <FaMoon className="text-gray-900 text-lg" />}
        </button>
        {/* Signup Button */}
        <button className="bg-blue-600 text-white px-5 py-[6px] md:py-2 rounded-md hover:bg-blue-700 transition-all">
          Sign Up
        </button>

      </div>

    </nav>
  );
}

export default Navigation;
