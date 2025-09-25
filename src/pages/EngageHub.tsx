import React from "react";
import { featureFlags } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

const EngageHub: React.FC = () => {
  const items = [
    { key: "dataStory", label: "Data Story", path: "/engage/data-story" },
    { key: "wallOfFame", label: "Wall of Fame", path: "/engage/wall-of-fame" },
    { key: "badges", label: "Badges", path: "/engage/badges" },
    { key: "petLeaderboard", label: "Pet Contest Leaderboard", path: "/engage/pet-leaderboard" },
    { key: "liveFeed", label: "Live Community Feed", path: "/engage/live-feed" },
  ] as const;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Engagement Hub</h1>
      <p className="text-gray-600 mb-6">
        Shared foundation for community engagement features. Modules can be toggled
        via environment variables (VITE_FEATURE_*). Disabled modules appear as
        “coming soon”.
      </p>
      <ul className="space-y-3">
        {items.map((it) => {
          const enabled = (featureFlags as any)[it.key];
          return (
            <li key={it.key} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{it.label}</div>
                <div className="text-xs text-gray-500">
                  {enabled ? "Enabled" : "Coming soon (disabled)"}
                </div>
              </div>
              {enabled ? (
                <Link className="text-blue-600 underline" to={it.path}>Open</Link>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EngageHub;
