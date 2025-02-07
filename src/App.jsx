import React from "react";
import "./App.css";
import Navigation from "./Components/Navigation";
import Cursor from "./Components/Cursor";
import SliderBanner from "./Components/SliderBanner";
import Page1 from "./Components/Landingpage";
import Page2 from "./Components/LandingPage2";
import Page3 from "./Components/LandingPage3";
import Page4 from "./Components/LandingPage4";
import LoanCatagories from "./Components/LoanCatagories";
function App() {
  return (<
    div className="h-screen w-full bg-gray-100 dark:bg-gray-900">

            <Navigation></Navigation>
            
      <SliderBanner autoPlay={true} interval={4000}>
      <Page1></Page1>
      <Page2></Page2>
     
      </SliderBanner>
      <LoanCatagories></LoanCatagories>
      
      <div className="cur hidden md:block">
      <Cursor />
      </div>
    </div>
  );
}

export default App;
