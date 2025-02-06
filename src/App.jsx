import React from "react";
import "./App.css";
import Landingpage from "./Components/Landingpage";
import Navigation from "./Components/Navigation";
import Cursor from "./Components/Cursor";
import SliderBanner from "./Components/SliderBanner";

function App() {
  return (
    <div className="h-screen w-screen bg-gray-100  dark:bg-gray-900">


            <Navigation></Navigation>
            
      <SliderBanner autoPlay={true} interval={4000}>
      <Landingpage />

      <div className="screen2 bg-red-400 h-screen w-screen"></div>
      <div className="screen2 bg-yellow-400 h-screen w-screen"></div>
      </SliderBanner>
      <Cursor />
    </div>
  );
}

export default App;
