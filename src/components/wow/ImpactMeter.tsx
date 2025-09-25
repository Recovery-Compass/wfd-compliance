import React, { useEffect, useState } from "react";

type Meter = {
  id: string;
  label: string;
  value: number;
  goal: number;
};

const INIT: Meter[] = [
  { id: "vol", label: "Volunteer hours", value: 320, goal: 500 },
  { id: "kits", label: "Hygiene kits", value: 760, goal: 1000 },
  { id: "events", label: "Outreach events", value: 18, goal: 25 },
];

function Bar({ value, goal, color }: { value: number; goal: number; color: string }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div style={{ background: "#f1f5f9", borderRadius: 8, height: 16, overflow: "hidden" }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          transition: "width 600ms ease",
        }}
      />
    </div>
  );
}

export default function ImpactMeter() {
  const [meters, setMeters] = useState<Meter[]>(INIT);
  const [celebrate, setCelebrate] = useState<string | null>(null);

  useEffect(() => {
    const hit = meters.find((m) => m.value >= m.goal);
    if (hit) {
      setCelebrate(hit.label);
      const t = window.setTimeout(() => setCelebrate(null), 2500);
      return () => window.clearTimeout(t);
    }
  }, [meters]);

  function add(id: string, amount: number) {
    setMeters((ms) =>
      ms.map((m) => (m.id === id ? { ...m, value: Math.min(m.goal, m.value + amount) } : m))
    );
  }

  return (
    <div>
      {celebrate && (
        <div style={{
          background: "#dcfce7",
          border: "1px solid #86efac",
          color: "#166534",
          padding: 8,
          borderRadius: 6,
          marginBottom: 12,
        }}>
          🎉 Goal reached: {celebrate}!
        </div>
      )}
      <div style={{ display: "grid", gap: 16 }}>
        {meters.map((m, i) => (
          <div key={m.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <strong>{m.label}</strong>
              <span>
                {m.value} / {m.goal}
              </span>
            </div>
            <Bar value={m.value} goal={m.goal} color={i === 0 ? "#1e3a5f" : i === 1 ? "#2D5F3F" : "#0ea5e9"} />
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button onClick={() => add(m.id, Math.ceil(m.goal * 0.05))}>+5%</button>
              <button onClick={() => add(m.id, Math.ceil(m.goal * 0.1))}>+10%</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}