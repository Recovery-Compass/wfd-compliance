import React from "react";
import type { Client } from "@/types/Client";

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  if (!clients?.length) {
    return (
      <div className="text-muted-foreground text-body">No clients to display yet.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-left text-caption text-muted-foreground border-b border-border">
            <th className="py-2 pr-4">Client ID</th>
            <th className="py-2 pr-4">Program</th>
            <th className="py-2 pr-4">Intake Date</th>
            <th className="py-2 pr-4">Exit Date</th>
            <th className="py-2 pr-4">Exit Destination</th>
            <th className="py-2 pr-4">Housing Placement</th>
            <th className="py-2 pr-0">Length of Stay (days)</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.clientId} className="border-b border-border">
              <td className="py-2 pr-4 font-mono">{c.clientId}</td>
              <td className="py-2 pr-4">{c.programName}</td>
              <td className="py-2 pr-4">{c.intakeDate ?? "—"}</td>
              <td className="py-2 pr-4">{c.exitDate ?? "—"}</td>
              <td className="py-2 pr-4">{c.exitDestination ?? "—"}</td>
              <td className="py-2 pr-4">{c.housingPlacementDate ?? "—"}</td>
              <td className="py-2 pr-0">{c.lengthOfStay ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;
