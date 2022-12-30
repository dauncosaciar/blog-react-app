import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import configRouting from "./configRouting";

export default function Routing() {
  return (
    <Router>
      <Routes>
        {configRouting.map((route, index) => (
          <Route key={index} path={route.path} element={<route.page />} />
        ))}
      </Routes>
    </Router>
  );
}
