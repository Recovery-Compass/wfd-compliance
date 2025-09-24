import React, { useEffect, useState } from "react";
import { featureFlags } from "@/lib/featureFlags";
import { Link } from "react-router-dom";

// Data shape served from /content/data-story.json
// {
//   "title": "Journey to Housing Stability",
//   "subtitle": "How WFD supports clients through each milestone",
//   "sections": [
//     { "heading": "Intake & Trust", "body": "We begin by listening and building trust..." },
//     { "heading": "Training & Support", "body": "Clients receive tailored training and support..." },
//     { "heading": "Housing & Follow-up", "body": "We celebrate move-ins and track long-term outcomes..." }
//   ]
// }

type StorySection = { heading: string; body: string };
interface StoryDoc {
  title: string;
  subtitle?: string;
  sections: StorySection[];
}

const DataStory: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<StoryDoc | null>(null);

  const enabled = featureFlags.dataStory;

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch("/content/data-story.json", { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as StoryDoc;
        if (active) setStory(json);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load story");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [enabled]);

  if (!enabled) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Data Story</h1>
        <p className="text-gray-600 mb-4">This module is currently disabled.</p>
        <p className="text-sm text-gray-500 mb-4">
          Enable it by setting <code>VITE_FEATURE_DATA_STORY=1</code> in your environment.
        </p>
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6">Loading story…</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600 font-medium">Failed to load story: {error}</div>
        <div className="mt-2">
          <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{story?.title}</h1>
        {story?.subtitle && (
          <p className="text-gray-600 mt-2">{story.subtitle}</p>
        )}
      </div>

      <div className="space-y-6">
        {story?.sections?.map((s, idx) => (
          <section key={idx} className="border rounded p-4">
            <h2 className="text-xl font-semibold mb-2">{s.heading}</h2>
            <p className="text-gray-700 leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8">
        <Link className="text-blue-600 underline" to="/engage">Back to Engagement Hub</Link>
      </div>
    </div>
  );
};

export default DataStory;
