import { useState, useEffect } from "react";
import DollPreview from "../components/DollPreview.jsx";
import { playFanfare } from "../sound.js";

export default function UnboxingReveal({ doll, onDone }) {
  const [stage, setStage] = useState(0); // 0=drop, 1=shake, 2=open, 3=reveal

  const cfg = {
    hairStyle: doll.hairStyle?.id || "",
    hairColor: doll.hairColor?.id || "",
    skinTone: doll.skinTone?.id || "",
    outfit: doll.outfit?.id || "",
    body: doll.body?.id || "",
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => { setStage(3); playFanfare(); }, 2200),
      setTimeout(() => onDone(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background sparkles */}
      {stage >= 2 &&
        [...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 6 + Math.random() * 8,
              height: 6 + Math.random() * 8,
              borderRadius: "50%",
              background: ["#FFD34E", "#FF85B3", "#A8E6CF", "#C3B1E1", "#E8354A"][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkleFloat ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random()}s`,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* Box + Doll */}
      <div
        style={{
          position: "relative",
          width: 200,
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {stage < 3 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: 160,
              height: 200,
              background: "linear-gradient(135deg, var(--coral) 0%, #FF6B8A 100%)",
              borderRadius: 16,
              border: "3px solid var(--coral-dk)",
              boxShadow: "6px 6px 0 var(--coral-dk)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              animation: stage === 1 ? "boxShake .15s ease-in-out infinite" : "none",
            }}
          >
            <div style={{ position: "absolute", width: 20, height: "100%", background: "var(--gold)", opacity: 0.5 }} />
            <div style={{ position: "absolute", width: "100%", height: 20, background: "var(--gold)", opacity: 0.5, top: "40%" }} />
            <div style={{ position: "absolute", top: "35%", fontSize: "2.5rem", zIndex: 2 }}>🎀</div>
            {stage === 2 && (
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "50%",
                  background: "var(--coral)",
                  borderRadius: "16px 16px 0 0",
                  transformOrigin: "top center",
                  animation: "lidOpen .5s ease forwards",
                }}
              />
            )}
          </div>
        )}

        {stage === 0 && (
          <div style={{ position: "absolute", top: -50, animation: "dollDrop .5s ease-in forwards" }}>
            <DollPreview cfg={cfg} size={80} animated={false} />
          </div>
        )}

        {stage === 3 && (
          <div style={{ animation: "dollRise .6s ease-out forwards", textAlign: "center" }}>
            <DollPreview cfg={cfg} size={160} animated={true} />
            <div
              style={{
                fontFamily: "'Black Han Sans',cursive",
                fontSize: "1.6rem",
                color: "var(--navy)",
                marginTop: 8,
                animation: "sup .4s ease .3s both",
              }}
            >
              {doll.name}
            </div>
            <div
              style={{
                fontFamily: "'Black Han Sans',cursive",
                fontSize: ".85rem",
                color: "var(--coral)",
                letterSpacing: "3px",
                marginTop: 4,
                animation: "sup .4s ease .5s both",
              }}
            >
              IS READY!
            </div>
          </div>
        )}
      </div>

      {stage < 3 && (
        <div
          style={{
            fontFamily: "'Black Han Sans',cursive",
            fontSize: "1.2rem",
            color: "var(--navy)",
            marginTop: 24,
            opacity: 0.7,
          }}
        >
          {stage === 0 && "Wrapping up your design..."}
          {stage === 1 && "Something special inside! ✨"}
          {stage === 2 && "Opening..."}
        </div>
      )}

      <style>{`
        @keyframes dollDrop {
          from { transform: translateY(0) scale(0.5); opacity: 0; }
          to { transform: translateY(120px) scale(0.4); opacity: 0; }
        }
        @keyframes boxShake {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes lidOpen {
          from { transform: perspective(400px) rotateX(0); }
          to { transform: perspective(400px) rotateX(-90deg); opacity: 0; }
        }
        @keyframes dollRise {
          from { transform: translateY(60px) scale(0.5); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
