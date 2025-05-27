import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Slider, Typography, TextField } from "@mui/material";

function EMICalculator() {
  const [amount, setAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const months = parseInt(tenure) * 12;

    if (principal && rate && months) {
      const calculatedEmi =
        (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);
      const totalPayment = calculatedEmi * months;
      const interest = totalPayment - principal;

      setEmi(calculatedEmi.toFixed(2));
      setTotalInterest(interest.toFixed(2));
    } else {
      setEmi(null);
      setTotalInterest(null);
    }
  }, [amount, interestRate, tenure]);

  const handleEditComplete = () => setEditField(null);

  const InputSection = ({ label, value, onChange, sliderProps, fieldKey, unit = "" }) => (
    <div className="mb-6">
      <Typography variant="subtitle1" className="mb-1 font-medium text-gray-800 dark:text-gray-200">
        {label}
      </Typography>
      {editField === fieldKey ? (
        <TextField
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={handleEditComplete}
          autoFocus
          type="number"
          variant="outlined"
          fullWidth
          inputProps={{ style: { color: "blue" } }}
        />
      ) : (
        <div
          onClick={() => setEditField(fieldKey)}
          className="text-center mt-2 text-lg cursor-pointer font-semibold text-gray-700 dark:text-white transition hover:underline"
        >
          {unit}{value.toLocaleString()}
        </div>
      )}
      <Slider
        value={value}
        onChange={(e, val) => onChange(val)}
        valueLabelDisplay="auto"
        sx={{ "& .MuiSlider-thumb": { boxShadow: "0 0 8px rgba(79, 70, 229, 0.5)" } }}
        {...sliderProps}
      />
    </div>
  );

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center md:items-start p-6 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all min-h-screen text-gray-900 dark:text-white">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 lg:w-[45%] shadow-md rounded-xl bg-white dark:bg-gray-800 p-6 mb-8 md:mb-0 md:mr-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          EMI Calculator
        </h1>

        <InputSection
          label="Loan Amount (₹)"
          value={amount}
          onChange={setAmount}
          sliderProps={{ min: 1000, max: 500000, step: 10000 }}
          fieldKey="amount"
          unit="₹"
        />

        <InputSection
          label="Interest Rate (%)"
          value={interestRate}
          onChange={setInterestRate}
          sliderProps={{ min: 1, max: 20, step: 0.1 }}
          fieldKey="interestRate"
          unit=""
        />

        <InputSection
          label="Tenure (Years)"
          value={tenure}
          onChange={setTenure}
          sliderProps={{ min: 1, max: 30, step: 1 }}
          fieldKey="tenure"
          unit=""
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 lg:w-[45%] shadow-md rounded-xl bg-white dark:bg-gray-800 p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          EMI Breakdown
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              {
                name: "Breakdown",
                Principal: parseFloat(amount),
                Interest: parseFloat(totalInterest) || 0,
              },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="Principal" fill="#6366F1" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Interest" fill="#14B8A6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {emi && (
          <div className="mt-6 text-center space-y-2">
            <p className="text-lg font-semibold">
              Monthly EMI: <span className="text-blue-600 dark:text-blue-300">₹{parseFloat(emi).toLocaleString("en-IN")}</span>
            </p>
            <p className="text-lg font-semibold">
              Total Interest Payable:{" "}
              <span className="text-purple-600 dark:text-purple-300">₹{parseFloat(totalInterest).toLocaleString("en-IN")}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EMICalculator;
