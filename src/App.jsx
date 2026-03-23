import { useState } from "react";
import { FONTS, css } from "./design-system.js";
import { isMuted, setMuted, initAudio } from "./sound.js";
import CostBadge from "./components/CostBadge.jsx";
import HomeScreen from "./phases/HomeScreen.jsx";
import Phase1Design from "./phases/Phase1Design.jsx";
import UnboxingReveal from "./phases/UnboxingReveal.jsx";
import Phase2Factory from "./phases/Phase2Factory.jsx";
import Phase3Journey from "./phases/Phase3Journey.jsx";
import Phase4Sales from "./phases/Phase4Sales.jsx";
import { JPBadge, SiteFooter } from "./components/SiteBadge.jsx";

export default function App() {
  const [phase, setPhase] = useState(0);
  const [doll, setDoll] = useState(null);
  const [biz, setBiz] = useState(null);
  const [cost, setCost] = useState(0);
  const [mute, setMute] = useState(false);

  const goPhase = (n) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPhase(n);
  };

  const restart = () => {
    setDoll(null);
    setBiz(null);
    setCost(0);
    goPhase(0);
  };

  const toggleMute = () => {
    const next = !mute;
    setMute(next);
    setMuted(next);
  };

  return (
    <>
      <style>{FONTS}{css}</style>
      <div className="app" onClick={() => initAudio()}>
        <JPBadge />

        {/* Sound mute toggle */}
        {phase > 0 && (
          <button className="mute-btn" onClick={toggleMute} title={mute ? "Unmute" : "Mute"}>
            {mute ? "🔇" : "🔊"}
          </button>
        )}

        {/* Cost badge */}
        {phase > 0 && phase !== 1.5 && <CostBadge cost={cost} />}

        {/* Phases */}
        {phase === 0 && <HomeScreen onStart={() => goPhase(1)} />}

        {phase === 1 && (
          <div className="wrap">
            <Phase1Design
              onCostChange={setCost}
              onDone={(d) => {
                setDoll(d);
                setCost(d.baseCost);
                goPhase(1.5); // unboxing
              }}
            />
          </div>
        )}

        {phase === 1.5 && doll && (
          <UnboxingReveal doll={doll} onDone={() => goPhase(2)} />
        )}

        {phase === 2 && doll && (
          <div className="wrap">
            <Phase2Factory
              doll={doll}
              onCostChange={setCost}
              onDone={(b) => {
                setBiz(b);
                setCost(b.perDoll);
                goPhase(3);
              }}
            />
          </div>
        )}

        {phase === 3 && doll && biz && (
          <div className="wrap">
            <Phase3Journey
              doll={doll}
              biz={biz}
              onDone={() => {
                const t =
                  doll.baseCost * biz.qty.mult +
                  biz.factory.labor +
                  biz.ship.cost +
                  biz.box.cost;
                setCost(+(t * 2.0 * 2.0).toFixed(2));
                goPhase(4);
              }}
            />
          </div>
        )}

        {phase === 4 && doll && biz && (
          <div className="wrap">
            <Phase4Sales doll={doll} biz={biz} onRestart={restart} />
          </div>
        )}
      </div>
    </>
  );
}
