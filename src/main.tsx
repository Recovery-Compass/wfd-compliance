import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WfdDashboard from "./pages/WfdDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import { ErrorBoundary } from "@/components/ErrorBoundary";

console.info("[mount] Application starting");
const root = createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WfdDashboard />} />
        <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
console.info("[mount] Application mounted");
