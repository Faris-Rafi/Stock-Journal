import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./Layouts/container";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import StockCalculator from "./Pages/stockCalculator";
import AraArb from "./Pages/araArb";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stock-calculator" element={<StockCalculator />} />
        <Route path="/ara-arb" element={<AraArb />} />
      </Routes>
    </Router>
  );
};

export default App;
