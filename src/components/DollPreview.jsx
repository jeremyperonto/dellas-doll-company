import { useState, useEffect, useRef } from "react";
import DollSVG from "./DollSVG.jsx";

export default function DollPreview({ cfg, size = 120, animated = true }) {
  const [blinking, setBlinking] = useState(false);
  const blinkTimer = useRef(null);

  // Random blink every 3-6 seconds
  useEffect(() => {
    if (!animated) return;
    const scheduleBlink = () => {
      blinkTimer.current = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 150);
      }, 3000 + Math.random() * 3000);
    };
    scheduleBlink();
    return () => clearTimeout(blinkTimer.current);
  }, [animated]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className={animated ? "doll-sway" : ""}
        style={{ position: "relative" }}
      >
        <div className={blinking ? "doll-blinking" : ""}>
          <DollSVG cfg={cfg} size={size} />
        </div>
      </div>
      {cfg.name && (
        <div
          style={{
            fontFamily: "'Black Han Sans',cursive",
            fontSize: ".9rem",
            color: "var(--navy)",
            marginTop: 4,
            letterSpacing: ".5px",
            textAlign: "center",
          }}
        >
          {cfg.name}
        </div>
      )}
    </div>
  );
}
