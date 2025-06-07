import React from 'react'
// import Navigation from './Navigation'
import bank from "/banner3.png"

function Page5() {
  return (
    <div className='w-full h-min-screen '>
            <div className=' flex  mt-16 md:mt-16 -mb-16 flex-row items-center bg-[#F8B708] dark:bg-gray-800 p-5 md:py-0 md:px-10'>
                <div className="flex  flex-col justify-center text-black dark:text-white w-full md:w-1/2 pb-8 md:mt- mb-1  ">
                    <h1 className='text-[1.4rem] md:text-[4.2rem] whitespace-nowrap oswald poppins-bold'>Find Your Best Deal!</h1> 
                    <h1 className='md:text-[1.6rem] text-[0.6rem] poppins-semibold'>
                    Find the <span className='text-[#7408f8d3] tracking-wide'>perfect loan</span> without any hassle.
                        </h1>
                        <p className='md:text-[1.1rem] text-[0.5rem] pt-1 md:pt-2 poppins-regular'>Our experts bring you the best deals, hassle-free.</p>
                        <div className='pt-3 md:pt-5 '>
                        <button 
                         onClick={() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className='border-black dark:border-white border hover:bg-[#f8a008] dark:hover:bg-gray-950 transition-all duration-700 text-[0.6rem] md:text-[0.9rem] text-black dark:text-white rounded-4xl p-[5px] px-3 md:p-5 md:px-6'>Start Finding Your Best Deal</button>
                       
                        </div>
                </div>
                <div className="w-full md:w-1/2 -mt-20   p-4 md:p-8 md:ml-20 md:-mr-24 flex justify-center md:justify-end items-center md:-mt-10 -mr-12">
                  <img src={bank} 
                  alt="CreditGuidance"
                  loading="lazy"
                  decoding="async" 
                  className='object-contain w-[100%]  md:mt-0 mt-12 -mb-5 md:-mb-0  md:w-auto  h-[265px] md:h-[550px]' />
                </div>

            </div>
           
    </div>
    
  )
}

export default Page5
