/* ═══════════════════════════════════════════
   DOLL SVG — Kawaii-chibi character
   viewBox: 0 0 200 300
   TRUE CHIBI: head = 50% of height, huge eyes,
   stubby body, tiny limbs
   ═══════════════════════════════════════════ */

import { HairBack, HairFront } from "../doll-parts/hair.jsx";
import { Outfit } from "../doll-parts/outfits.jsx";

const SKIN = {
  Light:  { base: "#FDDCBD", mid: "#F5C9A6", edge: "#E8B694" },
  Medium: { base: "#DDA46A", mid: "#C98E55", edge: "#B47A44" },
  Deep:   { base: "#8B5E3C", mid: "#7A5033", edge: "#6B432B" },
};

const HAIR = {
  Dark:   { base: "#2A1810", highlight: "#4A3228" },
  Auburn: { base: "#8B3A1A", highlight: "#B55230" },
  Blonde: { base: "#D4A843", highlight: "#E8C86A" },
  Pink:   { base: "#E8709A", highlight: "#F5A0C0" },
};

let _uid = 0;

export default function DollSVG({ cfg, size = 200 }) {
  const uid = `doll-${++_uid}`;
  const skin = SKIN[cfg.skinTone] || SKIN.Light;
  const hair = HAIR[cfg.hairColor] || HAIR.Dark;
  const hairStyle = cfg.hairStyle || "Bob";

  const skinGrad = `${uid}-skin`;
  const hairGrad = `${uid}-hair`;
  const blushGrad = `${uid}-blush`;

  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={skinGrad} cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor={skin.base} />
          <stop offset="60%" stopColor={skin.mid} />
          <stop offset="100%" stopColor={skin.edge} />
        </radialGradient>

        <linearGradient id={hairGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hair.highlight} />
          <stop offset="100%" stopColor={hair.base} />
        </linearGradient>

        <radialGradient id={blushGrad}>
          <stop offset="0%" stopColor="#FF9999" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Hair back layer ── */}
      <HairBack style={hairStyle} gradientId={hairGrad} />

      {/* ── Body ── */}
      <g>
        {/* Torso — small rounded pill shape */}
        <rect x={72} y={152} width={56} height={65} rx={20} fill={`url(#${skinGrad})`} />

        {/* Left arm — tiny rounded stub */}
        <path
          d="M72,160 Q58,168 54,190 Q53,198 57,200"
          stroke={`url(#${skinGrad})`} strokeWidth={12} strokeLinecap="round" fill="none"
        />
        {/* Left hand */}
        <circle cx={57} cy={200} r={5} fill={`url(#${skinGrad})`} />

        {/* Right arm */}
        <path
          d="M128,160 Q142,168 146,190 Q147,198 143,200"
          stroke={`url(#${skinGrad})`} strokeWidth={12} strokeLinecap="round" fill="none"
        />
        {/* Right hand */}
        <circle cx={143} cy={200} r={5} fill={`url(#${skinGrad})`} />

        {/* Left leg — short stubby */}
        <rect x={78} y={212} width={16} height={36} rx={8} fill={`url(#${skinGrad})`} />
        {/* Right leg */}
        <rect x={106} y={212} width={16} height={36} rx={8} fill={`url(#${skinGrad})`} />

        {/* Left shoe */}
        <ellipse cx={86} cy={250} rx={12} ry={7} fill="#4A3728" />
        {/* Right shoe */}
        <ellipse cx={114} cy={250} rx={12} ry={7} fill="#4A3728" />
      </g>

      {/* ── Outfit overlay ── */}
      <Outfit style={cfg.outfit} />

      {/* ── Head — BIG chibi head ── */}
      <circle cx={100} cy={82} r={72} fill={`url(#${skinGrad})`} />

      {/* ── Face ── */}
      <g>
        {/* Left eye — big kawaii eye */}
        <ellipse cx={76} cy={92} rx={10} ry={11} fill="#2D1B10" />
        {/* Big highlight */}
        <ellipse cx={72} cy={87} rx={4} ry={4.5} fill="#fff" />
        {/* Small highlight */}
        <circle cx={80} cy={96} r={2} fill="#fff" opacity="0.7" />

        {/* Right eye */}
        <ellipse cx={124} cy={92} rx={10} ry={11} fill="#2D1B10" />
        <ellipse cx={120} cy={87} rx={4} ry={4.5} fill="#fff" />
        <circle cx={128} cy={96} r={2} fill="#fff" opacity="0.7" />

        {/* Eyebrows — soft arcs */}
        <path d="M62,74 Q70,68 82,72" stroke="#2D1B10" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M118,72 Q130,68 138,74" stroke="#2D1B10" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.35" />

        {/* Mouth — tiny happy curve */}
        <path d="M94,110 Q100,117 106,110" stroke="#D47070" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Blush — prominent kawaii blush */}
        <ellipse cx={58} cy={102} rx={14} ry={9} fill={`url(#${blushGrad})`} />
        <ellipse cx={142} cy={102} rx={14} ry={9} fill={`url(#${blushGrad})`} />
      </g>

      {/* ── Hair front layer ── */}
      <HairFront style={hairStyle} gradientId={hairGrad} />
    </svg>
  );
}
