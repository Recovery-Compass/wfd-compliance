import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./styles/rc-brand.css";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import ClientList from "./pages/ClientList";
import DataValidation from "./pages/DataValidation";
import ProgramPerformance from "./pages/ProgramPerformance";
import FunZone from "./pages/FunZone";
import TeamCelebrations from "./pages/TeamCelebrations";
import CoffeeCounter from "./pages/CoffeeCounter";
import MemeOfTheDay from "./pages/MemeOfTheDay";
import RandomActsTracker from "./pages/RandomActsTracker";

console.info("[mount] Application starting");
const root = createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/compliance" element={<Dashboard />} />
        <Route path="/compliance/clients" element={<ClientList />} />
        <Route path="/compliance/programs" element={<ProgramPerformance />} />
        <Route path="/compliance/quality" element={<DataValidation />} />
        
        {/* Fun Zone Routes */}
        <Route path="/fun" element={<FunZone />} />
        <Route path="/fun/celebrations" element={<TeamCelebrations />} />
        <Route path="/fun/coffee" element={<CoffeeCounter />} />
        <Route path="/fun/meme" element={<MemeOfTheDay />} />
        <Route path="/fun/kindness" element={<RandomActsTracker />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
console.info("[mount] Application mounted");
