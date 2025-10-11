import React from "react";
import ClientTable from "@/components/ClientTable";
import type { Client } from "@/types/Client";

const placeholder: Client[] = [];

export default function ClientList() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-hero">Client List (Prep)</h1>
          <p className="text-muted-foreground mt-1">
            This placeholder will display October 2025 client records when provided by WFD.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <ClientTable clients={placeholder} />
      </div>
    </main>
  );
}
