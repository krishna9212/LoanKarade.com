import React from 'react'
// import Navigation from './Navigation'
import bank from "./../assets/Contact us-cuate.png"

function Page5() {
  return (
    <div className=' h-min-full w-full '>
            <div className=' h-min-[100%]  mt-20 md:-mt-0 md:-mb-10  md:pt-0  p-5 w-full bg-blue-50 dark:bg-gray-800 items-center flex md:flex-row'>
                <div className="left h-min-full md:mb-10 md:-mt-10 md:h-full w-[62%]  md:w-[50%] flex flex-col   md:p-10 md:pt-40  justify-center  text-black dark:text-white">
                    <h1 className='text-[1rem] md:text-[3.3rem] whitespace-nowrap poppins-bold '>Find Your Best Deal!</h1> 
                    <h1 className='md:text-[1.4rem] text-[0.7rem]  whitespace-wrap poppins-medium  '>
                    Find the <span className='text-[#58b700] tracking-wide '>perfect loan</span> without any hassle.
                        </h1>
                        <p className='md:text-[1rem] text-[0.6rem] pt-1 md:pt-2 w-full whitespace-wrap poppins-regular'>Our experts bring you the best deals, hassle-free.</p>
                        <div className='w-full pt-0 md:pt-5  '>
                        <button className='border-black border-[0.1px] hover:bg-gray-200 transition-all duration-700 text-[0.6rem] md:text-[0.9rem] text-black dark:text-white dark:border-white dark:hover:bg-gray-950 rounded-4xl p-[5px] px-3  mt-3 -ml-[2px] md:mt-0  md:-ml-0 md:p-5 md:px-6 cursor-pointer'>Start Finding Your Best Deal</button>
                        </div>
                </div>
                <div className="right h-full   md:p-5 flex-col md:flex-row   md:-mb-41  md:-mt-10 md:h-full  w-[40%] md:w-[50%]   md:pt-25 flex items-center justify-center">
                  <img src={bank} 
                  alt="CreditGuidance"
                  loading="lazy"
                  decoding="async" 
                  className='mt-2 h-min-[180px] md:w-auto h-[170px] md:h-auto w-[100%] object-contain ' />
                  <div className="blank h-10 bg-blue-100 w-full md:hidden -mt-10 dark:bg-gray-800  "></div>
                </div>

            </div>
           
    </div>
    
  )
}

export default Page5
