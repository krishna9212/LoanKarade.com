import React from 'react'
import bank from "./../assets/Money stress-bro.png"
function Page2() {
  return (
    <div className=' h-min-full w-full '>
            <div className=' h-min-[100%]  mt-20 md:-mt-0 md:-mb-10  md:pt-0  p-5 w-full bg-green-100 dark:bg-gray-800 items-center flex md:flex-row'>
                <div className="left h-min-full z-0 -mb-5    p-1 md:mb-10  md:-mt-10 md:h-full w-[72%]  md:w-[50%]     flex flex-col   md:p-10 md:pt-50  justify-center  text-black dark:text-white">
                    <h1 className='text-[1.4rem] md:text-[4.2rem] whitespace-nowrap poppins-bold '>Personal Loans</h1> 
                    <h1 className='md:text-[1.6rem] text-[0.6rem]  whitespace-wrap poppins-semibold  md:-mt-2'>
                    Made <span className='text-[#018FCF] tracking-wide '>Easy</span> – Fast, Secure & Affordable!
                        </h1>
                        <p className='md:text-[1.1rem] text-[0.5rem] pt-1 md:pt-2 w-full whitespace-wrap poppins-regular'>Fast approvals, minimal paperwork, and flexible repayment plans. Get your personal loan hassle-free today!</p>
                        <div className='w-full pt-0 md:pt-5  '>
                        <button className='border-black border-[0.1px] hover:bg-gray-200 transition-all duration-700 text-[0.6rem] md:text-[0.9rem] text-black dark:text-white dark:border-white dark:hover:bg-gray-950 rounded-4xl p-[5px] px-3  mt-3 -ml-[2px] md:mt-0  md:-ml-0 md:p-5 md:px-6 cursor-pointer'>Get Started</button>
                        </div>
                </div>
                <div className="right h-full z-10 md:p-20 md:-mb-30  md:-mt-10 md:h-full  w-[47.7%] md:w-[50%]   md:pt-25 flex items-center justify-center">
                  <img src={bank}
                  alt="PersonalLoans"
                  loading="lazy"
                  decoding="async" 
                  className='w-auto mt-2 object-cover h-[170px] h-min-[180px] md:h-full ' />
                </div>

            </div>
           
    </div>
    
  )
}

export default Page2