import React from "react";
import MultiStepForm from "./Form";
import { FaCheck } from "react-icons/fa";  // FontAwesome
import svg from "./../assets/Banknote-rafiki.png"
const CreditCard = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center">
      <div className="LEFT w-full hidden md:flex bg-blue-100 dark:bg-gray-800 text-black dark:text-white justify-center overflow-hidden md:w-1/2 md:h-full items-center p-10  ">
      <div className="banner h-[70%] flex flex-col ">
        <h1 className="poppins-semibold text-2xl">Business Loan</h1>
        <div className="div flex w-full h-full flex-col   gap-3   mt-3">

        {
          ["Compare & Choose the Best Offer", "Check Loan Amount Eligibility", "Know your Approval Chances"].map((item) => (
            <span className="flex  gap-2  items-center justify-start ">
              <FaCheck className="text-[#018FCF] text-[1rem] " /> 
              <p key={item} className="text-black dark:text-gray-200">{item}</p>
              </span>
          ))
}
<img src={svg} alt="" className="h-[100%] -ml-8 -mt-5 w-auto  object-cover object-center" />
          </div>

      </div>
      </div>
      <div className="RIGHT w-full overflow-hidden h-[100%] md:w-1/2 md:h-full flex items-start   md:items-center justify-center overflow-x-hidden "><MultiStepForm></MultiStepForm></div>
    </div>
  );
};

export default CreditCard; 