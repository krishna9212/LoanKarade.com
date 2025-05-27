import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CitySelector from "./Temp";
import StateSelector from "./Temp2";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState("");

  const [formData, setFormData] = useState({
    name: storedData.name || "",
    email: storedData.email || "",
    phone: storedData.phone || "",
    address: storedData.address || "",
    city: storedData.city || "",
    state: storedData.state || "",
    gender: storedData.gender || "",
    employmentType: storedData.employmentType || "",
    company: storedData.company || "",
    PositionInCompany: storedData.PositionInCompany || "",
    businessName: storedData.businessName || "",
    CatagoryOfBusiness: storedData.CatagoryOfBusiness || "",
    TotalEmiYouPayPerMonth: storedData.TotalEmiYouPayPerMonth || "",
    grossIncome: storedData.grossIncome || "",
    loanAmount: storedData.loanAmount || "",
    propertyType: storedData.propertyType || "",
    propertyLocation: storedData.propertyLocation || "",
    estimatedPropertyValue: storedData.estimatedPropertyValue || "",
});

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Handle Form Submission
  const submit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
  
    // Append access key and credit card request to the formData object
    const payload = {
      ...formData,
      access_key: "269a535c-cc37-461e-92b7-aae4bd7913ad",
      request: "NEED A LOAN AGAINST HOME",
    };
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully!");
        setIsSubmitted(true);
      } else {
        setResult("Error: " + data.message);
      }
    } catch (error) {
      setResult("Error submitting form.");
    }
  };
  
  
  

  // Navigation Handlers
  const handleClose = () => {
    setIsSubmitted(false);
    navigate("/");
  };

  const nextStep = () => {
    if (step === 1) {
        if (!formData.name.trim() || !formData.gender.trim()  || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim()) {
          alert("❌ Please fill in all required fields.");
          return;
        }
      }
  
      if (step === 2 && !formData.employmentType) {
        alert("❌ Please select an employment type.");
        return;
      }
  
      if (step === 3 && formData.employmentType === "salaried") {
        if (!formData.company.trim() || !formData.PositionInCompany.trim() || formData.TotalEmiYouPayPerMonth === "") {
          alert("❌ Please fill in all required fields.");
          return;
        }
      }
  
      if (step === 3 && formData.employmentType === "business") {
        if (!formData.businessName.trim() || !formData.CatagoryOfBusiness.trim() || formData.TotalEmiYouPayPerMonth === "") {
          alert("❌ Please fill in all required fields.");
          return;
        }
      }
  
      if (step === 4 && !formData.grossIncome) {
        alert("❌ Please select a gross annual income.");
        return;
      }
  
      if (step === 5 && !formData.loanAmount) {
        alert("❌ Please enter the loan amount.");
        return;
      }
    
      if (step === 6 && (!formData.propertyType || !formData.propertyLocation || !formData.estimatedPropertyValue)) {
        alert("❌ Please fill in all property details.");
        return;
      }
    
        if (step === 7) {
      setFormData((prev) => ({
        ...prev,
        ...(prev.employmentType === "salaried"
          ? { businessName: "", CatagoryOfBusiness: "" }
          : { company: "", PositionInCompany: "" }),
      }));
    }

    if (step < 8) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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

      <form className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-xl md:w-[80%] w-full" onSubmit={submit}>
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
              className="w-full p-3 mb-3  border dark:border-gray-500  border-gray-300 rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
              required 
              />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded dark:border-gray-500  border-gray-300 focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              minLength={10}
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded dark:border-gray-500  border-gray-300 focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border dark:border-gray-500  border-gray-300 rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
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
              className="w-full p-3 mb-4 border rounded dark:border-gray-500 border-gray-300 focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <StateSelector></StateSelector>
            <CitySelector></CitySelector>
            
            <button onClick={nextStep} className="w-full border-[0.2px] text-[1rem] border-blue-300 dark:border-blue-500 text-black dark:text-white py-2 rounded hover:bg-blue-700 transition-all duration-700">
              Next
            </button>
          </motion.div>
        )}

        {/* Step 2: Employment Type */}
        {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Employment Type
            </h2>
            <div className="flex flex-col gap-2">
            <div
                className={`flex items-start gap-2 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                formData.employmentType === "salaried"
                    ? "border-blue-300 dark:border-blue-500"
                    : "dark:border-gray-500 border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, employmentType: "salaried" })}
            >
                <input
                type="radio"
                name="employmentType"
                className="mt-1 md:mt-[7px]"
                value="salaried"
                checked={formData.employmentType === "salaried"}
                required
                readOnly
                />
                <div>
                <label className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                    Salaried
                </label>
                <p className="text-sm text-gray-500">
                    For individuals receiving a fixed monthly salary.
                </p>
                </div>
            </div>

            <div
                className={`flex items-start gap-2 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition mt-2 ${
                formData.employmentType === "business"
                    ? "border-blue-300 dark:border-blue-500"
                    : "dark:border-gray-500 border-gray-300"
                }`}
                onClick={() => setFormData({ ...formData, employmentType: "business" })}
            >
                <input
                type="radio"
                name="employmentType"
                value="business"
                className="mt-1 md:mt-[7px]"
                checked={formData.employmentType === "business"}
                required
                readOnly
                />
                <div>
                <label className="font-semibold text-gray-900 dark:text-white cursor-pointer">
                    Business Owner
                </label>
                <p className="text-sm text-gray-500">
                    For self-employed or business professionals.
                </p>
                </div>
            </div>
            </div>

            <div className="flex justify-between mt-4">
            <button
                onClick={prevStep}
                className=" border-[0.6px] dark:border-gray-500 border-gray-300 dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600"
            >
                Back
            </button>
            <button
                onClick={() => {
                if (!formData.employmentType) {
                    alert("❌ Please select an employment type.");
                    return;
                }
                nextStep();
                }}
                className="border-blue-300 dark:border-blue-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600"
            >
                Next
            </button>
            </div>
        </motion.div>
        )}

        {step === 3 && formData.employmentType === "salaried" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={FormData.company}
            onChange={handleChange}
            className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            required 
            />
            
            <input
            type="text"
            name="PositionInCompany"
            placeholder="Designation In Company "
            value={FormData.PositionInCompany}
            onChange={handleChange}
            className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            required 
            />
            
            <input
            type="number"
            name="TotalEmiYouPayPerMonth"
            placeholder="Share the Emi amount you're paying currently (eg. ₹1500) "
            value={FormData.TotalEmiYouPayPerMonth}
            onChange={handleChange}
            className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            required 
            />
            
        
            
            <div className="flex justify-between mt-4">
                <button onClick={prevStep} className=" border-[0.6px] dark:border-gray-500 border-gray-300 dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600">
                    Back
                </button>
                <button onClick={nextStep} className="border-blue-300 dark:border-blue-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600">
                    Next
                </button>
                </div>
        </motion.div>
        )}

        {step === 3 && formData.employmentType === "business" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={FormData.company}
            onChange={handleChange}
            className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            required 
            />
            
            <input
            type="text"
            name="CatagoryOfBusiness"
            placeholder="Category of Business"
            value={FormData.CatagoryOfBusiness}
            onChange={handleChange}
            className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            required 
            />
            
            <input
            type="tel"
            name="TotalEmiYouPayPerMonth"
            placeholder="EMI amount you're paying currently (e.g., ₹1500)"
            value={FormData.TotalEmiYouPayPerMonth}
            onChange={handleChange}
            className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            required 
            />
            
        
            
            <div className="flex justify-between mt-4">
                <button onClick={prevStep} className="dark:border-gray-500 border-gray-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600">
                    Back
                </button>
                <button onClick={nextStep} className="border-blue-300 dark:border-blue-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600">
                    Next
                </button>
                </div>
        </motion.div>
        )}

        {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Gross Annual Income</h2>
                    {["Below ₹5 Lacs", "₹5 - ₹10 Lacs", "₹10 Lacs - ₹15 Lacs", "Above ₹15 Lacs"].map((income) => (
                    <div key={income} className={`p-4 border dark:border-gray-500 border-gray-300 dark:text-white rounded cursor-pointer transition mt-2 ${formData.grossIncome === income ? "border-blue-500" : ""}`} onClick={() => setFormData({ ...formData, grossIncome: income })}>
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
                    <button onClick={prevStep} className="dark:border-gray-500 border-gray-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600">
                        Back
                    </button>
                    <button onClick={nextStep} className=" border-blue-300 dark:border-blue-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600">
                        Next
                    </button>
                    </div>
                </motion.div>
                )}

 {step === 5 && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Select Loan Amount</h2>
    {[
                "Below ₹2 Lacs",
                "₹2 - ₹5 Lacs",
                "₹5 - ₹10 Lacs",
                "₹10 - ₹20 Lacs",
                "Above ₹20 Lacs",
              ].map((range) => (
      <div
        key={range}
        className={`p-4 border dark:border-gray-500 border-gray-300 dark:text-white rounded cursor-pointer transition mt-2 ${
          formData.loanAmount === range ? "border-blue-500" : ""
        }`}
        onClick={() => setFormData({ ...formData, loanAmount: range })}
      >
        <input
          type="radio"
          name="loanAmount"
          value={range}
          checked={formData.loanAmount === range}
          onChange={handleChange}
          className="mr-2"
        />
        {range}
      </div>
    ))}

    <div className="flex justify-between mt-4">
      <button
        onClick={prevStep}
        className="dark:border-gray-500 border-gray-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="border-blue-300 dark:border-blue-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  </motion.div>
)}

{step === 6 && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    
    <h2 className="text-3xl font-bold  mb-4 text-gray-900 dark:text-white">Property Details</h2>
    <select
        value={formData.propertyType}
        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
        className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200"
      >
        <option value="" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Select Property Type</option>
        <option value="Flat" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Flat</option>
        <option value="Independent House" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Independent House</option>
        <option value="Land" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Land</option>
      </select>

    <input
      type="text"
      placeholder="Property Location"
      value={formData.propertyLocation}
      onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
      className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200"
    />

    <input
      type="number"
      placeholder="Estimated Property Value"
      value={formData.estimatedPropertyValue}
      onChange={(e) => setFormData({ ...formData, estimatedPropertyValue: e.target.value })}
      className="w-full p-3 mb-3 dark:border-gray-500 border-gray-300  border rounded focus:ring-2 text-gray-700 dark:text-gray-200"
    />

    <div className="flex justify-between mt-4">
      <button
        onClick={prevStep}
        className="dark:border-gray-500 border-gray-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={nextStep}
        className="border-blue-300 dark:border-blue-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  </motion.div>
)}

        {step === 7 && (
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
                type="button"
                onClick={prevStep} 
                className="dark:border-gray-500 border-gray-300 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-gray-600"
                >
                Back
                </button>
                <button 
                type="submit"
                className="border-green-300 dark:border-green-500 border-[0.6px] dark:text-gray-200 text-black px-8 py-2 rounded transition-all duration-700 hover:bg-green-600"
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
