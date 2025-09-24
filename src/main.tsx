import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WfdDashboard from "./pages/WfdDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AugustDashboard from "./pages/AugustDashboard";
import OpportunityDashboard from "./pages/OpportunityDashboard";
import EngageHub from "./pages/EngageHub";
import AboutData from "./pages/AboutData";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";

console.info("[mount] Application starting");
const root = createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WfdDashboard />} />
        <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
        <Route path="/august-dashboard" element={<AugustDashboard />} />
        <Route path="/opportunity-dashboard" element={<OpportunityDashboard />} />
        <Route path="/engage" element={<EngageHub />} />
        <Route path="/about-data" element={<AboutData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
console.info("[mount] Application mounted");
