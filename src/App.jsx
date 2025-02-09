import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Cursor from "./Components/Cursor";
import Home from "./Components/Home";
import LoanCategories from "./Components/LoanCatagories";
import PersonalLoan from "./Components/PersonalLoan";
function App() {
  return (
    // <testEmail/>
    <Router>
       <div className="h-screen w-full bg-gray-100 dark:bg-gray-900">
      <Navigation />

         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/loan-categories" element={<LoanCategories />} />
           <Route path="/personal-loan" element={<PersonalLoan />} />
         </Routes>

         <div className="cur hidden md:block">
         <Cursor />
         </div>
       </div>
     </Router>
  );
}

export default App;
