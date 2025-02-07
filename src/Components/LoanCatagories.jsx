import React from "react";
import { FaArrowRight } from "react-icons/fa"; // Importing arrow icon
import PersonalLoan from "./../assets/PersonalLoan.png";

function LoanCategories() {
  const categories = [
    { id: 1, name: "Personal Loan", icon: PersonalLoan, buttonName: "Check Eligibility" },
  ];

  return (
    <div className="h-screen w-full p-5 bg-red-100 dark:bg-gray-900 overflow-hidden flex flex-col">
      {/* Heading */}
      <div className="flex flex-col w-full">
        <div className="heading flex md:w-[20%] w-[25%] items-center gap-2 text-[#0290D0] poppins-semibold">
          Loans
          <div className="line h-[1px] flex-grow bg-[#0290D0]"></div>
        </div>

        {/* Loan Category Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full mt-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group loan-box w-full bg-white rounded-xl shadow-lg flex flex-col justify-between items-center p-1 md:p-4 text-gray-800 transition-all duration-500 ease-in-out hover:shadow-xl"
            >
              {/* Top Section */}
              <div className="flex w-full flex-col-reverse md:flex-row items-center justify-center gap-1 md:gap-2">
                <h2 className="text-[0.8rem] md:text-[1rem] poppins-regular">{category.name}</h2>
                <img src={category.icon} alt={category.name} className="h-9 md:h-10 md:-mt-1 object-cover" />
              </div>

              {/* Bottom Section */}
              <p className="hidden md:flex text-[0.7rem] text-gray-600 text-center mt-2 px-2">
                Select the best offer curated just for you from a wide choice of Banks & NBFCs.
              </p>

              {/* Check Eligibility Button */}
              <button className="text-[#0198D6]  poppins-light  loan-button   hidden md:flex items-center justify-start text-[0.5rem] md:text-[0.7rem] font-medium rounded-lg mt-2 gap-1  transition-all duration-500 ease-in-out opacity-60  group-hover:opacity-100">
                {category.buttonName}
                <FaArrowRight className="text-[#0198D6] text-[0.7rem]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoanCategories;
