import React from "react";
import SliderBanner from "./SliderBanner";
import Page1 from "./Landingpage";
import Page2 from "./LandingPage2";
import Page3 from "./LandingPage3";
import Page4 from "./LandingPage4";
import Page5 from "./LandingPage5";
import LoanCategories from "./LoanCatagories";
import About from "./AboutUs";

const Home = () => {
  const pages = [<Page1 />, <Page2 />, <Page3 />, <Page4 />, <Page5 />];

  return (
    <div className="">
      {/* Slider Banner */}
      <SliderBanner autoPlay={true} interval={4000}>
        {pages}
      </SliderBanner>

      {/* Loan Categories */}
      <LoanCategories />

      {/* About Section */}
      <About />
    </div>
  );
};

export default Home;
