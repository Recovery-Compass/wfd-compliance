import React from "react";
import DataValidationReport from "@/components/DataValidationReport";

const placeholderIssues = [
  { kind: "MissingField", message: "Some records missing IntakeDate", sampleIds: ["C102", "C221"] },
  { kind: "DateLogic", message: "ExitDate precedes IntakeDate in 2 records", sampleIds: ["C033", "C177"] },
];

export default function DataValidation() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-hero">Data Validation (Prep)</h1>
          <p className="text-muted-foreground mt-1">
            Parity test results will appear here once October 2025 data arrives.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <DataValidationReport coveragePct={0} issues={placeholderIssues} />
      </div>
    </main>
  );
}
