import { useState, useEffect } from "react";

export default function Confetti({ on }) {
  if (!on) return null;
  const c = ["#E8354A", "#1A2690", "#FFD34E", "#4ADE80", "#FF9F0A", "#C084FC", "#FFB5C8", "#A8E6CF"];
  return (
    <div className="confbox">
      {Array.from({ length: 56 }).map((_, i) => (
        <div
          key={i}
          className="cp"
          style={{
            left: `${Math.random() * 100}%`,
            background: c[i % c.length],
            width: `${6 + Math.random() * 10}px`,
            height: `${6 + Math.random() * 10}px`,
            borderRadius: Math.random() > 0.4 ? "50%" : "3px",
            animationDuration: `${1.2 + Math.random() * 2.2}s`,
            animationDelay: `${Math.random() * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}
