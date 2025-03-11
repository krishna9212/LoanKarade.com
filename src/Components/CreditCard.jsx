import React from "react";
import MultiStepForm from "./Form4";
import { FaCheck } from "react-icons/fa";  // FontAwesome
import svg from "./../assets/Credit assesment-bro.png"
const CreditCard = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row  items-center justify-center">
      <div className="pcLEFT w-full hidden md:flex  bg-blue-200 dark:bg-gray-800 text-black dark:text-white justify-center overflow-hidden md:w-1/2 md:h-full items-center  ">
                 <div className="banner md:h-[70%] flex flex-col ">
                   <h1 className="poppins-semibold text-2xl">Credit Card</h1>
                   <div className="div flex w-full h-full flex-col   gap-3   mt-3">
           
                   {
                     ["Compare & Choose the Best Offer", "Check Loan Amount Eligibility", "Know your Approval Chances"].map((item) => (
                       <span className="flex  gap-2  items-center justify-start ">
                         <FaCheck className="text-[#018FCF] text-[1rem] " /> 
                         <p key={item} className="text-black dark:text-gray-200">{item}</p>
                         </span>
                     ))
           }
           <img src={svg} alt="" className="h-[100%]  hidden md:block -ml-8  w-auto  object-cover object-center" />
                     </div>
           
                 </div>
                 </div>
                 <div className="phoneLEFT w-full md:hidden flex mt-20  bg-blue-200 dark:bg-gray-800 text-black dark:text-white justify-center overflow-hidden  items-center  p-5  ">
                 <div className="banner md:h-[70%] flex flex-col ">
                   <h1 className="poppins-semibold text-[1.1rem]  whitespace-nowrap">Credit Card</h1>
                   {
                     ["Compare & Choose the Best Offer", "Check Loan Amount Eligibility", "Know your Approval Chances"].map((item) => (
                       <span className="flex  gap-2  items-center justify-start ">
                         <FaCheck className="text-[#018FCF] text-[1rem] " /> 
                         <p key={item} className="text-black dark:text-gray-200 text-[0.7rem] whitespace-nowrap ">{item}</p>
                         </span>
                     ))
           }
                 </div>
                   <div className="div flex w-full h-full flex-col   gap-3   ">
           
                   
           <img src={svg} alt="" className="h-[100%] block    w-auto  object-cover object-center" />
                     </div>
           
                 </div>
      <div className="RIGHT w-full overflow-x-hidden h-[100%] md:w-1/2 md:h-full flex items-start   md:items-center justify-center "><MultiStepForm></MultiStepForm></div>
    </div>
  );
};

export default CreditCard; // ✅ Ensure this default export is present
