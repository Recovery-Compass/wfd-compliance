import React from "react";
import MetricsCard from "@/components/MetricsCard";
import type { Metrics } from "@/types/Metrics";

const placeholder: Metrics = {
  totalClients: 0,
  housedCount: 0,
  avgLengthOfStayDays: null,
  intakeCoveragePct: 0,
  validationErrors: 0,
};

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-hero">WFD Dashboard (Prep)</h1>
          <p className="text-muted-foreground mt-1">
            Placeholder view until October 2025 data arrives.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard title="Total Clients" value={placeholder.totalClients} />
        <MetricsCard title="Housed" value={placeholder.housedCount} />
        <MetricsCard title="Avg. Length of Stay" value={placeholder.avgLengthOfStayDays ?? "—"} subtitle="days" />
        <MetricsCard title="Intake Coverage" value={`${placeholder.intakeCoveragePct}%`} />
      </div>
    </main>
  );
}
