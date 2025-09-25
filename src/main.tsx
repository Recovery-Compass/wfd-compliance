import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WfdDashboard from "./pages/WfdDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AugustDashboard from "./pages/AugustDashboard";
import OpportunityDashboard from "./pages/OpportunityDashboard";
<<<<<<< HEAD
import EngageHub from "./pages/EngageHub";
import AboutData from "./pages/AboutData";
import NotFound from "./pages/NotFound";
=======
import DataStory from "./pages/DataStory";
>>>>>>> origin/main
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
<<<<<<< HEAD
        <Route path="/engage" element={<EngageHub />} />
        <Route path="/about-data" element={<AboutData />} />
        <Route path="*" element={<NotFound />} />
=======
        <Route path="/engage/data-story" element={<DataStory />} />
>>>>>>> origin/main
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
console.info("[mount] Application mounted");
