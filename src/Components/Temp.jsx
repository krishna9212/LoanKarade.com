import React, { useState, useEffect } from "react";
import { cities } from "./City"; // Import cities list

const CitySelector = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {}; // Ensure an object
    return storedUser;
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city) => {
    setInputValue(city);
    setShowDropdown(false);

    const updatedUser = { ...user, city }; // Merge existing user data
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update only city, keeping other fields
  };

  return (
    <div className="relative w-full mb-4 rounded text-gray-700 dark:text-gray-200">
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search city..."
        className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:text-white 
        border-gray-700 dark:border-gray-200 focus:outline-none focus:ring-2 
        focus:ring-blue-500 dark:focus:ring-blue-400"
      />

      {/* Dropdown List */}
      {showDropdown && (
        <ul className="absolute w-full bg-white dark:bg-gray-900 rounded mt-1 
        max-h-40 overflow-y-auto z-10 border border-gray-200 dark:border-gray-700 shadow-lg">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city)}
                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {city}
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

export default CitySelector;
