import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Goals from "./Pages/Goals";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define the routes for your pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </Router>
  );
}

export default App;
