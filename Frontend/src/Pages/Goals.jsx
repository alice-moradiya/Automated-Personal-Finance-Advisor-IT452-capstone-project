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
  const [monthlyIncome, setMonthlyIncome] = useState("5000");
  const [monthlyExpenses, setMonthlyExpenses] = useState("3000");
  const [savings, setSavings] = useState("");
  const [response, setResponse] = useState(null);
  const [debt, setDebt] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const prompt = `
  Please create a professional and concise personalized financial plan based on the following user inputs(Make in depth plan which is also easy for user to understand). 
  Format the response as numbered points for clarity and readability. Avoid adding any signatures, placeholders 
  like [Your Name], or additional elements that are not explicitly requested. Ensure the response is user-friendly 
  and actionable. Include trusted and real online resources(actual site link from internet which is active) for further reading when relevant. Ensure that the response is strictly 
  lawful, ethical, and focused on financial planning only. If any input appears to involve illegal, unethical, 
  or harmful activities (e.g., human organ trade, fraud, or crime), respond clearly with the statement: 
  "I cannot assist with this request as it involves illegal or unethical activities.

  User Inputs:
  - Financial Goal: ${
    goal || "Not Provided"
  } (If not provided, suggest specifying a clear financial goal.)
  - Timeframe: ${
    timeframe || "Not Provided"
  } months (If not provided, suggest defining a realistic timeframe.)
  - Monthly Income: $${
    monthlyIncome || "Not Provided"
  } (If not provided, ask for income details to create an accurate plan.)
  - Monthly Expenses: $${
    monthlyExpenses || "Not Provided"
  } (If not provided, ask for expense details to analyze the budget.)
  - Total Debt: $${
    debt || "Not Provided"
  } (If not provided, suggest assessing total debt to determine financial health.)
  - Current Savings: $${
    savings || "Not Provided"
  } (If not provided, suggest estimating current savings.)

  **Debt-to-Income Ratio**: 
  - Based on the provided data, calculate the Debt-to-Income (DTI) Ratio as follows: 
    \`DTI = (Total Debt / Monthly Income) x 100\`. 
    Compare the result with the recommended maximum DTI of 36% for financial stability. 
    - If the user's DTI exceeds 36%, provide strategies to lower it (e.g., reducing debt, increasing income, or prioritizing high-interest debt).
    - If the DTI is below 36%, highlight the user's healthy financial standing and suggest ways to leverage this stability for financial goals.
    - always use you or your DTI ratio wherever reffering to user.

  Please note:
  1. Ensure the response focuses solely on the user's input and the requested financial advice.
  2. Avoid any personalization that includes names, signatures, or placeholders such as [Your Name].
  3. Provide clear and ethical financial advice, referencing trusted online sources like Investopedia or government financial websites.
  4. Do not provide advice or engage in topics that involve illegal, unethical, or harmful activities.
  5. Focus only on ethical and lawful financial advice based on the provided inputs.
`;

    try {
      const { data } = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1800,
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

  const debtToIncomeRatio =
    Number(monthlyIncome) > 0
      ? ((Number(debt) / Number(monthlyIncome)) * 100).toFixed(2)
      : 0;

  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageHeight = doc.internal.pageSize.height; // A4 height
    let currentY = 10; // Starting vertical position

    // Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Personalized Financial Report", 10, currentY);
    currentY += 20;

    // Add User Data
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const addTextWithPageBreak = (text, yIncrement = 10) => {
      if (currentY + yIncrement > pageHeight - 10) {
        doc.addPage(); // Add a new page
        currentY = 10; // Reset to the top of the new page
      }
      doc.text(text, 10, currentY);
      currentY += yIncrement;
    };

    addTextWithPageBreak("Your Goals:");
    addTextWithPageBreak(`Financial Goal: ${goal}`);
    addTextWithPageBreak(`Timeframe: ${timeframe} months`);
    addTextWithPageBreak(`Monthly Income: $${monthlyIncome}`);
    addTextWithPageBreak(`Monthly Expenses: $${monthlyExpenses}`);
    addTextWithPageBreak(`Current Savings: $${savings}`);

    // Add AI Response
    if (response) {
      addTextWithPageBreak("Your Financial Roadmap:", 20);
      const lines = doc.splitTextToSize(response, 180);
      lines.forEach((line) => addTextWithPageBreak(line, 7));
    }

    // Capture and Add Graphs
    const chartContainers = document.querySelectorAll(".chart-container");
    for (let i = 0; i < chartContainers.length; i++) {
      const container = chartContainers[i];

      // Ensure the chart is rendered
      const canvas = await html2canvas(container, {
        useCORS: true, // Ensure cross-origin images are captured
        scale: 2, // Increase resolution for better quality
      });

      const imgData = canvas.toDataURL("image/png");
      const imgHeight = 80; // Image height in mm
      const imgWidth = 180; // Image width in mm

      // Check if the image fits on the current page
      if (currentY + imgHeight > pageHeight - 10) {
        doc.addPage(); // Add new page if the image doesn't fit
        currentY = 10; // Reset position
      }

      doc.addImage(imgData, "PNG", 10, currentY, imgWidth, imgHeight);
      currentY += imgHeight + 10; // Move to the next position
    }

    // Save the PDF
    doc.save("Financial_Report.pdf");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      ></div> */}
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center text-black hover:scale-105 transition-transform">
          Set Your Financial <span className="text-pink-500">Goals </span>
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
              placeholder="e.g., Save for an emergency fund of $40,000, buy a house worth $250,000"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="input input-bordered w-full hover:shadow-lg transition-all"
            />
            <p className="text-sm text-gray-500 mt-2">
              Tip: Be specific about your goal for better advice. For example,
              "Build a retirement fund of $500,000 by age 60,' or 'Save $10,000
              for a dream vacation in the next 12 months."
            </p>
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
                Total Debt
              </span>
            </label>
            <input
              type="number"
              placeholder="Enter your total debt"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              className="input input-bordered w-full hover:shadow-lg transition-all"
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-gray-700 text-lg font-semibold">
                Current Savings
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
            className="btn btn-primary w-full mt-4 text-lg py-2 sm:py-3 md:py-[clamp(0.5rem, 2vw, 1.5rem)] leading-normal hover:scale-105 active:scale-95 transition-transform"
          >
            Build My Financial Strategy
          </button>
        </form>

        {response && (
          <div className="relative flex flex-col overflow-y-auto max-h-screen mt-8 p-6 bg-white shadow-md rounded-lg w-full lg:w-2/3 mx-auto z-20">
            <h2 className="text-2xl font-semibold text-blue-700">
              Strategic Planning Insights
            </h2>
            {/* Render each line of the response separately */}
            <div className="mt-4 text-gray-800 space-y-2 z-10">
              {response.split("\n").map((line, index) => (
                <p key={index} className="leading-relaxed">
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* PDF Button */}
        <button
          onClick={generatePDF}
          className="btn btn-outline  mt-8 mx-auto block px-6 py-3 rounded"
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
              <PieChart width={400} height={400}>
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
            {/* Debt-to-Income Ratio Bar Chart */}
            <div className="w-full lg:w-1/3 hover:shadow-lg transition-all rounded-lg">
              <h3 className="text-xl font-semibold text-center mb-4">
                Debt-to-Income Ratio
              </h3>
              <BarChart
                width={300}
                height={250}
                data={[
                  { name: "Your Ratio", value: debtToIncomeRatio },
                  { name: "Recommended Max", value: 36 },
                ]}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FF8042" />
              </BarChart>
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
    </div>
  );
};

export default Goals;
