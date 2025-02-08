import React from "react";
import MultiStepForm from "./Form";

const PersonalLoan = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row items-center justify-center">
      <div className="LEFT w-full hidden md:flex bg-amber-300 md:w-1/2 md:h-full "></div>
      <div className="RIGHT w-full h-[100%] md:w-1/2 md:h-full flex items-start bg-amber-100 md:items-center justify-center "><MultiStepForm></MultiStepForm></div>
    </div>
  );
};

export default PersonalLoan; // ✅ Ensure this default export is present
