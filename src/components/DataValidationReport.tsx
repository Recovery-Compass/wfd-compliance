import React from "react";

interface DataValidationReportProps {
  coveragePct: number; // IntakeDate coverage
  issues: Array<{ kind: string; message: string; sampleIds?: string[] }>;
}

export function DataValidationReport({ coveragePct, issues }: DataValidationReportProps) {
  return (
    <section className="space-y-4">
      <div className="card-minimal p-6">
        <h3 className="text-headline mb-2">Intake Date Coverage</h3>
        <div className="text-kpi-value">{coveragePct.toFixed(1)}%</div>
        <div className="text-caption text-muted-foreground mt-1">
          Target: ≥ 80%
        </div>
      </div>

      <div className="card-minimal p-6">
        <h3 className="text-headline mb-3">Validation Issues</h3>
        {issues.length === 0 ? (
          <div className="text-body text-muted-foreground">No issues detected.</div>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {issues.map((i, idx) => (
              <li key={idx}>
                <span className="font-medium">{i.kind}:</span> {i.message}
                {i.sampleIds?.length ? (
                  <span className="text-caption text-muted-foreground ml-2">
                    examples: {i.sampleIds.slice(0, 5).join(", ")}
                    {i.sampleIds.length > 5 ? "…" : ""}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default DataValidationReport;
