import React from "react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function MetricsCard({ title, value, subtitle }: MetricsCardProps) {
  return (
    <article className="card-minimal p-6">
      <h3 className="text-headline mb-2">{title}</h3>
      <div className="text-kpi-value text-foreground">{typeof value === "number" ? value.toLocaleString("en-US") : value}</div>
      {subtitle && (
        <div className="text-caption text-muted-foreground mt-2">{subtitle}</div>
      )}
    </article>
  );
}

export default MetricsCard;
