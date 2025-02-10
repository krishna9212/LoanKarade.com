import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./Components/Navigation";
import Cursor from "./Components/Cursor";
import Home from "./Components/Home";
import LoanCategories from "./Components/LoanCatagories";
import PersonalLoan from "./Components/PersonalLoan";
import BusinessLoan from "./Components/BusinessLoan";
import CreditCard from "./Components/CreditCard";
import HomeLoan from "./Components/HomeLoan";
import LoanAgainstProperty from "./Components/LoanAgainstProperty";
import UsedCarLoan from "./Components/UsedCarLoan";
import NotFound from "./Components/NotFound"; // Create this component for 404 handling

function App() {
  return (
    <Router>
      <div className="h-screen w-full bg-gray-100 dark:bg-gray-900">
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan-categories" element={<LoanCategories />} />
          <Route path="/personal-loan" element={<PersonalLoan />} />
          <Route path="/business-loan" element={<BusinessLoan />} />
          <Route path="/credit-card" element={<CreditCard />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/loan-against-property" element={<LoanAgainstProperty />} />
          <Route path="/used-car-loan" element={<UsedCarLoan />} />
          <Route path="*" element={<NotFound />} /> {/* Handle unknown routes */}
        </Routes>

        <div className="cur hidden md:block">
          <Cursor />
        </div>
      </div>
    </Router>
  );
}

export default App;
