import React from "react";
import PetContest from "@/components/wow/PetContest";
import SuccessStoriesCarousel from "@/components/wow/SuccessStoriesCarousel";
import ImpactMeter from "@/components/wow/ImpactMeter";

export default function WowDashboard() {
  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Wow Dashboard</h1>
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
  );
}