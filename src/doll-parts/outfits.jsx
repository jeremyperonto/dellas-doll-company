/* ═══════════════════════════════════════════
   KAWAII OUTFITS — Code-drawn flat SVG
   Body: torso rect x=72..128 y=152..217
   Legs: y=212..248, shoes at y=250
   Arms end around y=200
   All shapes rounded and cute to match chibi body
   ═══════════════════════════════════════════ */

export function Outfit({ style }) {
  switch (style) {
    case "Denim Jumper":
      return (
        <g>
          {/* White tee underneath */}
          <rect x={74} y={152} width={52} height={30} rx={14} fill="#fff" />
          {/* Overall bib + body */}
          <path
            d="M70,175 L130,175 Q132,178 132,210 L132,232 Q132,238 126,238 L74,238 Q68,238 68,232 L68,210 Q68,178 70,175 Z"
            fill="#5B8FAF"
          />
          {/* Bib front */}
          <path d="M82,168 L118,168 L120,192 L80,192 Z" fill="#4A7C9A" rx="4" />
          {/* Straps */}
          <rect x={84} y={152} width={9} height={20} rx={4} fill="#4A7C9A" />
          <rect x={107} y={152} width={9} height={20} rx={4} fill="#4A7C9A" />
          {/* Buttons */}
          <circle cx={88} cy={172} r={3} fill="#F0E8D0" />
          <circle cx={112} cy={172} r={3} fill="#F0E8D0" />
          {/* Pocket on bib */}
          <rect x={93} y={175} width={14} height={10} rx={4} fill="#5B8FAF" stroke="#F0E8D0" strokeWidth="0.8" />
          {/* Pant cuffs */}
          <rect x={76} y={230} width={18} height={5} rx={2.5} fill="#4A7C9A" />
          <rect x={106} y={230} width={18} height={5} rx={2.5} fill="#4A7C9A" />
          {/* Stitch detail */}
          <line x1={100} y1={192} x2={100} y2={230} stroke="#F0E8D0" strokeWidth="0.7" strokeDasharray="2,3" />
        </g>
      );

    case "Pink Dress":
      return (
        <g>
          {/* Main dress — A-line flare */}
          <path
            d="M76,152 L124,152 Q130,156 136,215 L140,238 Q140,248 128,250 Q114,252 100,252 Q86,252 72,250 Q60,248 60,238 L64,215 Q70,156 76,152 Z"
            fill="#F5A0C0"
          />
          {/* Peter pan collar */}
          <ellipse cx={84} cy={155} rx={12} ry={6} fill="#fff" />
          <ellipse cx={116} cy={155} rx={12} ry={6} fill="#fff" />
          {/* Center bow */}
          <path d="M95,153 Q90,148 93,145 Q97,149 100,145 Q103,149 107,145 Q110,148 105,153 Z" fill="#E8609A" />
          <circle cx={100} cy={150} r={2.5} fill="#E8609A" />
          {/* Puffy sleeves */}
          <ellipse cx={68} cy={162} rx={10} ry={7} fill="#F5A0C0" />
          <ellipse cx={132} cy={162} rx={10} ry={7} fill="#F5A0C0" />
          {/* Scalloped hem */}
          <path
            d="M62,242 Q68,252 76,242 Q84,252 92,242 Q100,252 108,242 Q116,252 124,242 Q132,252 138,242"
            fill="none" stroke="#E8709A" strokeWidth="2.5" strokeLinecap="round"
          />
          {/* Waist ribbon */}
          <rect x={68} y={195} width={64} height={5} rx={2.5} fill="#E8709A" opacity="0.6" />
        </g>
      );

    case "Gray Jumper":
      return (
        <g>
          {/* Sweater body */}
          <path
            d="M70,152 L130,152 Q134,158 134,210 Q134,218 128,220 L72,220 Q66,218 66,210 Q66,158 70,152 Z"
            fill="#A8A8A8"
          />
          {/* Rounded neckline */}
          <path d="M82,152 Q100,162 118,152" fill="#989898" stroke="#989898" strokeWidth="2" />
          {/* Sleeves — puffy */}
          <ellipse cx={62} cy={168} rx={12} ry={9} fill="#A8A8A8" />
          <ellipse cx={138} cy={168} rx={12} ry={9} fill="#A8A8A8" />
          {/* Ribbed hem band */}
          <rect x={66} y={214} width={68} height={7} rx={3} fill="#909090" />
          {/* Ribbed cuffs */}
          <ellipse cx={54} cy={176} rx={8} ry={3.5} fill="#909090" />
          <ellipse cx={146} cy={176} rx={8} ry={3.5} fill="#909090" />
          {/* V-pattern / chevron on chest */}
          <path d="M88,175 L100,192 L112,175" fill="none" stroke="#C8C8C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Simple pants underneath */}
          <rect x={76} y={218} width={18} height={20} rx={8} fill="#5A5A72" />
          <rect x={106} y={218} width={18} height={20} rx={8} fill="#5A5A72" />
        </g>
      );

    case "Blue Plaid":
      return (
        <g>
          {/* Dress body */}
          <path
            d="M76,152 L124,152 Q130,156 134,205 L140,242 Q140,252 128,254 Q114,256 100,256 Q86,256 72,254 Q60,252 60,242 L66,205 Q70,156 76,152 Z"
            fill="#5088C0"
          />
          {/* White collar */}
          <ellipse cx={86} cy={155} rx={10} ry={5} fill="#fff" />
          <ellipse cx={114} cy={155} rx={10} ry={5} fill="#fff" />
          {/* Plaid pattern — vertical */}
          <line x1={82} y1={158} x2={74} y2={252} stroke="#3A6590" strokeWidth="1.2" opacity="0.45" />
          <line x1={100} y1={158} x2={100} y2={255} stroke="#3A6590" strokeWidth="1.2" opacity="0.45" />
          <line x1={118} y1={158} x2={126} y2={252} stroke="#3A6590" strokeWidth="1.2" opacity="0.45" />
          {/* Plaid pattern — horizontal */}
          <line x1={70} y1={178} x2={130} y2={178} stroke="#fff" strokeWidth="0.8" opacity="0.3" />
          <line x1={66} y1={198} x2={134} y2={198} stroke="#fff" strokeWidth="0.8" opacity="0.3" />
          <line x1={62} y1={220} x2={138} y2={220} stroke="#fff" strokeWidth="0.8" opacity="0.3" />
          <line x1={60} y1={240} x2={140} y2={240} stroke="#fff" strokeWidth="0.8" opacity="0.3" />
          {/* Belt */}
          <rect x={66} y={196} width={68} height={5} rx={2.5} fill="#2A4A6A" />
          <rect x={96} y={194} width={8} height={9} rx={2} fill="#D4AA40" />
          {/* Puffy sleeves */}
          <ellipse cx={68} cy={162} rx={10} ry={7} fill="#5088C0" />
          <ellipse cx={132} cy={162} rx={10} ry={7} fill="#5088C0" />
        </g>
      );

    case "Brown Overalls":
      return (
        <g>
          {/* Cream shirt underneath */}
          <rect x={74} y={152} width={52} height={30} rx={14} fill="#F5ECD8" />
          {/* Overall body */}
          <path
            d="M70,178 L130,178 Q132,182 132,215 L132,238 Q132,242 126,242 L74,242 Q68,242 68,238 L68,215 Q68,182 70,178 Z"
            fill="#B08050"
          />
          {/* Bib */}
          <path d="M82,170 L118,170 L118,195 L82,195 Z" fill="#9A6A38" rx="4" />
          {/* Straps */}
          <rect x={84} y={152} width={9} height={22} rx={4} fill="#9A6A38" />
          <rect x={107} y={152} width={9} height={22} rx={4} fill="#9A6A38" />
          {/* Side buttons */}
          <circle cx={88} cy={175} r={3} fill="#D4AA40" />
          <circle cx={112} cy={175} r={3} fill="#D4AA40" />
          {/* Bib pocket — heart shaped! */}
          <path d="M97,178 Q94,175 97,172 Q100,170 103,172 Q106,175 103,178 L100,182 Z" fill="#B08050" stroke="#9A6A38" strokeWidth="0.7" />
          {/* Rolled cuffs */}
          <rect x={76} y={234} width={18} height={5} rx={2.5} fill="#9A6A38" />
          <rect x={106} y={234} width={18} height={5} rx={2.5} fill="#9A6A38" />
          {/* Center seam */}
          <line x1={100} y1={195} x2={100} y2={234} stroke="#9A6A38" strokeWidth="0.8" strokeDasharray="2,3" />
        </g>
      );

    case "Striped Dress":
      return (
        <g>
          {/* T-shirt dress body */}
          <path
            d="M74,152 L126,152 Q132,156 134,212 L136,238 Q136,246 126,248 Q114,250 100,250 Q86,250 74,248 Q64,246 64,238 L66,212 Q68,156 74,152 Z"
            fill="#F2EAD8"
          />
          {/* Coral stripes */}
          <path d="M72,172 Q100,174 128,172" stroke="#E07070" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M70,188 Q100,190 130,188" stroke="#E07070" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M68,204 Q100,206 132,204" stroke="#E07070" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M66,220 Q100,222 134,220" stroke="#E07070" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M64,236 Q100,238 136,236" stroke="#E07070" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Round neckline */}
          <path d="M84,152 Q100,162 116,152" fill="none" stroke="#D4A080" strokeWidth="2.5" />
          {/* Short rounded sleeves */}
          <ellipse cx={66} cy={162} rx={11} ry={8} fill="#F2EAD8" />
          <ellipse cx={134} cy={162} rx={11} ry={8} fill="#F2EAD8" />
          {/* Sleeve stripes */}
          <path d="M58,166 Q66,168 74,164" stroke="#E07070" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M142,166 Q134,168 126,164" stroke="#E07070" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );

    case "Flower Tee":
      return (
        <g>
          {/* Tee body */}
          <path
            d="M70,152 L130,152 Q134,158 134,205 Q134,210 128,212 L72,212 Q66,210 66,205 Q66,158 70,152 Z"
            fill="#F0E8FF"
          />
          {/* Rounded puffy sleeves */}
          <ellipse cx={62} cy={166} rx={12} ry={9} fill="#F0E8FF" />
          <ellipse cx={138} cy={166} rx={12} ry={9} fill="#F0E8FF" />
          {/* Neckline */}
          <path d="M82,152 Q100,162 118,152" fill="none" stroke="#E0D8F0" strokeWidth="2" />
          {/* Big kawaii flower on chest */}
          {/* Petals */}
          <ellipse cx={100} cy={172} rx={6} ry={8} fill="#FF8FAB" />
          <ellipse cx={108} cy={180} rx={6} ry={8} fill="#FF8FAB" transform="rotate(72, 108, 180)" />
          <ellipse cx={105} cy={190} rx={6} ry={8} fill="#FF8FAB" transform="rotate(144, 105, 190)" />
          <ellipse cx={95} cy={190} rx={6} ry={8} fill="#FF8FAB" transform="rotate(216, 95, 190)" />
          <ellipse cx={92} cy={180} rx={6} ry={8} fill="#FF8FAB" transform="rotate(288, 92, 180)" />
          {/* Flower center */}
          <circle cx={100} cy={182} r={5} fill="#FFD700" />
          <circle cx={98} cy={180} r={1.5} fill="#fff" opacity="0.6" />
          {/* Cute denim shorts below */}
          <rect x={72} y={212} width={56} height={24} rx={10} fill="#7A9FCA" />
          <line x1={100} y1={212} x2={100} y2={236} stroke="#6888B0" strokeWidth="1.2" />
          {/* Tiny pocket */}
          <rect x={108} y={216} width={10} height={8} rx={3} fill="#6888B0" opacity="0.5" />
        </g>
      );

    case "Green Dress":
      return (
        <g>
          {/* Long flowing dress — past knees */}
          <path
            d="M76,152 L124,152 Q130,156 136,225 L142,258 Q142,270 130,272 Q116,274 100,274 Q84,274 70,272 Q58,270 58,258 L64,225 Q70,156 76,152 Z"
            fill="#6BAF78"
          />
          {/* Puff sleeves — extra round */}
          <ellipse cx={64} cy={162} rx={14} ry={10} fill="#6BAF78" />
          <ellipse cx={136} cy={162} rx={14} ry={10} fill="#6BAF78" />
          {/* Sleeve cuff details */}
          <path d="M54,170 Q64,175 74,168" fill="none" stroke="#558B60" strokeWidth="1.5" />
          <path d="M146,170 Q136,175 126,168" fill="none" stroke="#558B60" strokeWidth="1.5" />
          {/* Neckline — sweet round */}
          <path d="M82,152 Q100,164 118,152" fill="none" stroke="#558B60" strokeWidth="2.5" />
          {/* Sash at waist */}
          <path d="M66,198 Q100,204 134,198 Q134,204 100,210 Q66,204 66,198 Z" fill="#558B60" />
          {/* Sash bow */}
          <path d="M108,200 Q118,195 118,202 Q118,209 108,204 Z" fill="#4A7A52" />
          <path d="M108,200 Q114,198 112,202 Q114,206 108,204 Z" fill="#3D6845" />
          <circle cx={108} cy={202} r={2} fill="#4A7A52" />
          {/* Leaf embroidery — cute little leaves */}
          <path d="M80,232 Q85,225 90,232 Q85,236 80,232 Z" fill="#558B60" opacity="0.5" />
          <path d="M112,250 Q117,243 122,250 Q117,254 112,250 Z" fill="#558B60" opacity="0.5" />
          <path d="M94,260 Q99,253 104,260 Q99,264 94,260 Z" fill="#558B60" opacity="0.5" />
        </g>
      );

    default:
      return null;
  }
}
