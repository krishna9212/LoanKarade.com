import React from 'react'
import SliderBanner from "./SliderBanner";
import Page1 from "./Landingpage";
import Page2 from "./LandingPage2";
import LoanCatagories from "./LoanCatagories"

function Home() {
  return (
    
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900">
    <SliderBanner autoPlay={true} interval={4000}>
      <Page1></Page1>
      <Page2></Page2>
     
      </SliderBanner>
      <LoanCatagories></LoanCatagories>
      </div>
  )
}

export default Home