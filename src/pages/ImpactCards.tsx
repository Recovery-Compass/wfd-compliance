import React, { useEffect, useRef } from "react";

const CARDS = [
  { file: "/impact-cards/impact-card-1.svg", title: "Card 1 — 87% Housing" },
  { file: "/impact-cards/impact-card-2.svg", title: "Card 2 — Pet Support" },
  { file: "/impact-cards/impact-card-3.svg", title: "Card 3 — Staff Celebration" },
];

import { BrandShell } from "@/components/BrandShell";

export default function ImpactCards() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // No-op; placeholder if we later add client-side PNG export
  }, []);

  return (
    <BrandShell>
      <div style={{ padding: 8 }}>
        <div className="wfd-header" style={{ marginBottom: 12 }}>
          <h1 style={{ margin: 0 }}>Impact Story Cards (1080×1080)</h1>
        </div>
      <p style={{ marginTop: 0, color: "#555" }}>
        Right-click an image to save as SVG, or open in a new tab and export to PNG using your system tools.
      </p>
      <div ref={container} style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {CARDS.map((c) => (
          <div key={c.file} style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
            <img src={c.file} alt={c.title} style={{ width: "100%", display: "block" }} />
            <div style={{ padding: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{c.title}</span>
              <a href={c.file} download>
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </BrandShell>
  );
}