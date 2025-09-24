import React, { useEffect, useMemo, useState } from "react";
import { featureFlags } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

type Badge = {
  id: string;
  name: string;
  description?: string;
  points: number;
  icon?: string; // emoji or URL
};

interface BadgeDoc {
  title: string;
  badges: Badge[];
}

const Badges: React.FC = () => {
  const enabled = featureFlags.badges;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BadgeDoc | null>(null);
  const [sortBy, setSortBy] = useState<"points" | "name">("points");

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch("/content/badges.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as BadgeDoc;
        if (active) setData(json);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load badges");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [enabled]);

  const sortedBadges = useMemo(() => {
    if (!data?.badges) return [] as Badge[];
    const arr = [...data.badges];
    if (sortBy === "points") arr.sort((a, b) => b.points - a.points);
    else arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [data?.badges, sortBy]);

  if (!enabled) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Badges</h1>
        <p className="text-gray-600 mb-4">This module is currently disabled.</p>
        <p className="text-sm text-gray-500 mb-4">
          Enable it by setting <code>VITE_FEATURE_BADGES=1</code> in your environment.
        </p>
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    );
  }

  if (loading) return <div className="p-6">Loading badges…</div>;
  if (error) return (
    <div className="p-6">
      <div className="text-red-600 font-medium">Failed to load: {error}</div>
      <div className="mt-2"><Link className="text-blue-600 underline" to="/engage">Back</Link></div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{data?.title || "Badges"}</h1>
        <div className="text-sm">
          <label className="mr-2 text-gray-600">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded px-2 py-1"
          >
            <option value="points">Points (desc)</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedBadges.map((b) => (
          <div key={b.id} className="border rounded p-4 flex items-start gap-4">
            {b.icon ? (
              b.icon.startsWith("http") ? (
                <img src={b.icon} alt={b.name} className="w-12 h-12" />
              ) : (
                <div className="text-3xl" aria-hidden>{b.icon}</div>
              )
            ) : (
              <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-500">🏅</div>
            )}
            <div>
              <div className="font-semibold">{b.name}</div>
              {b.description && <div className="text-gray-700">{b.description}</div>}
              <div className="text-xs text-gray-500 mt-1">{b.points} pts</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    </div>
  );
};

export default Badges;
