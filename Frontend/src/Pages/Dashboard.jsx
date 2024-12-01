import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [goal, setGoal] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [timeframe, setTimeframe] = useState(""); // Add timeframe input
  const [savingSuggestion, setSavingSuggestion] = useState(null);
  const [apiAdvice, setApiAdvice] = useState(null); // To store ChatGPT API response
  const [loading, setLoading] = useState(false); // For button loading state

  const calculateSuggestion = async () => {
    if (goal && monthlyIncome && monthlyExpenses && timeframe) {
      const disposableIncome = monthlyIncome - monthlyExpenses;
      const monthlyTarget = goal / timeframe; // Calculate monthly target based on goal and timeframe

      // Basic suggestion calculation
      if (disposableIncome >= monthlyTarget) {
        setSavingSuggestion(
          `To reach your goal of $${goal} in ${timeframe} months, save $${monthlyTarget.toFixed(
            2
          )} per month.`
        );
      } else {
        setSavingSuggestion(
          `Your current income and expenses leave a disposable income of $${disposableIncome.toFixed(
            2
          )}, which may be insufficient to meet your goal within ${timeframe} months.`
        );
      }

      // Call ChatGPT API for tailored financial advice
      setLoading(true); // Show loading state
      try {
        const prompt = `
          I want financial advice based on these inputs:
          - Financial goal: $${goal}
          - Timeframe: ${timeframe} months
          - Monthly income: $${monthlyIncome}
          - Monthly expenses: $${monthlyExpenses}
          - Disposable income: $${disposableIncome.toFixed(2)}

          Can you provide in-depth tailored financial advice to help me achieve my goal?
        `;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a financial advisor." },
              { role: "user", content: prompt },
            ],
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
          }
        );

        setApiAdvice(response.data.choices[0].message.content.trim());
      } catch (error) {
        console.error(
          "Error fetching advice from ChatGPT:",
          error.response?.data || error.message
        );
        setApiAdvice("Sorry, there was an issue getting advice from ChatGPT.");
      } finally {
        setLoading(false); // Remove loading state
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Financial Dashboard
      </h1>

      {/* Form to Set Goal */}
      <div className="card w-full lg:w-2/3 mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Set Your Financial Goal
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">Your Goal</span>
          </label>
          <input
            type="number"
            placeholder="e.g., 1000"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">Monthly Income</span>
          </label>
          <input
            type="number"
            placeholder="Enter your monthly income"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">Monthly Expenses</span>
          </label>
          <input
            type="number"
            placeholder="Enter your monthly expenses"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">Timeframe (months)</span>
          </label>
          <input
            type="number"
            placeholder="e.g., 6"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <button
          onClick={calculateSuggestion}
          className={`btn btn-primary w-full mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Savings Suggestion"}
        </button>
      </div>

      {/* Display Financial Insights */}
      <div className="card w-full lg:w-2/3 mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Financial Insights
        </h2>
        <div className="text-gray-700 mb-4">
          {savingSuggestion ? (
            <p className="text-lg font-medium text-green-600">
              {savingSuggestion}
            </p>
          ) : (
            <p className="text-lg text-gray-500">
              No insights available. Set your goal to get started.
            </p>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          ChatGPT Advice
        </h2>
        <div className="text-gray-700">
          {apiAdvice ? (
            <p className="text-lg text-blue-600">{apiAdvice}</p>
          ) : (
            <p className="text-lg text-gray-500">
              No advice available. Calculate savings to fetch advice.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
