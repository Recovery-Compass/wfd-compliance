import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./styles/rc-brand.css";
import WfdDashboard from "./pages/WfdDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AugustDashboard from "./pages/AugustDashboard";
import OpportunityDashboard from "./pages/OpportunityDashboard";
import EngageHub from "./pages/EngageHub";
import AboutData from "./pages/AboutData";
import NotFound from "./pages/NotFound";
import DataStory from "./pages/DataStory";
import PetLeaderboard from "./pages/PetLeaderboard";
import Badges from "./pages/Badges";
import WallOfFame from "./pages/WallOfFame";
import LiveFeed from "./pages/LiveFeed";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import WowDashboard from "./pages/WowDashboard";
import ImpactCards from "./pages/ImpactCards";

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
        <Route path="/engage/data-story" element={<DataStory />} />
        <Route path="/engage/pet-leaderboard" element={<PetLeaderboard />} />
        <Route path="/engage/badges" element={<Badges />} />
        <Route path="/engage/wall-of-fame" element={<WallOfFame />} />
        <Route path="/wow" element={<WowDashboard />} />
        <Route path="/impact-cards" element={<ImpactCards />} />
        <Route path="/engage/live-feed" element={<LiveFeed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);
console.info("[mount] Application mounted");
