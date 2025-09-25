import React from "react";
import PetContest from "@/components/wow/PetContest";
import SuccessStoriesCarousel from "@/components/wow/SuccessStoriesCarousel";
import ImpactMeter from "@/components/wow/ImpactMeter";

import { BrandShell } from "@/components/BrandShell";

export default function WowDashboard() {
  return (
    <BrandShell>
      <div style={{ padding: "8px" }}>
        <div className="wfd-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ margin: 0 }}>Wow Dashboard</h1>
          <a className="btn-rc" href="/impact-cards">Impact Cards</a>
        </div>
      <p style={{ marginTop: 0, color: "#555" }}>
        Rapid demo modules to delight stakeholders and drive shares.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2>1) Pet Photo Contest Leaderboard</h2>
        <PetContest />
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>2) Success Story Spotlight</h2>
        <SuccessStoriesCarousel />
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>3) Community Impact Meter</h2>
        <ImpactMeter />
      </section>
      </div>
    </BrandShell>
  );
}