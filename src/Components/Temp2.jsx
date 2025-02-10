import React, { useState, useEffect, useRef } from "react";
import { indianStates } from "./State"; // Import states list

const StateSelector = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    if (savedUser.state) {
      setInputValue(savedUser.state);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0) {
      const filtered = indianStates.filter((state) =>
        state.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowDropdown(true);
    } else {
      setFilteredStates([]);
      setShowDropdown(false);
    }
  };

  const handleSelectState = (state) => {
    setInputValue(state);
    localStorage.setItem("user", JSON.stringify({ state })); // Update localStorage immediately
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full mb-4 rounded text-gray-700 dark:text-gray-200" ref={dropdownRef}>
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search States..."
        className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:text-white 
        border-gray-700 dark:border-gray-200 focus:outline-none focus:ring-2 
        focus:ring-blue-500 dark:focus:ring-blue-400"
      />

      {/* Dropdown List */}
      {showDropdown && (
        <ul className="absolute w-full bg-white dark:bg-gray-900 rounded mt-1 
        max-h-40 overflow-y-auto z-10 border border-gray-200 dark:border-gray-700 shadow-lg">
          {filteredStates.length > 0 ? (
            filteredStates.map((state, index) => (
              <li
                key={index}
                onClick={() => handleSelectState(state)}
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {state}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500 dark:text-gray-400">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default StateSelector;
