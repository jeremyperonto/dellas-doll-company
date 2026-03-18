import { useState, useEffect, useRef } from "react";
import DollPreview from "../components/DollPreview.jsx";
import Confetti from "../components/Confetti.jsx";
import { playCashRegister, playSadTrombone } from "../sound.js";
import {
  BODY_DEFECT, SHIP_TIMES, SHIP_WEEKS, PR,
} from "../constants.js";

/* ══════════════════════════════════════
   PHASE 4 — SALES REPORT
   Financial results, P&L, educational breakdown
   ══════════════════════════════════════ */

/* ── CountUp animation component ── */
function CountUp({ target, prefix = "$" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 1000; // 1 second

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    }

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target]);

  const display = Math.abs(value) >= 1
    ? Math.round(value).toLocaleString()
    : value.toFixed(2);

  return <>{prefix}{display}</>;
}

/* ── Format weeks helper ── */
function fw(w) {
  if (w < 1) {
    const d = Math.round(w * 7);
    return `${d} day${d !== 1 ? "s" : ""}`;
  }
  const r = Math.round(w * 10) / 10;
  return r < 2 ? `${r} wk` : `${r} wks`;
}

export default function Phase4Sales({ doll, biz, onRestart }) {
  /* ── Confetti state ── */
  const [conf, setConf] = useState(false);
  const soundPlayed = useRef(false);

  /* ── Pronouns ── */
  const p = PR;

  /* ══════════════════════════════════════
     FINANCIAL MODEL
     ══════════════════════════════════════ */
  const qty = biz.qty.qty;
  const mfgCost = +((doll.baseCost * biz.qty.mult) + biz.factory.labor + biz.ship.cost + biz.box.cost).toFixed(2);
  const wholesale = +(mfgCost * 2.0).toFixed(2);
  const retail = +(wholesale * 2.0).toFixed(2);
  const defectPct = biz.factory.defectRate + (BODY_DEFECT[doll.body?.id] || 0);
  const defects = Math.max(1, Math.round(qty * defectPct));
  const sellable = qty - defects;
  const defectLoss = +(defects * mfgCost).toFixed(2);
  const revenue = +(sellable * wholesale).toFixed(2);
  const totalMfg = +(qty * mfgCost).toFixed(2);
  const mktPct = 0.22;
  const marketing = +(revenue * mktPct).toFixed(2);
  const netProfit = +(revenue - totalMfg - marketing).toFixed(2);
  const isProfit = netProfit >= 0;
  const breakEven = Math.ceil(totalMfg / (wholesale * (1 - mktPct)));

  /* ── Timeline data ── */
  const prodW = biz.qty.prodWeeks;
  const shipW = SHIP_WEEKS[biz.factory.id]?.[biz.ship.id] || 1;
  const totalW = prodW + shipW;

  /* ── Doll preview config ── */
  const cfg = {
    name: doll.name,
    hairStyle: doll.hairStyle?.id || "",
    hairColor: doll.hairColor?.id || "",
    skinTone: doll.skinTone?.id || "",
    outfit: doll.outfit?.id || "",
    body: doll.body?.id || "",
  };

  /* ── Defect visualization ── */
  const maxI = Math.min(qty, 20);
  const scale = qty / maxI;
  const dIco = Math.max(1, Math.round(defects / scale));
  const gIco = maxI - dIco;

  /* ── Dollar breakdown slices ── */
  const matSlice = (doll.baseCost * biz.qty.mult) / retail;
  const labSlice = biz.factory.labor / retail;
  const shpSlice = biz.ship.cost / retail;
  const pkgSlice = biz.box.cost / retail;
  const mktSlice = (mktPct * wholesale) / retail;
  const storeSlice = 0.50;
  const profSlice = Math.max(0, 1 - matSlice - labSlice - shpSlice - pkgSlice - mktSlice - storeSlice);

  const slices = [
    { l: "Materials",   v: matSlice,   c: "#1A2690" },
    { l: "Labor",       v: labSlice,   c: "#E8354A" },
    { l: "Shipping",    v: shpSlice,   c: "#00C9A7" },
    { l: "Packaging",   v: pkgSlice,   c: "#FFD34E" },
    { l: "Advertising", v: mktSlice,   c: "#F59E0B" },
    { l: "Store's cut", v: storeSlice, c: "#9BA8D8" },
    { l: "Your profit", v: profSlice,  c: "#22C55E" },
  ];

  /* ── Sound + confetti on mount ── */
  useEffect(() => {
    if (soundPlayed.current) return;
    soundPlayed.current = true;

    if (isProfit) {
      setConf(true);
      playCashRegister();
      const t = setTimeout(() => setConf(false), 3400);
      return () => clearTimeout(t);
    } else {
      playSadTrombone();
    }
  }, []);

  /* ══════════════════════════════════════
     RENDER
     ══════════════════════════════════════ */
  return (
    <div className="slide">
      <Confetti on={conf} />

      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span className="step-pill">💰 Step 4 of 4</span>
      </div>
      <h1 className="big-title">The Sales Report</h1>
      <p className="sub">The real story behind making money from a toy</p>

      {/* ══════════════════════════════════════
         DOLL + PRICE BADGES
         ══════════════════════════════════════ */}
      <div style={{ display: "flex", justifyContent: "center", margin: "10px auto 4px", position: "relative", width: "fit-content" }}>
        <DollPreview cfg={cfg} size={148} />
        {/* Retail price badge */}
        <div style={{
          position: "absolute", top: -6, right: -20,
          background: "var(--coral)", color: "#fff", borderRadius: 3,
          width: 56, height: 56,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "'Black Han Sans',cursive", fontSize: ".8rem",
          border: "2.5px solid var(--coral-dk)", boxShadow: "3px 3px 0 var(--coral-dk)",
          textAlign: "center", lineHeight: 1.1,
        }}>
          <CountUp target={retail} /><br />
          <span style={{ fontSize: ".6rem", opacity: .8 }}>in store</span>
        </div>
        {/* Wholesale price badge */}
        <div style={{
          position: "absolute", bottom: -4, left: -20,
          background: "var(--navy)", color: "#fff", borderRadius: 3,
          width: 52, height: 52,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          fontFamily: "'Black Han Sans',cursive", fontSize: ".75rem",
          border: "2.5px solid var(--navy-dk)", boxShadow: "3px 3px 0 var(--navy-dk)",
          textAlign: "center", lineHeight: 1.1,
        }}>
          <CountUp target={wholesale} /><br />
          <span style={{ fontSize: ".58rem", opacity: .8 }}>you get</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
         HOW IS THE PRICE SET?
         ══════════════════════════════════════ */}
      <div className="card">
        <div className="card-title">💵 How is the price set?</div>
        <div className="fact">
          💡 {doll.name} costs <b>${mfgCost.toFixed(2)}</b> to make. You sell {p.obj} to the store
          for <b>${wholesale.toFixed(2)}</b> — that's the <b>wholesale price</b>. The store puts{" "}
          {p.obj} on the shelf for <b>${retail.toFixed(2)}</b> and keeps the difference to cover
          their own costs!
        </div>
      </div>

      {/* ══════════════════════════════════════
         TIMELINE
         ══════════════════════════════════════ */}
      <div className="card" style={{ border: "1.5px solid var(--navy)" }}>
        <div className="card-title">⏱ How long does everything take?</div>
        <div style={{ display: "flex", alignItems: "center", overflow: "auto", paddingBottom: 4 }}>
          {[
            { label: "Design", t: "1–2 wks", emoji: "✏️", c: "var(--coral)" },
            { label: "Build", t: fw(prodW), emoji: "⚙️", c: "var(--navy)" },
            { label: biz.ship.id, t: SHIP_TIMES[biz.factory.id]?.[biz.ship.id] || "?", emoji: biz.ship.emoji, c: "#00C9A7" },
            { label: "On Shelves", t: "Done!", emoji: "🏪", c: "#22C55E" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? "1 1 0" : "0 0 auto" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 64, padding: "0 2px" }}>
                <div style={{ fontSize: "1.3rem", marginBottom: 3 }}>{s.emoji}</div>
                <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: ".75rem", color: s.c, textAlign: "center", lineHeight: 1.1 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: ".65rem", color: "var(--mid)", marginTop: 2 }}>{s.t}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{
                  flex: 1, height: 2,
                  background: `linear-gradient(90deg,${s.c},${arr[i + 1].c})`,
                  minWidth: 8, margin: "0 2px", borderRadius: 1, marginTop: -12,
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{
          background: "var(--navy)", color: "var(--white)", borderRadius: 3,
          padding: "10px 14px", textAlign: "center", marginTop: 10,
        }}>
          <span style={{ fontFamily: "'Black Han Sans',cursive", fontSize: "1.05rem" }}>
            🗓 Build + {biz.ship.id} = {fw(totalW)} just to reach the store
          </span>
        </div>
        <div className="fact" style={{ marginTop: 10 }}>
          💡 That's why toy companies start planning <b>holiday toys in January</b> — by the time
          you build, ship, and stock the shelves, it's already December!
        </div>
      </div>

      {/* ══════════════════════════════════════
         DOLLAR BREAKDOWN BAR + LEGEND
         ══════════════════════════════════════ */}
      <div className="card">
        <div className="card-title">🍕 Where does every dollar go?</div>
        <div className="fact" style={{ marginBottom: 12 }}>
          💡 Every time someone pays <b>${retail.toFixed(2)}</b> for {doll.name}, that money gets
          split below. The store keeps <b>50%</b> right away. The rest comes to you — but you still
          have to cover materials, labor, shipping, packaging, and ads first!
        </div>
        {/* Bar */}
        <div className="barwrap">
          {slices.map((s) => (
            <div key={s.l} style={{ background: s.c, flex: Math.max(s.v, 0.001) }} />
          ))}
        </div>
        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 12 }}>
          {slices.map((s) => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: s.c, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: ".88rem", fontWeight: 600 }}>{s.l}</span>
              <span style={{ fontFamily: "'Black Han Sans',cursive", fontSize: ".95rem", color: s.c }}>
                <CountUp target={+(s.v * retail).toFixed(2)} />/doll
              </span>
              <span style={{ color: "var(--mid)", fontSize: ".74rem" }}>({Math.round(s.v * 100)}%)</span>
            </div>
          ))}
          {/* Total */}
          <div style={{
            borderTop: "1.5px solid var(--border)", marginTop: 3, paddingTop: 6,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--border)", flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: ".82rem", color: "var(--mid)" }}>Total retail price</span>
            <span style={{ fontFamily: "'Black Han Sans',cursive", fontSize: ".95rem", color: "var(--mid)" }}>
              ${retail.toFixed(2)}/doll
            </span>
            <span style={{ color: "var(--mid)", fontSize: ".74rem" }}>(100%)</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
         DEFECT VISUALIZATION
         ══════════════════════════════════════ */}
      <div className="card" style={{ border: "1.5px solid var(--coral)" }}>
        <div className="card-title" style={{ color: "var(--coral)" }}>⚠️ Watch Out for Broken Dolls!</div>
        <div className="fact" style={{ borderLeftColor: "var(--coral)" }}>
          💡 The factory in <b>{biz.factory.id}</b> makes about{" "}
          <b>{Math.round(biz.factory.defectRate * 100)}%</b> defective dolls.
          {(BODY_DEFECT[doll.body?.id] || 0) > 0 && (
            <> <b>{doll.body?.id}</b> adds <b>{Math.round((BODY_DEFECT[doll.body?.id] || 0) * 100)}%</b> more risk.</>
          )}
          {" "}Broken ones can't be sold — that's money gone!
        </div>
        {/* Doll icons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, margin: "12px 0", justifyContent: "center" }}>
          {Array.from({ length: gIco }).map((_, i) => (
            <span key={`g${i}`} style={{ fontSize: "1.1rem" }}>🪆</span>
          ))}
          {Array.from({ length: dIco }).map((_, i) => (
            <span key={`d${i}`} style={{ fontSize: "1.1rem", filter: "grayscale(1) opacity(.3)" }}>🪆</span>
          ))}
        </div>
        {qty > maxI && (
          <div style={{ textAlign: "center", fontSize: ".7rem", color: "var(--mid)", marginBottom: 8 }}>
            Each 🪆 ≈ {Math.round(scale)} dolls
          </div>
        )}
        {/* Defect stats */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { l: "✅ Good dolls", v: sellable.toLocaleString(), c: "#22C55E" },
            { l: "❌ Broken", v: defects.toLocaleString(), c: "var(--coral)" },
            { l: "💸 Wasted", v: "$" + defectLoss.toLocaleString(), c: "#EF4444" },
          ].map((n) => (
            <div key={n.l} style={{
              background: "var(--cream)", border: `2px solid ${n.c}`, borderRadius: 3,
              padding: "9px 14px", textAlign: "center", boxShadow: `3px 3px 0 ${n.c}33`,
            }}>
              <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: "1.45rem", color: n.c }}>
                {n.v}
              </div>
              <div style={{ fontSize: ".73rem", color: "var(--mid)" }}>{n.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
         P&L STATEMENT
         ══════════════════════════════════════ */}
      <div className="card" style={{ border: `2px solid ${isProfit ? "#22C55E" : "var(--coral)"}` }}>
        <div className="card-title" style={{ color: isProfit ? "#22C55E" : "var(--coral)" }}>
          {isProfit ? "📈 Did You Make Money?" : "📉 Uh Oh — You Lost Money!"}
        </div>
        {/* Vertical equation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {[
            { label: "Revenue", sub: `${sellable.toLocaleString()} good dolls × $${wholesale}`, v: revenue, c: "#22C55E", op: null },
            { label: "− Building cost", sub: `all ${qty.toLocaleString()} dolls × $${mfgCost.toFixed(2)}`, v: totalMfg, c: "var(--coral)", op: "minus" },
            { label: "− Ads & marketing", sub: "22% of revenue", v: marketing, c: "#F59E0B", op: "minus" },
          ].map((row, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--cream)", borderRadius: 3, padding: "10px 14px",
              border: "1.5px solid var(--border)",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: ".82rem", color: row.c }}>
                  {row.label}
                </div>
                <div style={{ fontSize: ".7rem", color: "var(--mid)", marginTop: 1 }}>{row.sub}</div>
              </div>
              <div style={{ fontFamily: "'Black Han Sans',cursive", fontSize: "1.35rem", color: row.c }}>
                <CountUp target={row.v} />
              </div>
            </div>
          ))}
          {/* Divider */}
          <div style={{ borderTop: "2px solid var(--border)", margin: "2px 0" }} />
          {/* Net result */}
          <div style={{
            textAlign: "center",
            background: isProfit ? "#F0FDF4" : "#FFF1F2",
            border: `2px solid ${isProfit ? "#22C55E" : "var(--coral)"}`,
            borderRadius: 3, padding: "14px 16px",
            boxShadow: `4px 4px 0 ${isProfit ? "#16A34A44" : "var(--coral-dk)44"}`,
          }}>
            <div style={{ fontSize: ".75rem", color: "var(--mid)", marginBottom: 2 }}>
              = Your {isProfit ? "profit" : "loss"}
            </div>
            <div style={{
              fontFamily: "'Black Han Sans',cursive", fontSize: "2.4rem",
              color: isProfit ? "#16A34A" : "var(--coral)",
            }}>
              {isProfit ? "+" : "-"}<CountUp target={Math.abs(netProfit)} />
            </div>
          </div>
        </div>

        {/* Break-even analysis */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".76rem", color: "var(--mid)", marginBottom: 5 }}>
          <span>0 sold</span>
          <span style={{ color: "var(--navy)", fontWeight: 700 }}>Break-even: {breakEven.toLocaleString()} dolls</span>
          <span>{sellable.toLocaleString()} sold</span>
        </div>
        <div style={{
          height: 18, background: "var(--cream)", borderRadius: 3,
          border: "1.5px solid var(--border)", overflow: "hidden", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${Math.min(99, (breakEven / Math.max(sellable, 1)) * 100)}%`,
            width: 2.5, background: "var(--navy)", zIndex: 2,
          }} />
          <div style={{
            height: "100%", width: "100%",
            background: "linear-gradient(90deg,var(--coral),#22C55E)", borderRadius: 2,
          }} />
        </div>
        <div className="fact" style={{ marginTop: 10 }}>
          💡 Sell <b style={{ color: "var(--navy)" }}>{breakEven.toLocaleString()} {doll.name}s</b> just
          to break even. Every doll after that is actual profit!
          {breakEven > sellable && (
            <span style={{ color: "var(--coral)" }}>
              {" "}But you only have <b>{sellable.toLocaleString()}</b> good dolls — this batch loses
              money. Try a bigger order or a factory with fewer defects!
            </span>
          )}
        </div>

        {/* Real life costs warning */}
        <div style={{
          marginTop: 12, background: "var(--cream)",
          border: "1.5px solid var(--border)", borderRadius: 3,
          padding: "10px 14px", fontSize: ".82rem", color: "var(--mid)", lineHeight: 1.6,
        }}>
          <span style={{ color: "var(--coral)", fontWeight: 700 }}>⚠️ More costs in real life: </span>
          Real companies also pay for{" "}
          <b style={{ color: "var(--black)" }}>warehouse rent, employees, returns, and taxes</b>.
          It can take years to make a profit!
        </div>
      </div>

      {/* ══════════════════════════════════════
         INSPIRATIONAL CLOSING FACT
         ══════════════════════════════════════ */}
      <div className="fact" style={{
        textAlign: "center", borderLeft: "none",
        borderTop: "3px solid var(--navy)", borderRadius: 3,
        background: "var(--navy-pale)",
      }}>
        🌟 You now know what real toy company bosses think about every single day. Making a cool
        doll is just the start — the challenge is selling it!
      </div>

      {/* ══════════════════════════════════════
         DOLL CARD — Screenshot / Share
         ══════════════════════════════════════ */}
      <div className="doll-card" style={{ position: "relative", overflow: "hidden" }}>
        {/* Decorative sparkle dots in corners */}
        {[
          { top: 8, left: 8, bg: "var(--coral)" },
          { top: 8, right: 8, bg: "var(--gold)" },
          { bottom: 8, left: 8, bg: "var(--navy)" },
          { bottom: 8, right: 8, bg: "#22C55E" },
          { top: 20, left: 20, bg: "#C084FC" },
          { top: 20, right: 20, bg: "#FF9F0A" },
          { bottom: 20, left: 20, bg: "#FFB5C8" },
          { bottom: 20, right: 20, bg: "#A8E6CF" },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: dot.bg,
              opacity: 0.6,
              ...dot,
            }}
          />
        ))}

        <div style={{
          fontFamily: "'Black Han Sans',cursive", fontSize: ".65rem",
          letterSpacing: "3px", color: "var(--coral)", marginBottom: 8,
        }}>
          DELLA'S DOLL COMPANY
        </div>
        <DollPreview cfg={cfg} size={140} animated={false} />
        {/* Stats */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center",
          fontSize: ".8rem", color: "var(--navy)", marginBottom: 8,
        }}>
          <span>🌍 Made in {biz.factory.id}</span>
          <span>💰 Cost ${mfgCost.toFixed(2)}</span>
          <span>🏷️ Sells for ${retail.toFixed(2)}</span>
          <span style={{ color: isProfit ? "#22C55E" : "var(--coral)", fontWeight: 700 }}>
            {isProfit ? "📈" : "📉"} {isProfit ? "+" : "-"}${Math.abs(netProfit).toLocaleString()} {isProfit ? "profit" : "loss"}
          </span>
        </div>
        <div style={{ fontSize: ".75rem", color: "var(--mid)" }}>Screenshot to keep!</div>
      </div>

      {/* ── Restart button ── */}
      <button
        className="gbtn"
        style={{ background: "var(--navy)" }}
        onClick={onRestart}
      >
        ← Design Another Doll
      </button>
    </div>
  );
}
