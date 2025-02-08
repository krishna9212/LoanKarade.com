import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    if (storedData) {
      setFormData({
        name: storedData.displayName || "",
        email: storedData.email || "",
        phone: storedData.phoneNumber || "",
        address : storedData.address || "",
        city: "",
        createdAt : storedData.createdAt || "",
        firestoreId : storedData.firestoreId || "",
        gender : storedData.gender || "",
        employmentType: "",
        salary: "",
        businessName: "",
      });
    }
    
  }, []);
  
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("user")) || {};
    return {
      name: storedData.displayName || "",
      email: storedData.email || "",
      phone: storedData.phoneNumber || "",
      address: storedData.address || "",
      city: storedData.city || "",
      createdAt: storedData.createdAt || "",
      firestoreId: storedData.firestoreId || "",
      gender: storedData.gender || "",
      employmentType: storedData.employmentType || "",
      salary: storedData.salary || "",
      businessName: storedData.businessName || "",
      grossIncome: storedData.grossIncome || "",
      loanAmount: storedData.loanAmount || "",
    };
  });
  

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [e.target.name]: e.target.value };
      localStorage.setItem("user", JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };
  

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen w-full flex flex-col items-center mt-20 justify-start bg-gray-100 dark:bg-gray-900 p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="relative w-full bg-gray-300 h-[1px] rounded-full">
          <div
            className="absolute h-[1px] bg-blue-500 rounded-full transition-all"
            style={{ width: `${(step - 1) * 33.3}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl md:w-[70%] w-full">
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
              className="w-full p-3 mb-3 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Adress"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <button onClick={nextStep} className="w-full border-[0.2px] text-[1rem] border-blue-600 text-black dark:text-white py-2 rounded hover:bg-blue-200 transition-all duration-700">
              Next
            </button>
          </motion.div>
        )}

        {/* Step 2: Employment Type */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Employment Type</h2>
            <div
              className={`flex  items-start   gap-2 p-3 border rounded  cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                formData.employmentType === "salaried" ? "border-blue-500" : ""
              }`}
              onClick={() => setFormData({ ...formData, employmentType: "salaried" })}
            >
              <input type="radio" name="employmentType" className="" value="salaried" checked={formData.employmentType === "salaried"} onChange={handleChange} />
              <div>
                <label className="font-semibold text-gray-900 dark:text-white cursor-pointer">Salaried</label>
                <p className="text-sm text-gray-500 ">For individuals receiving a fixed monthly salary.</p>
              </div>
            </div>

            <div
              className={`flex items-start gap-2 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition mt-2 ${
                formData.employmentType === "business" ? "border-blue-500" : ""
              }`}
              onClick={() => setFormData({ ...formData, employmentType: "business" })}
            >
              <input type="radio" name="employmentType" value="business" checked={formData.employmentType === "business"} onChange={handleChange} />
              <div>
                <label className="font-semibold text-gray-900 dark:text-white cursor-pointer">Business Owner</label>
                <p className="text-sm text-gray-500">For self-employed or business professionals.</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Back
              </button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Next
              </button>
            </div>
          </motion.div>
        )}

      {/* Step 3: Desired Loan Amount */}
      {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Desired Loan Amount</h2>
            {[
              "Below ₹2 Lacs",
              "₹2 - ₹5 Lacs",
              "₹5 - ₹10 Lacs",
              "₹10 - ₹20 Lacs",
              "Above ₹20 Lacs",
            ].map((range) => (
              <div key={range} className={`p-4 border dark:text-white rounded cursor-pointer transition mt-2 ${formData.loanAmount === range ? "border-blue-500" : ""}`} onClick={() => setFormData({ ...formData, loanAmount: range })}>
                <input type="radio" name="loanAmount" value={range} checked={formData.loanAmount === range} onChange={handleChange} className="mr-2 " />
                {range}
              </div>
            ))}
                 <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white px-6 py-3 rounded-lg">Back</button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Next</button>
            </div>
          </motion.div>
        )}
  {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Gross Annual Income</h2>
            {["Below ₹5 Lacs", "₹5 - ₹10 Lacs", "₹10 Lacs - ₹15 Lacs", "Above ₹15 Lacs"].map((income) => (
              <div key={income} className={`p-4 border dark:text-white rounded cursor-pointer transition mt-2 ${formData.grossIncome === income ? "border-blue-500" : ""}`} onClick={() => setFormData({ ...formData, grossIncome: income })}>
                <input type="radio" name="grossIncome" value={income} checked={formData.grossIncome === income} onChange={handleChange} className="mr-2" />
                {income}
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white px-6 py-3 rounded-lg">Back</button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Next</button>
            </div>
          </motion.div>
        )}
    {step === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Current Business City</h2>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:ring-2 text-gray-700 dark:text-gray-200 focus:ring-blue-500"
            />
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="bg-gray-500 text-white px-6 py-3 rounded-lg">Back</button>
              <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg">Next</button>
            </div>
          </motion.div>
        )}


{step === 6 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Review & Submit</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm text-gray-800 dark:text-white">{JSON.stringify(formData, null, 2)}</pre>
            <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
