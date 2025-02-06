import React from "react";
import "./App.css";
import Landingpage from "./Components/Landingpage";
import Navigation from "./Components/Navigation";
import Cursor from "./Components/Cursor";

function App() {
  return (
    <div className="h-screen w-screen">
            <Navigation></Navigation>

      <Landingpage />
      <Cursor />
    </div>
  );
}

export default App;
