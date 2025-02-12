import React from "react";
import SliderBanner from "./SliderBanner";
import Page1 from "./Landingpage";
import Page2 from "./LandingPage2";
import Page3 from "./LandingPage3";
import Page4 from "./LandingPage4";
import LoanCategories from "./LoanCatagories"; // Fixed the spelling for consistency

const Home = () => {
  const pages = [<Page1 />, <Page2 />, <Page3 />, <Page4 />];

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900">
      <SliderBanner autoPlay={true} interval={4000}>
        {pages}
      </SliderBanner>
      <LoanCategories />
    </div>
  );
};

export default Home;
