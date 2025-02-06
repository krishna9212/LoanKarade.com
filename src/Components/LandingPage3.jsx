import React from "react";
import bank from "./../assets/Money stress-bro.png";

function Page3() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-6 py-10 md:py-16">
      
      {/* Image at the top for Mobile */}
      <div className="w-full flex justify-center mb-8 md:order-2 md:mb-0">
        <img src={bank} alt="Loan Illustration" className="w-3/4 max-w-xs md:w-[60%]" />
      </div>

      {/* Text Content */}
      <div className="w-full text-center md:w-3/4 md:text-left space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          Personal Loans
        </h1>
        <h2 className="text-xl text-gray-700 dark:text-gray-300">
          Made <span className="text-blue-500 font-semibold">Easy</span> – Fast, Secure & Affordable!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          Fast approvals, minimal paperwork, and flexible repayment plans. Get your personal loan hassle-free today!
        </p>

        <div className="flex justify-center md:justify-start">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-md dark:bg-blue-500 dark:hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page3;
