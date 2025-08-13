import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import WfdDashboard from "./pages/WfdDashboard";
import { ErrorBoundary } from "@/components/ErrorBoundary";

console.info("[mount] WfdDashboard starting");
const root = createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <WfdDashboard />
  </ErrorBoundary>
);
console.info("[mount] WfdDashboard mounted");
