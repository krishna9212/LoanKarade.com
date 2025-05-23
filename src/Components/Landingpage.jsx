import React from 'react';
import bank from '/banner1.png';

function Page1() {
  return (
    <div className="w-full  h-min-screen">
      <div className="flex  mt-16 -mb-16 flex-row items-center bg-[#c4f9e8] dark:bg-gray-800 p-5 md:py-0 md:px-10">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center text-black dark:text-white w-full md:w-1/2 pb-8 ">
          <h1 className="text-[1.4rem] md:text-[4.2rem] whitespace-nowrap poppins-bold">
            Need a Loan?
          </h1>
          <h1 className="md:text-[1.6rem] text-[0.6rem] poppins-semibold">
            Trust{' '}
            <span className="text-[#0020ae] tracking-wide">
              LoanKarade
            </span>{' '}
            for Safe & Instant Approvals!
          </h1>
          <p className="md:text-[1.1rem] text-[0.5rem] pt-1 md:pt-2 poppins-regular">
            Secure, transparent, and instant loan approvals.
          </p>
          <div className="pt-3 md:pt-5">
<button
  onClick={() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="border-black dark:border-white border hover:bg-[#91fbd9] dark:hover:bg-gray-950 transition-all duration-700 text-[0.6rem] md:text-[0.9rem] text-black dark:text-white rounded-4xl p-[5px] px-3 md:p-5 md:px-6"
>
  Get Started
</button>
  
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center md:mt-0">
          <img
            src={bank}
            alt="Loans"
            loading="lazy"
            decoding="async"
            className="object-contain h-[250px] md:h-[550px] w-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Page1;
