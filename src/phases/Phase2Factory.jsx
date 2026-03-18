import { useState, useEffect } from "react";
import OptionGrid from "../components/OptionGrid.jsx";
import WorldMap from "../components/WorldMap.jsx";
import { playClick, playSuccess } from "../sound.js";
import {
  QTY_OPTS, FACTORY_OPTS, SHIP_OPTS_ALL, BOX_OPTS,
  SHIP_TIMES, PR,
} from "../constants.js";

/* ══════════════════════════════════════
   PHASE 2 — FACTORY DECISIONS
   Quantity, factory location, shipping, packaging
   ══════════════════════════════════════ */

/* ── Inline ShippingTimeDisplay ── */
function ShippingTimeDisplay({ factory, ship }) {
  /* No factory selected */
  if (!factory) {
    return (
      <div className="ship-pill">
        <span style={{ fontSize: "1.25rem" }}>⏳</span>
        <span style={{ color: "var(--mid)", fontSize: ".86rem" }}>
          Pick a factory location first to see shipping times
        </span>
      </div>
    );
  }

  /* Factory selected but no ship */
  if (!ship) {
    return (
      <div className="ship-pill">
        <span style={{ fontSize: "1.25rem" }}>{factory.flag}</span>
        <span style={{ color: "var(--mid)", fontSize: ".86rem" }}>
          Now pick a shipping method to see how long it takes!
        </span>
      </div>
    );
  }

  /* Truck from China — not available */
  const time = SHIP_TIMES[factory.id]?.[ship.id];
  if (!time) {
    return (
      <div className="ship-pill" style={{ borderColor: "var(--coral)" }}>
        <span style={{ fontSize: "1.25rem" }}>🚫</span>
        <span style={{ color: "var(--coral)", fontSize: ".86rem" }}>
          <b>Truck not available</b> from {factory.id} — too far!
        </span>
      </div>
    );
  }

  /* Ship selected — show animated route */
  const isAir = ship.id === "Air Freight";
  const isTruck = ship.id === "Truck";
  const color = isAir ? "var(--coral)" : isTruck ? "#F59E0B" : "var(--navy)";
  const anim = isAir ? "flyplane" : isTruck ? "drivetruck" : "rockship";

  return (
    <div className="ship-pill live">
      <span className={anim} style={{ fontSize: "1.4rem" }}>{ship.emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: ".72rem", color: "var(--mid)" }}>
          {factory.id} → 🇺🇸 USA via {ship.id}
        </div>
        <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: "1.1rem", color }}>
          ⏱ {time}
        </div>
      </div>
    </div>
  );
}

export default function Phase2Factory({ doll, onCostChange, onDone }) {
  /* ── State ── */
  const [qty, setQty] = useState(null);
  const [factory, setFactory] = useState(null);
  const [ship, setShip] = useState(null);
  const [box, setBox] = useState(null);

  const p = PR;

  /* ── Ship options: filter truck for China ── */
  const shipOpts = factory?.id === "China"
    ? SHIP_OPTS_ALL.filter((s) => !s.usaOnly)
    : SHIP_OPTS_ALL;

  /* ── Cost calculation ── */
  const perDoll = +(
    (doll.baseCost * (qty?.mult || 1)) +
    (factory?.labor || 0) +
    (ship?.cost || 0) +
    (box?.cost || 0)
  ).toFixed(2);

  useEffect(() => {
    onCostChange(perDoll);
  }, [perDoll]);

  /* ── Factory change handler: reset truck if switching to China ── */
  const handleFactory = (f) => {
    setFactory(f);
    if (ship?.usaOnly && f.id === "China") {
      setShip(null);
    }
    playClick();
  };

  const allSelected = qty && factory && ship && box;

  const handleDone = () => {
    playSuccess();
    onDone({ qty, factory, ship, box, perDoll });
  };

  /* ── Render ── */
  return (
    <div className="slide">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span className="step-pill">🏭 Step 2 of 4</span>
      </div>
      <h1 className="big-title">Run the Factory</h1>
      <p className="sub">Where to build, how many to make, how to ship {p.obj}</p>

      {/* Quantity */}
      <div className="card">
        <div className="card-title">📊 How many {doll.name}s?</div>
        <div className="fact">
          💡 <b>The more you order, the cheaper each one gets!</b> Machines cost the same to run
          for 10 or 10,000 — that's called a <b>bulk discount</b>!
        </div>
        <OptionGrid list={QTY_OPTS} val={qty} set={setQty} />
      </div>

      {/* Factory Location */}
      <div className="card">
        <div className="card-title">🌍 Where should the factory be?</div>
        <div className="fact">
          💡 Workers in different countries earn different wages — that's the main reason most toys
          are made overseas!
        </div>
        <WorldMap factory={factory} />
        {/* Manual 3-column grid for factories (flag, not emoji) */}
        <div className="ogrid3" style={{ marginTop: 10 }}>
          {FACTORY_OPTS.map((o) => (
            <button
              key={o.id}
              className={`obtn${factory?.id === o.id ? " on" : ""}`}
              onClick={() => handleFactory(o)}
            >
              <span className="oe">{o.flag}</span>
              {o.id}
              <span
                style={{
                  display: "block",
                  fontSize: ".7rem",
                  color: factory?.id === o.id ? "rgba(255,255,255,.5)" : "var(--mid)",
                  marginTop: 2,
                }}
              >
                {o.desc}
              </span>
              <span className="oc">${o.labor.toFixed(2)}/doll labor</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shipping Method */}
      <div className="card">
        <div className="card-title">🚚 How do you ship the dolls?</div>
        <div className="fact">
          💡 A cargo ship takes weeks but costs almost nothing extra per doll. A plane is fast but
          nearly 8× more expensive!
        </div>
        <ShippingTimeDisplay factory={factory} ship={ship} />
        <OptionGrid list={shipOpts} val={ship} set={setShip} three={true} />
      </div>

      {/* Box Type */}
      <div className="card">
        <div className="card-title">📦 What kind of box?</div>
        <div className="fact">
          💡 A great box makes kids want to grab it off the shelf — stores call this{" "}
          <b>shelf appeal</b>!
        </div>
        <OptionGrid list={BOX_OPTS} val={box} set={setBox} three={true} />
      </div>

      {/* YOUR PLAN summary card */}
      {allSelected && (
        <div className="card slide" style={{ background: "var(--navy)", border: "none" }}>
          <div
            style={{
              fontFamily: "'Black Han Sans',cursive",
              fontSize: ".88rem",
              color: "rgba(255,255,255,.6)",
              marginBottom: 6,
              letterSpacing: "2px",
            }}
          >
            YOUR PLAN
          </div>
          <p style={{ fontSize: ".95rem", lineHeight: 1.7, color: "rgba(255,255,255,.85)" }}>
            <b style={{ color: "var(--gold)" }}>{qty.id} {doll.name}s</b> · built in{" "}
            <b style={{ color: "#8EA3FF" }}>{factory.id}</b> · shipped by{" "}
            <b style={{ color: "#6EE7B7" }}>{ship.id}</b> {ship.emoji} · in a{" "}
            <b style={{ color: "var(--gold)" }}>{box.id}</b>
          </p>
          <div
            style={{
              fontFamily: "'Black Han Sans',cursive",
              fontSize: "1.5rem",
              color: "var(--gold)",
              marginTop: 8,
            }}
          >
            ${perDoll.toFixed(2)} per doll
          </div>
        </div>
      )}

      {/* CTA */}
      <button className="gbtn" disabled={!allSelected} onClick={handleDone}>
        Start the Journey →
      </button>
    </div>
  );
}
