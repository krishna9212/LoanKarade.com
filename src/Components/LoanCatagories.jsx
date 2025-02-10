import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PersonalLoan from "./../assets/PersonalLoan.png";
import MicroLoan from "./../assets/MicroLoan.png";
import LoanImg from "./../assets/Loann.png";
import LoanImg2 from "./../assets/Loan2.png";
import LoanImg3 from "./../assets/Loan3.png";
import LoanImg4 from "./../assets/Home Loan.png";

function LoanCategories() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const AlertMessage = ({ message, type = "error", duration = 5000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
      <div
        className={`fixed top-18 right-2 px-6 py-2 rounded-lg text-white shadow-lg z-50 w-[80%] md:w-[25%] text-center 
          ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        {message}
      </div>
    );
  };

  const handleNavigation = (route) => {
    const isUserLoggedIn = localStorage.getItem("user");

    if (!isUserLoggedIn) {
      setErrorMessage("Please login to proceed further.");
      return;
    }

    setLoading(true); // Show spinner

    setTimeout(() => {
      navigate(route);
      setLoading(false); // Hide spinner after navigation
    }, 1000); // 1.5-second delay for a smooth effect
  };

  const categories = [
    { id: 1, name: "Personal Loan", icon: PersonalLoan, summary: "Select the best offer curated just for you from a wide choice of Banks & NBFCs.", buttonName: "Check Eligibility", route: "/personal-loan" },
    { id: 2, name: "Business Loan", icon: LoanImg3, summary: "Expand your business with loans at low interest rates.", buttonName: "Check Eligibility", route: "/business-loan"},
    { id: 3, name: "Credit Card", icon: MicroLoan, summary: "Instant small ticket loans to meet your immediate cash needs", buttonName: "Get Instant Loan", route: "/Credit-Card" },
    { id: 4, name: "Home Loan", icon: LoanImg4, summary: "Choose from lowest interest rates available for your dream home", buttonName: "Check Eligibility", route: "/home-loan" },
    { id: 5, name: "Loan Against Property", icon: LoanImg, summary: "Get loan against your gold at best interest rates with our doorstep service", buttonName: "Know More", route: "/Loan-Against-Property" },
    { id: 6, name: "Used Car Loan", icon: LoanImg2, summary: "Get best loan offer against your mutual fund portfolio", buttonName: "Apply Now", route: "/Used-Car-Loan" },
  ];

  return (
    <div className="h-screen w-full p-5 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
      {errorMessage && <AlertMessage message={errorMessage} onClose={() => setErrorMessage("")} />}
      
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-40 z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      )}

      {/* Heading */}
      <div className="flex flex-col w-full">
        <div className="heading flex md:w-[12%] text-[0.8rem] md:text-[1rem] w-[25%] items-center gap-2 text-[#0290D0] poppins-bold">
          Loans
          <div className="line h-[0.725px] md:h-[0.625px] flex-grow bg-[#0290D0]"></div>
        </div>

        {/* Loan Category Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 w-full mt-6 bg-white dark:bg-gray-900">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-gray-50 md:bg-[#fbfafa] dark:bg-gray-800 loan-box w-min-full rounded-xl shadow-md flex flex-col justify-between items-center p-1 md:p-4 text-gray-800 dark:text-gray-100 transition-all duration-500 ease-in-out hover:shadow-xl cursor-pointer"
              onClick={() => handleNavigation(category.route)}
            >
              {/* Top Section */}
              <div className="flex w-full flex-col-reverse md:flex-row items-center justify-center gap-1 md:gap-3">
                <h2 className="text-[0.65rem] w-[65%] md:w-[40%] text-center md:text-[0.8rem] poppins-medium">{category.name}</h2>
                <img src={category.icon} alt={category.name} className="h-8 md:h-8 md:-mt-1 object-cover" />
              </div>

              {/* Bottom Section */}
              <p className="hidden md:flex text-[0.7rem] text-gray-400 text-center mt-1 px-2">{category.summary}</p>

              {/* Check Eligibility Button */}
              <button className="text-[#0198D6] poppins-light loan-button hidden md:flex items-center justify-start text-[0.5rem] md:text-[0.7rem] font-medium rounded-lg mt-2 gap-1 transition-all duration-500 ease-in-out opacity-60 group-hover:opacity-100">
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
