import React from "react";
import { FaUser, FaHome, FaCar, FaGraduationCap, FaBriefcase } from "react-icons/fa";

function LoanCategories() {
  const categories = [
    { id: 1, name: "Personal Loan", icon: <FaUser />, color: "bg-blue-500" },
    { id: 2, name: "Home Loan", icon: <FaHome />, color: "bg-green-500" },
    { id: 3, name: "Car Loan", icon: <FaCar />, color: "bg-red-500" },
    { id: 4, name: "Education Loan", icon: <FaGraduationCap />, color: "bg-purple-500" },
    { id: 5, name: "Business Loan", icon: <FaBriefcase />, color: "bg-yellow-500" },
  ];

  return (
  <div className="h-screen w-full p-5 bg-red-100 dark:bg-gray-900 overflow-hidden">
      {/* Heading */}
      

      {/* Loan Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[90%] mx-auto">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-6 rounded-xl shadow-md flex flex-col items-center text-white ${category.color} hover:scale-105 transition-all duration-300`}
          >
            <div className="text-4xl">{category.icon}</div>
            <h2 className="mt-3 text-xl font-medium">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoanCategories;
