import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import StockCalculator from "./Pages/stockCalculator";
import AraArb from "./Pages/araArb";
import SelectAVG from "./Pages/selectAVG";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-avg" element={<SelectAVG />} />
        <Route path="/detail-avg/:uuid" element={<SelectAVG />} />
        <Route path="/stock-calculator" element={<StockCalculator />} />
        <Route path="/ara-arb" element={<AraArb />} />
      </Routes>
    </Router>
  );
};

export default App;
