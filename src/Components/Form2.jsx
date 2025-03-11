import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CitySelector from "./Temp";
import StateSelector from "./Temp2";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: storedData.name || "",
    email: storedData.email || "",
    phone: storedData.phone || "",
    address: storedData.address || "",
    city: storedData.city || "",
    state: storedData.state || "",
    gender: storedData.gender || "",
    employmentType: storedData.employmentType || "",
    salary: storedData.salary || "",
    grossIncome: storedData.grossIncome || "",
    loanAmount: storedData.loanAmount || "",
    businessName: storedData.businessName || "",
    CatagoryOfBusiness: storedData.CatagoryOfBusiness || "",
    TotalEmiYouPayPerMonth: storedData.TotalEmiYouPayPerMonth || "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" && value !== "" ? Number(value) : value.trim();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
  
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("❌ Please fill required fields.");
      return;
    }
  
    let emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "N/A",
      address: formData.address || "N/A",
      city: formData.city || "N/A",
      state: formData.state || "N/A",
      gender: formData.gender || "N/A",
      grossIncome: formData.grossIncome || "N/A",
      loanAmount: formData.loanAmount || "N/A",
      TotalEmiYouPayPerMonth: formData.TotalEmiYouPayPerMonth || "N/A",
    };
  
    let templateID = "";
  
      emailData.businessName = formData.businessName || "N/A";
      emailData.CatagoryOfBusiness = formData.CatagoryOfBusiness || "N/A";
      templateID = "template_0f3x0wf";  
  
    emailjs
      .send("service_0oddyfj", templateID, emailData, "pz6AHzoAuT68b19Ad")
      .then(
        (result) => {
          alert("✅ Email sent successfully!");
          console.log("✅ Email Sent:", result.text);
        },
        (error) => {
          alert("❌ Error sending email.");
          console.error("❌ Email Error:", error.text);
        }
      );

    setIsSubmitted(true)
  };
  const handleClose = () => {
    setIsSubmitted(false);
    navigate("/"); // Navigate back to home route
  };

  

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.gender.trim()  || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
        alert("❌ Please fill in all required fields.");
        return;
      }
    }
  
    if (step === 2 ) {
      if (!formData.businessName.trim() || !formData.CatagoryOfBusiness.trim() || formData.TotalEmiYouPayPerMonth === "") {
        alert("❌ Please fill in all required fields.");
        return;
      }
    }

    if (step === 3 && !formData.grossIncome) {
      alert("❌ Please select a gross annual income.");
      return;
    }

    if (step === 4 && !formData.loanAmount) {
      alert("❌ Please enter the loan amount.");
      return;
    }

    if (step === 5) {
      const updatedFormData = { ...formData };
      setFormData(updatedFormData);
      console.log("✅ Updated Form Data:", JSON.stringify(updatedFormData, null, 2));
    }

    if (step < 6) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center md:mt-7 justify-start bg-blue-100 dark:bg-gray-900 p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-md md:mt-10 mb-6">
        <div className="relative w-full bg-gray-300 h-[1px] rounded-full">
          <div
            className="absolute h-[1px] bg-blue-500 rounded-full transition-all"
            style={{ width: `${(step - 1) * 20}%` }}
          ></div>
        </div>
      </div>

      <form className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-xl md:w-[80%] w-full" onSubmit={()=>submit()}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Basic Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
              required 
              />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              minLength={10}
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
            />
            <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
                  >
                    <option value="other" className="dark:text-gray-100 dark:bg-gray-700 p-2">Other</option>
                    <option value="male" className="dark:text-gray-100 dark:bg-gray-700 p-2">Male</option>
                    <option value="female" className="dark:text-gray-100 dark:bg-gray-700 p-2">Female</option>
                  </select>
            <input
              type="text"
              name="address"
              placeholder="Adress"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
            />
            <StateSelector></StateSelector>
            <CitySelector></CitySelector>
            
            <button onClick={nextStep} className="w-full border-[0.2px] text-[1rem] border-blue-500 text-black dark:text-white py-2 rounded hover:bg-blue-700 transition-all duration-700">
              Next
            </button>
          </motion.div>
        )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <input
          type="text"
          name="businessName"
          placeholder="Business name"
          value={FormData.company}
          onChange={handleChange}
          className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
          required 
          />
          
        <input
          type="text"
          name="CatagoryOfBusiness"
          placeholder="Category of business"
          value={FormData.CatagoryOfBusiness}
          onChange={handleChange}
          className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
          required 
          />
          
          <input
          type="tel"
          name="TotalEmiYouPayPerMonth"
          placeholder="Share the emi ammount you're paying currently (eg. ₹1500) "
          value={FormData.TotalEmiYouPayPerMonth}
          onChange={handleChange}
          className="w-full p-3 mb-3  border border-gray-300 dark:border-gray-500 rounded focus:ring-1 text-gray-700 dark:text-gray-200 focus:ring-blue-300"
          required 
          />
          
       
        
        <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="dark:border-gray-500  border-[0.6px] border-gray-300  hover:text-white  dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600">
                Back
              </button>
              <button onClick={nextStep} className="dark:border-blue-500 border-blue-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600">
                Next
              </button>
            </div>
      </motion.div>
      )}
  {step === 3 && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Gross Annual Income</h2>
            {["Below ₹5 Lacs", "₹5 - ₹10 Lacs", "₹10 Lacs - ₹15 Lacs", "Above ₹15 Lacs"].map((income) => (
              <div key={income} className={`p-4 border dark:border-gray-500  border-gray-300  dark:text-white rounded cursor-pointer transition mt-2 ${formData.grossIncome === income ? "border-blue-500" : ""}`} onClick={() => setFormData({ ...formData, grossIncome: income })}>
                <input type="radio" name="grossIncome" 
                value={income} 
                checked={formData.grossIncome === income} 
                onChange={handleChange} 
                className="mr-2" 
                required
                />
                {income}
              </div>
            ))}
            <div className="flex justify-between mt-4">
            <button onClick={prevStep} className="dark:border-gray-500  border-gray-300 border-[0.6px] hover:text-white  dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600">
                Back
              </button>
              <button onClick={nextStep} className="dark:border-blue-500 border-blue-300  border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600">
                Next
              </button>
            </div>
          </motion.div>
        )}
        {/* Step 6: Desired Loan Amount */}
  {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Desired Loan Amount</h2>
              {[
                "Below ₹2 Lacs",
                "₹2 - ₹5 Lacs",
                "₹5 - ₹10 Lacs",
                "₹10 - ₹20 Lacs",
                "Above ₹20 Lacs",
              ].map((range) => (
                <div key={range} className={`p-4 border dark:border-gray-500  border-gray-300 dark:text-white rounded cursor-pointer transition mt-2 ${formData.loanAmount === range ? "border-blue-500" : ""}`} onClick={() => setFormData({ ...formData, loanAmount: range })}>
                  <input type="radio" name="loanAmount" value={range} checked={formData.loanAmount === range} onChange={handleChange} className="mr-2 " />
                  {range}
                </div>
              ))}
                 <div className="flex justify-between mt-4">
                 <button onClick={prevStep} className="dark:border-gray-500  border-gray-300 border-[0.6px] hover:text-white  dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600">
                Back
              </button>
              <button onClick={nextStep} className="dark:border-blue-500 border-blue-300  border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600">
                Next
              </button>
              </div>
            </motion.div>
          )}
  


{step === 5 && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
      Review & Submit
    </h2>
    
    <div className="overflow-x-auto bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Form Data
      </h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
        <tbody>
          {formData && Object.entries(formData)
            .filter(([key, value]) =>
              value !== null && value !== undefined && value !== "" &&
              key !== "createdAt" && key !== "firestoreId"
            )
            .map(([key, value]) => (
              <tr key={key} className="border-b border-gray-300 dark:border-gray-600">
                <td className="p-1 font-medium capitalize text-gray-700 dark:text-white">
                  {key.replace(/([A-Z])/g, " $1")}
                </td>
                <td className="p-1 text-gray-900 dark:text-gray-300">{value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-between mt-4">
      <button 
        onClick={prevStep} 
        className="dark:border-gray-500  border-gray-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600"
      >
        Back
      </button>
      <button 
        onClick={submit} 
        className="dark:border-green-500 border-green-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  </motion.div>
)}

    </form>

    {/* Success Modal */}
    {isSubmitted && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-xs z-50">
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl w-96 text-center">
      <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400">Submission Successful</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-3">
        Thank you for your submission. Our team will review your application and get back to you within 24 hours.
      </p>
      <button
        onClick={() => handleClose()}
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>
  );
};

export default MultiStepForm;
