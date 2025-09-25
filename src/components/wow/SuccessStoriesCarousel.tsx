import React, { useEffect, useState } from "react";

type Story = {
  id: string;
  title: string;
  quote: string;
  metric: string;
  image?: string;
};

const STORIES: Story[] = [
  {
    id: "s1",
    title: "From Tent to Keys",
    quote:
      "The right support can turn a single day into a turning point.",
    metric: "87% housing success rate in September",
    image: "https://placehold.co/600x400/1e3a5f/FFFFFF?text=Impact+Story+1",
  },
  {
    id: "s2",
    title: "Pets Are Family",
    quote: "Launching pet support means fewer impossible choices.",
    metric: "Pet support program launched",
    image: "https://placehold.co/600x400/2D5F3F/FFFFFF?text=Impact+Story+2",
  },
  {
    id: "s3",
    title: "Team Wins",
    quote: "Behind every success is a team that refuses to give up.",
    metric: "Staff celebration moment",
    image: "https://placehold.co/600x400/1e3a5f/FFFFFF?text=Impact+Story+3",
  },
];

function share(platform: "twitter" | "linkedin", story: Story) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${story.title} — ${story.metric}`);
  const twitter = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  window.open(platform === "twitter" ? twitter : linkedin, "_blank");
}

export default function SuccessStoriesCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % STORIES.length), 4000);
    return () => window.clearInterval(t);
  }, []);

  const story = STORIES[index];
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
      {story.image && (
        <img src={story.image} alt={story.title} style={{ width: "100%", maxHeight: 280, objectFit: "cover" }} />
      )}
      <div style={{ padding: 12, background: "#ffffff" }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#1E3A5F" }}>{story.title}</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{story.title}</div>
        <div style={{ marginTop: 6, fontStyle: "italic", color: "#333" }}>“{story.quote}”</div>
        <div style={{ marginTop: 6, color: "#1e3a5f", fontWeight: 600 }}>{story.metric}</div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button onClick={() => setIndex((i) => (i - 1 + STORIES.length) % STORIES.length)}>Prev</button>
          <button onClick={() => setIndex((i) => (i + 1) % STORIES.length)}>Next</button>
          <div style={{ flex: 1 }} />
          <button style={{ background: "#F4A51C", color: "#1E3A5F", border: "none", padding: "8px 10px", borderRadius: 8 }} onClick={() => share("twitter", story)}>Share on X</button>
          <button style={{ background: "#F4A51C", color: "#1E3A5F", border: "none", padding: "8px 10px", borderRadius: 8 }} onClick={() => share("linkedin", story)}>Share on LinkedIn</button>
        </div>
      </div>
    </div>
  );
}