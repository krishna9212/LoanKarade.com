import React from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate
import bank from '/banner2.png';

function Page4() {
  const navigate = useNavigate(); // Step 2: Initialize the hook

  const handleNavigation = () => {
    navigate('/Credit-Card'); // Step 3: Navigate to /credit
  };

  return (
    <div className="w-full h-min-screen">
      <div className="flex mt-16 -mb-16 flex-row items-center bg-[#AEF1FE] dark:bg-gray-800 p-5 md:py-0 md:px-10">
        
        {/* Left Section */}
        <div className="flex flex-col justify-center text-black dark:text-white w-full md:w-1/2 pb-8 md:-mt-8 mt-1">
          <h1 className="text-[1.4rem] md:text-[4.2rem] whitespace-nowrap poppins-bold">
            New to Credit?
          </h1>
          <h2 className="md:text-[1.6rem] text-[0.6rem] poppins-semibold">
            Free <span className="text-[#018FCF] tracking-wide">Guidance</span> to Improve Your Score!
          </h2>
          <p className="md:text-[1.1rem] text-[0.5rem] pt-1 md:pt-2 poppins-regular">
            Free expert guidance to grow your credit score and opportunities.
          </p>
          <div className="pt-3 md:pt-5">
            <button
              onClick={handleNavigation}
              className="border-black dark:border-white border hover:bg-[#7bccff] dark:hover:bg-gray-950 transition-all duration-700 text-[0.6rem] md:text-[0.9rem] text-black dark:text-white rounded-4xl p-[5px] px-3 md:p-5 md:px-6"
            >
              Get Started for Free
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 -mt-8 ml-5 flex justify-center items-center md:mt-0">
          <img
            src={bank}
            alt="Credit Guidance"
            loading="lazy"
            decoding="async"
            className="object-contain w-[88%] mt-[20px] md:w-auto h-[250px] md:h-[550px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Page4;
