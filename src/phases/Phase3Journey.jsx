import { useState } from "react";
import { SHIP_TIMES, PR } from "../constants.js";
import MaterialsDrag from "../mini-games/MaterialsDrag.jsx";
import FactoryAssembly from "../mini-games/FactoryAssembly.jsx";
import QualityInspect from "../mini-games/QualityInspect.jsx";
import PackagingWrap from "../mini-games/PackagingWrap.jsx";
import ShippingRoute from "../mini-games/ShippingRoute.jsx";
import StoreArrange from "../mini-games/StoreArrange.jsx";

function getChapters(biz, doll) {
  if (!biz || !doll) return [];
  const { ship, factory, qty, box } = biz;
  const p = PR;
  const isAir = ship?.id === "Air Freight", isTruck = ship?.id === "Truck";
  const shipTime = factory?.id && ship?.id ? SHIP_TIMES[factory.id]?.[ship.id] : "a few days";

  return [
    {
      key: "materials", title: "Gathering Materials", emoji: "🌍",
      fact: `Toy materials come from all over the world! Plastic from oil refineries, fabric from cotton farms, paints from chemical factories. Even the parts for <b>${box?.id || "the box"}</b> ship in first!`,
      game: "materials",
    },
    {
      key: "factory", title: "Building on the Factory Floor", emoji: "⚙️",
      fact: `Workers in <b>${factory?.id || "the factory"}</b> put everything together. Machines mold the plastic body, people sew the outfit, and a team inspects every step.`,
      game: "factory",
    },
    {
      key: "quality", title: "Safety Check Time!", emoji: "✅",
      fact: `Every doll must pass safety tests — inspectors check for sharp edges, toxic paint, and secure hair. A doll that fails gets thrown away: wasted money!`,
      game: "quality",
    },
    {
      key: "packaging", title: "Box It Up!", emoji: "📦",
      fact: `${box?.id === "Window Box" ? `A window lets kids see ${doll.name} inside — huge for sales!` : box?.id === "Holo Box" ? "That shiny foil catches light from across the store!" : "Even a plain box has to stand out on a crowded shelf."} The box is a full design project all on its own.`,
      game: "packaging",
    },
    {
      key: "shipping",
      title: isAir ? "Wheels Up! ✈️" : isTruck ? "Hit the Road! 🚛" : "Bon Voyage! 🚢",
      emoji: isAir ? "✈️" : isTruck ? "🚛" : "🌊",
      fact: isAir
        ? `The ${qty?.id || ""} ${doll.name}s board a cargo plane! Air freight reaches the USA in just <b>${shipTime}</b> from <b>${factory?.id}</b>.`
        : isTruck
        ? `Since the factory is in <b>${factory?.id}</b>, trucks drive ${doll.name} straight to a US warehouse — about <b>${shipTime}</b> door to door.`
        : `The ${qty?.id || ""} ${doll.name}s are sealed in a container and loaded onto a cargo ship! One ship holds 20,000 containers. About <b>${shipTime}</b>.`,
      game: "shipping",
    },
    {
      key: "store", title: "Hit the Shelves!", emoji: "🏪",
      fact: `After arriving in the USA the dolls go to a warehouse, then trucks, then the store shelf. Every stop costs money — getting a toy from factory to kid is seriously complicated!`,
      game: "store",
    },
  ];
}

export default function Phase3Journey({ doll, biz, onDone }) {
  const [idx, setIdx] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const chapters = getChapters(biz, doll);
  const ch = chapters[idx];
  const isLast = idx === chapters.length - 1;

  const cfg = {
    name: doll.name,
    hairStyle: doll.hairStyle?.id || "",
    hairColor: doll.hairColor?.id || "",
    skinTone: doll.skinTone?.id || "",
    outfit: doll.outfit?.id || "",
    body: doll.body?.id || "",
  };

  const handleGameComplete = () => {
    setGameComplete(true);
    setShowFact(true);
  };

  const next = () => {
    setGameComplete(false);
    setShowFact(false);
    if (isLast) onDone();
    else setIdx((i) => i + 1);
  };

  if (!ch) return null;

  const renderGame = () => {
    switch (ch.game) {
      case "materials":
        return <MaterialsDrag onComplete={handleGameComplete} />;
      case "factory":
        return <FactoryAssembly onComplete={handleGameComplete} dollCfg={cfg} />;
      case "quality":
        return <QualityInspect onComplete={handleGameComplete} dollCfg={cfg} />;
      case "packaging":
        return <PackagingWrap onComplete={handleGameComplete} dollCfg={cfg} boxType={biz.box?.id} />;
      case "shipping":
        return <ShippingRoute onComplete={handleGameComplete} factoryId={biz.factory?.id} shipMethod={biz.ship?.id} />;
      case "store":
        return <StoreArrange onComplete={handleGameComplete} dollCfg={cfg} />;
      default:
        return null;
    }
  };

  return (
    <div className="slide" key={ch.key}>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span className="step-pill">🗺️ Step 3 of 4</span>
      </div>
      <h1 className="big-title">{doll.name}'s Journey</h1>

      {/* Progress dots */}
      <div className="dots">
        {chapters.map((c, i) => (
          <div key={c.key} className={`dot${i < idx ? " done" : i === idx ? " active" : ""}`}>
            {i < idx ? "✓" : i + 1}
          </div>
        ))}
      </div>

      {/* Chapter card */}
      <div className="card slide">
        <div className="card-title">
          {ch.emoji} {ch.title}
        </div>

        {/* Mini-game */}
        {!gameComplete && renderGame()}

        {/* Fact (shown after game complete) */}
        {showFact && (
          <div className="slide">
            <div
              className="fact"
              style={{ marginTop: 12 }}
              dangerouslySetInnerHTML={{ __html: "💡 " + ch.fact }}
            />
          </div>
        )}
      </div>

      {/* Next button */}
      {gameComplete && (
        <button className="gbtn slide" onClick={next} style={{ background: "var(--navy)" }}>
          {isLast ? "See the Sales Report →" : `Next: ${chapters[idx + 1].title} ${chapters[idx + 1].emoji}`}
        </button>
      )}
    </div>
  );
}
