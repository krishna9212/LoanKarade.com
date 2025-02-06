import React from 'react'
import bank from "./../assets/pic1.png"

function Page3() {
  return (
    <div className=' h-full w-full '>
            <div className=' h-[100%]  md:-mt-0 md:-mb-10  md:pt-0  p-5 w-[full] bg-blue-100 dark:bg-gray-800  flex flex-col-reverse md:flex-row'>
                <div className="left h-1/2 -mt-0 md:-mt-[0rem] md:h-full    md:w-[50%] flex flex-col  p-0 md:p-10 md:pt-50  justify-center  text-black dark:text-white">
                    <h1 className='text-[3.7rem] md:text-[4.2rem] whitespace-nowrap poppins-semibold '>Need a Loan?</h1> 
                    <h1 className='md:text-[1.6rem] text-[1.4rem] whitespace-wrap poppins-light'>
                        Trust <span className='text-[#018FCF] tracking-wide '>LoanKarade</span> for Safe & Instant Approvals!
                        </h1>
                        <p className='md:text-[1.1rem] text-[1rem] pt-2 w-full whitespace-wrap poppins-extralight'>LoanKarade ensures safe, transparent, and instant loan approvals with the best interest rates.</p>
                        <div className='w-full pt-0 md:pt-5  '>
                        <button className='border-black border-[0.1px] hover:bg-gray-200 transition-all duration-700 text-md text-black dark:text-white dark:border-white dark:hover:bg-gray-950 rounded-4xl mt-5 -ml-2 md:-ml-0 p-5 px-6 cursor-pointer'>Get Started</button>
                        </div>
                </div>
                <div className="right -mb-20 mt-10 md:-mt-5 md:h-full w-full md:w-[50%]   md:pt-20 flex items-center justify-center">
                  <img src={bank} alt="" className='w-full md:w-auto h-auto md:h-full' />
                </div>

            </div>
           
    </div>
    
  )
}

export default Page3