import React, { useEffect, useMemo, useRef, useState } from "react";

type Photo = {
  id: string;
  name: string;
  url: string;
  votes: number;
};

const sampleNames = [
  "Max", "Bella", "Charlie", "Luna", "Lucy", "Cooper", "Milo",
];

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function PetContest() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rotTimer = useRef<number | null>(null);

  // Auto-rotate spotlight every 3 seconds
  useEffect(() => {
    rotTimer.current = window.setInterval(() => {
      setActiveIndex((i) => (photos.length ? (i + 1) % photos.length : 0));
    }, 3000);
    return () => {
      if (rotTimer.current) window.clearInterval(rotTimer.current);
    };
  }, [photos.length]);

  const leader = useMemo(() => {
    if (!photos.length) return undefined;
    return [...photos].sort((a, b) => b.votes - a.votes)[0];
  }, [photos]);

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    addFiles(files);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files ?? []);
    addFiles(files);
  }

  function addFiles(files: File[]) {
    const next: Photo[] = files
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 12)
      .map((f) => ({
        id: makeId(),
        name: f.name,
        url: URL.createObjectURL(f),
        votes: Math.floor(Math.random() * 10),
      }));
    // Seed with sample placeholders if nothing provided
    if (!next.length && photos.length === 0) {
      const seeded: Photo[] = Array.from({ length: 6 }).map((_, i) => ({
        id: makeId(),
        name: sampleNames[i % sampleNames.length],
        url: `https://placekitten.com/${320 + i}/${320 + i}`,
        votes: Math.floor(Math.random() * 10),
      }));
      setPhotos(seeded);
      return;
    }
    setPhotos((p) => [...p, ...next].slice(0, 20));
  }

  function vote(id: string) {
    setPhotos((p) => p.map((ph) => (ph.id === id ? { ...ph, votes: ph.votes + 1 } : ph)));
  }

  return (
    <div>
      <div className="wfd-header" style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong>Pet Photo Contest</strong>
        <span>
          Total votes: <span className="text-gradient-wfd">{photos.reduce((a, b) => a + b.votes, 0)}</span>
        </span>
      </div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        style={{
          border: "2px dashed #9aa3b2",
          padding: 16,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <strong>Upload or drop photos</strong>
        <input type="file" accept="image/*" multiple onChange={onFileInput} />
        <span style={{ color: "#777" }}>(simulation only; files stay in browser)</span>
      </div>

      <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <h3 style={{ marginTop: 0 }}>Leaderboard</h3>
          {!photos.length && <p>Add photos to start the contest.</p>}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {photos
              .sort((a, b) => b.votes - a.votes)
              .map((p) => (
                <li
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "6px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <img src={p.url} alt={p.name} width={48} height={48} style={{ objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: "#666" }}>{p.votes} votes</div>
                  </div>
                  <button onClick={() => vote(p.id)}>Vote</button>
                </li>
              ))}
          </ul>
        </div>
        <div style={{ flex: "1 1 300px" }}>
          <h3 style={{ marginTop: 0 }}>Current Leader</h3>
          {leader ? (
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
              <img
                src={leader.url}
                alt={leader.name}
                style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 6 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <strong>{leader.name}</strong>
                <span>{leader.votes} votes</span>
              </div>
            </div>
          ) : (
            <p>No leader yet.</p>
          )}
        </div>
        <div style={{ flex: "1 1 300px" }}>
          <h3 style={{ marginTop: 0 }}>Rotating Gallery</h3>
          {photos.length ? (
            <div>
              <img
                src={photos[activeIndex]?.url}
                alt={photos[activeIndex]?.name}
                style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 6 }}
              />
              <div style={{ marginTop: 8, color: "#666" }}>{photos[activeIndex]?.name}</div>
            </div>
          ) : (
            <p>Upload a few photos to see the gallery rotate.</p>
          )}
        </div>
      </div>
    </div>
  );
}