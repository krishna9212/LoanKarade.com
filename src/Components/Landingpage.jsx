import React from 'react'
import Navigation from './Navigation'
import bank from "./../assets/bank.png"

function Landingpage() {
  return (
    <div className=' h-full w-full '>
            <div className=' md:h-[100%] pt-20 md:pt-0 w-[full] bg-white flex flex-col-reverse md:flex-row'>
                <div className="left -mt-[2.5rem] md:-mt-[0rem] md:h-full  md:w-[45%] flex flex-col px-4 p-0 md:p-10 md:pt-40  justify-center  text-black">
                    <h1 className='text-[3.7rem] md:text-[4.2rem] whitespace-nowrap poppins-semibold '>Need a Loan?</h1> 
                    <h1 className='md:text-[1.6rem] text-[1.4rem] whitespace-wrap poppins-light'>
                        Trust <span className='text-[#018FCF] tracking-wide '>LoanKarade</span> for Safe & Instant Approvals!
                        </h1>
                        <p className='md:text-[1.1rem] text-[1rem] pt-2 w-full whitespace-wrap poppins-extralight'>LoanKarade ensures safe, transparent, and instant loan approvals with the best interest rates.</p>
                        <div className='w-full pt-0 md:pt-5  '>
                        <button className='border-black border-[0.1px] hover:bg-gray-100 transition-all duration-700 text-md text-black rounded-4xl mt-5 -ml-2 md:-ml-0 p-5 px-6 cursor-pointer'>Get Started</button>
                        </div>
                </div>
                <div className="right md:h-full   w-full md:w-[55%]  md:pt-0 flex items-center justify-center">
                  <img src={bank} alt="" className='w-full md:w-auto h-auto md:h-full' />
                </div>

            </div>
           
    </div>
    
  )
}

export default Landingpage