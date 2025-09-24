import React, { useEffect, useMemo, useRef, useState } from "react";
import { featureFlags } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

type FeedEvent = {
  id: string;
  ts: string; // ISO timestamp
  type: "badge_awarded" | "move_in" | "milestone" | "shoutout";
  actor: string;
  message: string;
  icon?: string; // emoji or URL
  link?: string; // optional route/URL
};

interface FeedDoc {
  title: string;
  events: FeedEvent[];
}

const LiveFeed: React.FC = () => {
  const enabled = featureFlags.liveFeed;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<"all" | FeedEvent["type"]>("all");
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const pollRef = useRef<number | null>(null);

  const loadOnce = async () => {
    try {
      const res = await fetch("/content/live-feed.json", { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as FeedDoc;
      // Deduplicate by id + ts; newest first
      setEvents((prev) => {
        const merged = [...prev, ...(json.events || [])];
        const key = (e: FeedEvent) => `${e.id}|${e.ts}`;
        const map = new Map<string, FeedEvent>();
        for (const e of merged) map.set(key(e), e);
        return Array.from(map.values()).sort((a, b) => b.ts.localeCompare(a.ts));
      });
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) return;
    loadOnce();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    if (paused) {
      if (pollRef.current) window.clearInterval(pollRef.current);
      pollRef.current = null;
      return;
    }
    // Poll every 12s
    pollRef.current = window.setInterval(() => {
      loadOnce();
    }, 12000) as unknown as number;
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, [enabled, paused]);

  const filtered = useMemo(() => {
    const list = events || [];
    if (filter === "all") return list;
    return list.filter((e) => e.type === filter);
  }, [events, filter]);

  if (!enabled) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Live Community Feed</h1>
        <p className="text-gray-600 mb-4">This module is currently disabled.</p>
        <p className="text-sm text-gray-500 mb-4">
          Enable it by setting <code>VITE_FEATURE_LIVE_FEED=1</code> in your environment.
        </p>
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    );
  }

  if (loading) return <div className="p-6">Loading live feed…</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Live Community Feed</h1>
        <div className="flex items-center gap-3">
          <select
            aria-label="Filter events"
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="badge_awarded">Badges</option>
            <option value="move_in">Move-ins</option>
            <option value="milestone">Milestones</option>
            <option value="shoutout">Shoutouts</option>
          </select>
          <button
            className="border rounded px-3 py-1 text-sm"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 border border-yellow-300 bg-yellow-50 text-sm text-yellow-800 rounded">
          Warning: {error}. Retrying automatically.
        </div>
      )}

      <ul role="list" className="space-y-3">
        {filtered.slice(0, 50).map((e) => (
          <li key={`${e.id}|${e.ts}`} className="border rounded p-3 flex items-start gap-3">
            {e.icon ? (
              e.icon.startsWith("http") ? (
                <img src={e.icon} alt="" className="w-8 h-8" />
              ) : (
                <div className="text-2xl" aria-hidden>{e.icon}</div>
              )
            ) : (
              <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500">✨</div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{e.actor}</div>
                <time className="text-xs text-gray-500" dateTime={e.ts}>
                  {new Date(e.ts).toLocaleString()}
                </time>
              </div>
              <div className="text-gray-800">{e.message}</div>
              {e.link && (
                <div className="mt-1">
                  <a className="text-blue-600 underline text-sm" href={e.link}>View</a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {filtered.length > 50 && (
        <div className="text-xs text-gray-500 mt-3">Showing latest 50 items</div>
      )}

      <div className="mt-8">
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    </div>
  );
};

export default LiveFeed;
