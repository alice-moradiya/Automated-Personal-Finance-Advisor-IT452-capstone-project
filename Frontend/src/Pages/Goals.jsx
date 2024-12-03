import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Goals = () => {
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [response, setResponse] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const prompt = `
      Please create a personalized financial plan based on the following user inputs. Format the response as numbered points, 
      with each point clearly separated on a new line for better readability. Avoid overly technical language and make it user-friendly, 
      Give user some insights about what will be the best onlin real website to check and read more about specific data as well:
      - Financial Goal: ${goal}
      - Timeframe: ${timeframe} months
      - Monthly Income: $${monthlyIncome}
      - Monthly Expenses: $${monthlyExpenses}
      - Current Savings: $${savings}
    `;

    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
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

  // Data for graphs
  const savingsVsExpensesData = [
    { name: "Savings", value: Number(savings) || 0 },
    { name: "Expenses", value: Number(monthlyExpenses) || 0 },
  ];

  const incomeAllocationData = [
    { name: "Savings", value: Number(savings) || 0 },
    { name: "Expenses", value: Number(monthlyExpenses) || 0 },
    {
      name: "Remaining",
      value:
        Math.max(
          0,
          Number(monthlyIncome) - (Number(savings) + Number(monthlyExpenses))
        ) || 0,
    },
  ];

  const futureSavingsData = Array.from({ length: 12 }, (_, i) => ({
    month: `Month ${i + 1}`,
    savings:
      Number(savings) +
      i * (Number(monthlyIncome) - Number(monthlyExpenses)) * 0.2, // Assume 20% of remaining income is saved.
  }));

  const COLORS = ["#6D83F2", "#F26292", "#F5A623"];

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Personalized Financial Report", 10, 10);

    // Add User Data
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("User Inputs:", 10, 30);
    doc.text(`Financial Goal: ${goal}`, 10, 40);
    doc.text(`Timeframe: ${timeframe} months`, 10, 50);
    doc.text(`Monthly Income: $${monthlyIncome}`, 10, 60);
    doc.text(`Monthly Expenses: $${monthlyExpenses}`, 10, 70);
    doc.text(`Current Savings: $${savings}`, 10, 80);

    // Add AI Response
    if (response) {
      doc.setFontSize(14);
      doc.text("AI Advice:", 10, 100);
      const lines = doc.splitTextToSize(response, 180); // Wrap text to fit
      doc.text(lines, 10, 110);
    }

    // Capture and Add Graphs
    const chartContainer = document.querySelectorAll(".chart-container");
    for (let i = 0; i < chartContainer.length; i++) {
      const canvas = await html2canvas(chartContainer[i]);
      const imgData = canvas.toDataURL("image/png");
      const positionY = 130 + i * 100;
      doc.addImage(imgData, "PNG", 10, positionY, 180, 80);
    }

    // Saving the PDF
    doc.save("Financial_Report.pdf");
  };

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 hover:scale-105 transition-transform">
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
            className="input input-bordered w-full hover:shadow-lg transition-all"
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
            className="input input-bordered w-full hover:shadow-lg transition-all"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              Monthly Income
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter your monthly income"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="input input-bordered w-full hover:shadow-lg transition-all"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              Monthly Expenses
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter your monthly expenses"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            className="input input-bordered w-full hover:shadow-lg transition-all"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text text-gray-700 text-lg font-semibold">
              Total Savings
            </span>
          </label>
          <input
            type="number"
            placeholder="Enter your total savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="input input-bordered w-full hover:shadow-lg transition-all"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4 text-lg hover:scale-105 active:scale-95 transition-transform"
        >
          Get Financial Advice
        </button>
      </form>

      {response && (
        <div className="flex flex-col overflow-y-auto max-h-screen mt-8 p-6 bg-white shadow-md rounded-lg w-full lg:w-2/3 mx-auto">
          <h2 className="text-2xl font-semibold text-blue-700">AI Response</h2>
          <p className="mt-4 text-gray-800 overflow-y-auto">{response}</p>
        </div>
      )}
      {/* PDF Button */}
      <button
        onClick={generatePDF}
        className="btn bg-green-500 text-white mt-8 mx-auto block px-6 py-3 rounded hover:bg-green-600"
      >
        Download PDF
      </button>

      {/* Graphs */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          Financial Overview
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Bar Chart */}
          <div className="w-full lg:w-1/3 hover:shadow-lg transition-all rounded-lg">
            <h3 className="text-xl font-semibold text-center mb-4">
              Savings vs. Expenses
            </h3>
            <BarChart
              width={300}
              height={250}
              data={savingsVsExpensesData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6D83F2" />
            </BarChart>
          </div>

          {/* Pie Chart */}
          <div className="w-full lg:w-1/3 hover:shadow-lg transition-all rounded-lg">
            <h3 className="text-xl font-semibold text-center mb-4">
              Income Allocation
            </h3>
            <PieChart width={300} height={300}>
              <Pie
                data={incomeAllocationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {incomeAllocationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Future Savings Line Chart */}
          <div className="w-full lg:w-1/3 hover:shadow-lg transition-all rounded-lg">
            <h3 className="text-xl font-semibold text-center mb-4">
              Future Savings
            </h3>
            <LineChart
              width={300}
              height={250}
              data={futureSavingsData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="savings" stroke="#F26292" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
