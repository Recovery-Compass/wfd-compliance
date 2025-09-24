import React, { useEffect, useMemo, useState } from "react";
import { featureFlags } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

type Entry = {
  id: string;
  name: string;      // participant name or team
  pet: string;       // pet name
  points: number;    // score
  avatarUrl?: string;
};

interface BoardDoc {
  title: string;
  entries: Entry[];
}

const PetLeaderboard: React.FC = () => {
  const enabled = featureFlags.petLeaderboard;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BoardDoc | null>(null);
  const [sortBy, setSortBy] = useState<"points" | "name" | "pet">("points");

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch("/content/pet-leaderboard.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as BoardDoc;
        if (active) setData(json);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load leaderboard");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [enabled]);

  const sorted = useMemo(() => {
    const arr = data?.entries ? [...data.entries] : [] as Entry[];
    if (sortBy === "points") arr.sort((a, b) => b.points - a.points);
    else if (sortBy === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    else arr.sort((a, b) => a.pet.localeCompare(b.pet));
    return arr;
  }, [data?.entries, sortBy]);

  if (!enabled) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Pet Leaderboard</h1>
        <p className="text-gray-600 mb-4">This module is currently disabled.</p>
        <p className="text-sm text-gray-500 mb-4">
          Enable it by setting <code>VITE_FEATURE_PET_LEADERBOARD=1</code> in your environment.
        </p>
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    );
  }

  if (loading) return <div className="p-6">Loading leaderboard…</div>;
  if (error) return (
    <div className="p-6">
      <div className="text-red-600 font-medium">Failed to load: {error}</div>
      <div className="mt-2"><Link className="text-blue-600 underline" to="/engage">Back</Link></div>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{data?.title || "Pet Leaderboard"}</h1>
        <div className="text-sm">
          <label className="mr-2 text-gray-600">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded px-2 py-1"
          >
            <option value="points">Points (desc)</option>
            <option value="name">Owner Name (A–Z)</option>
            <option value="pet">Pet Name (A–Z)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Rank</th>
              <th className="px-3 py-2 text-left">Owner</th>
              <th className="px-3 py-2 text-left">Pet</th>
              <th className="px-3 py-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e, idx) => (
              <tr key={e.id} className="border-t">
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2 flex items-center gap-2">
                  {e.avatarUrl ? (
                    <img src={e.avatarUrl} alt={e.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {e.name[0]}
                    </div>
                  )}
                  <span>{e.name}</span>
                </td>
                <td className="px-3 py-2">{e.pet}</td>
                <td className="px-3 py-2 font-semibold">{e.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    </div>
  );
};

export default PetLeaderboard;
