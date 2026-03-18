import DollSVG from "../components/DollSVG.jsx";
import { initAudio, playClick } from "../sound.js";

export default function HomeScreen({ onStart }) {
  const steps = [
    { emoji: "✏️", label: "DESIGN", color: "var(--coral)" },
    { emoji: "🏭", label: "FACTORY", color: "var(--navy)" },
    { emoji: "🚢", label: "SHIP", color: "#00C9A7" },
    { emoji: "💰", label: "SALES", color: "#22C55E" },
  ];

  const dolls = [
    { hairStyle: "Bob", hairColor: "Dark", skinTone: "Light", outfit: "Pink Dress" },
    { hairStyle: "Twin Tails", hairColor: "Pink", skinTone: "Medium", outfit: "Blue Plaid" },
    { hairStyle: "Long Straight", hairColor: "Blonde", skinTone: "Deep", outfit: "Gray Jumper" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--coral) 0%, #FF6B8A 50%, var(--coral) 100%)",
          padding: "48px 20px 36px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(255,255,255,.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -60, left: -30, width: 160, height: 160, background: "rgba(0,0,0,.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 20, left: 20, width: 60, height: 60, background: "var(--navy)", opacity: 0.12, borderRadius: 8 }} />
        {/* Sparkle particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 4 + Math.random() * 6,
              height: 4 + Math.random() * 6,
              borderRadius: "50%",
              background: ["#FFD34E", "#fff", "#FFB5C8", "#A8E6CF"][i % 4],
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              opacity: 0.6,
              animation: `sparkleFloat ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        <h1 style={{ fontFamily: "'Black Han Sans',cursive", fontSize: "3.4rem", color: "var(--white)", lineHeight: 0.95, margin: "0 0 4px", textShadow: "3px 3px 0 var(--coral-dk)" }}>
          DELLA'S DOLL
          <br />
          COMPANY
        </h1>
        <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: ".72rem", letterSpacing: "4px", color: "rgba(255,255,255,.7)", marginBottom: 28 }}>
          HOW TOYS ARE MADE
        </div>

        {/* Hero dolls with sway */}
        <div style={{ display: "inline-flex", gap: 14, marginBottom: 28 }}>
          {dolls.map((d, i) => (
            <div
              key={i}
              className="doll-sway"
              style={{
                background: "rgba(255,255,255,.12)",
                borderRadius: 12,
                padding: "10px 8px",
                border: "1.5px solid rgba(255,255,255,.25)",
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <DollSVG cfg={{ name: "", ...d, body: "Plastic" }} size={72} />
            </div>
          ))}
        </div>
        <br />
        <button
          className="gbtn pulse"
          style={{
            margin: "0 auto",
            background: "var(--white)",
            color: "var(--coral)",
            boxShadow: "4px 4px 0 var(--coral-dk)",
            fontSize: "1.25rem",
            display: "inline-block",
          }}
          onClick={() => {
            initAudio();
            playClick();
            onStart();
          }}
        >
          LET'S BUILD! →
        </button>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".75rem", marginTop: 12, letterSpacing: "1px" }}>
          ABOUT 10 MINUTES · NO WRONG ANSWERS
        </p>
      </div>

      {/* STEPS */}
      <div style={{ background: "var(--navy)", padding: "20px 16px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(255,255,255,.08)",
                    border: "1.5px solid rgba(255,255,255,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    marginBottom: 5,
                  }}
                >
                  {s.emoji}
                </div>
                <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: ".68rem", color: "rgba(255,255,255,.7)", letterSpacing: "1.5px" }}>
                  {s.label}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 14, height: 2, background: "rgba(255,255,255,.2)", flexShrink: 0, marginBottom: 18, borderRadius: 1 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TAGLINE */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px", textAlign: "center" }}>
        <div>
          <p style={{ fontFamily: "'Black Han Sans',cursive", fontSize: "1.2rem", color: "var(--navy)", marginBottom: 8 }}>
            Design. Build. Ship. Sell.
          </p>
          <p style={{ color: "var(--mid)", maxWidth: 320, margin: "0 auto", lineHeight: 1.6, fontSize: ".9rem" }}>
            Learn how real toy companies decide what to make, where to build it, and how to make a profit — all in one fun simulation!
          </p>
        </div>
      </div>
    </div>
  );
}
