import React, { useEffect, useState } from "react";
import { featureFlags } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

type Honoree = {
  name: string;
  achievement: string;
  date?: string;
  avatarUrl?: string;
};

interface WallDoc {
  title: string;
  honorees: Honoree[];
}

const WallOfFame: React.FC = () => {
  const enabled = featureFlags.wallOfFame;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WallDoc | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch("/content/wall-of-fame.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as WallDoc;
        if (active) setData(json);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load wall of fame");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [enabled]);

  if (!enabled) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Wall of Fame</h1>
        <p className="text-gray-600 mb-4">This module is currently disabled.</p>
        <p className="text-sm text-gray-500 mb-4">
          Enable it by setting <code>VITE_FEATURE_WALL_OF_FAME=1</code> in your environment.
        </p>
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    );
  }

  if (loading) return <div className="p-6">Loading honorees…</div>;
  if (error) return (
    <div className="p-6">
      <div className="text-red-600 font-medium">Failed to load: {error}</div>
      <div className="mt-2"><Link className="text-blue-600 underline" to="/engage">Back</Link></div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{data?.title || "Wall of Fame"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.honorees?.map((h, idx) => (
          <div key={idx} className="border rounded p-4 flex items-center gap-4">
            {h.avatarUrl ? (
              <img src={h.avatarUrl} alt={h.name} className="w-14 h-14 rounded-full object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">{h.name[0]}</div>
            )}
            <div>
              <div className="font-semibold">{h.name}</div>
              <div className="text-gray-700">{h.achievement}</div>
              {h.date && <div className="text-xs text-gray-500">{h.date}</div>}
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

export default WallOfFame;
