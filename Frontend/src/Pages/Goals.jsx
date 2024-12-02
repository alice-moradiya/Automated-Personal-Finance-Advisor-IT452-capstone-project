import React, { useState } from "react";
import axios from "axios";

const Goals = () => {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("medium");
  const [investmentExperience, setInvestmentExperience] = useState("none");
  const [savings, setSavings] = useState("");
  const [response, setResponse] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const messages = [
      {
        role: "system",
        content:
          "You are a financial advisor. Provide personalized financial advice based on user input.",
      },
      {
        role: "user",
        content: `
          Based on the following user inputs, provide a personalized financial plan:
          - Financial Goal: ${goal}
          - Timeframe: ${timeframe} months
          - Monthly Income: $${monthlyIncome}
          - Monthly Expenses: $${monthlyExpenses}
          - Current Savings: $${savings}
          - Risk Tolerance: ${riskTolerance}
          - Investment Experience: ${investmentExperience}
        `,
      },
    ];

    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Use "gpt-4" if you have access
          messages: messages,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error fetching the AI response:", error);
      setResponse("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 transition-transform transform hover:scale-105">
        Set Your Financial Goals
      </h1>

      <form
        onSubmit={handleFormSubmit}
        className="card w-full lg:w-2/3 mx-auto bg-white shadow-2xl rounded-lg p-8"
      >
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              What is your primary financial goal?
            </span>
          </label>
          <input
            type="text"
            placeholder="e.g., Save for an emergency fund, buy a house"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="input input-bordered w-full transition-transform transform focus:scale-105"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              Timeframe to achieve your goal (in months)
            </span>
          </label>
          <input
            type="number"
            placeholder="e.g., 12"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="input input-bordered w-full transition-transform transform focus:scale-105"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              What is your monthly income?
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter your monthly income"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="input input-bordered w-full transition-transform transform focus:scale-105"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              What are your total monthly expenses?
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter your monthly expenses"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            className="input input-bordered w-full transition-transform transform focus:scale-105"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              What is your current total savings?
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter your total savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="input input-bordered w-full transition-transform transform focus:scale-105"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              What is your risk tolerance?
            </span>
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="select select-bordered w-full transition-transform transform focus:scale-105"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              Do you have any prior investment experience?
            </span>
          </label>
          <select
            value={investmentExperience}
            onChange={(e) => setInvestmentExperience(e.target.value)}
            className="select select-bordered w-full transition-transform transform focus:scale-105"
          >
            <option value="none">None</option>
            <option value="some">Some</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4 text-lg transition-transform transform hover:scale-105"
        >
          Get Financial Advice
        </button>
      </form>

      {response && (
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg w-full lg:w-2/3 mx-auto">
          <h2 className="text-2xl font-semibold text-blue-700">AI Response</h2>
          <p className="mt-4 text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Goals;
