import React, { useState } from 'react';

const Goals = () => {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("medium");
  const [investmentExperience, setInvestmentExperience] = useState("none");
  const [savings, setSavings] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here, you could integrate with ChatGPT API or store the answers for future analysis
    alert("Your financial goals have been saved!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Set Your Financial Goals</h1>
      
      <form onSubmit={handleFormSubmit} className="card w-full lg:w-2/3 mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">What is your primary financial goal?</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Save for an emergency fund, buy a house"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">Timeframe to achieve your goal (in months)</span>
          </label>
          <input
            type="number"
            placeholder="e.g., 12"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">What is your monthly income?</span>
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
            <span className="label-text text-gray-700">What are your total monthly expenses?</span>
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
            <span className="label-text text-gray-700">What is your current total savings?</span>
          </label>
          <input
            type="number"
            placeholder="Enter your total savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">What is your risk tolerance?</span>
          </label>
          <select
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-gray-700">Do you have any prior investment experience?</span>
          </label>
          <select
            value={investmentExperience}
            onChange={(e) => setInvestmentExperience(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="none">None</option>
            <option value="some">Some</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Save Goals
        </button>
      </form>
    </div>
  );
};

export default Goals;
