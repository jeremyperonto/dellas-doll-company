/* ═══════════════════════════════════════════
   KAWAII HAIR — Code-drawn SVG hair styles
   Head: circle cx=100 cy=82 r=72
   viewBox: 0 0 200 300
   ═══════════════════════════════════════════ */

export function HairBack({ style, gradientId }) {
  const fill = `url(#${gradientId})`;

  switch (style) {
    case "Bob":
      return (
        <g>
          {/* Main hair volume behind head */}
          <ellipse cx={100} cy={85} rx={78} ry={80} fill={fill} />
          {/* Left side framing — ends at jaw */}
          <path d="M28,82 Q24,120 32,155 Q38,162 44,155 Q40,130 38,100 Z" fill={fill} />
          {/* Right side */}
          <path d="M172,82 Q176,120 168,155 Q162,162 156,155 Q160,130 162,100 Z" fill={fill} />
        </g>
      );

    case "Twin Tails":
      return (
        <g>
          <ellipse cx={100} cy={85} rx={78} ry={80} fill={fill} />
          {/* Left twin tail — flows down */}
          <path d="M32,75 Q12,100 14,155 Q16,190 28,210 Q38,200 34,165 Q32,125 42,85 Z" fill={fill} />
          {/* Right twin tail */}
          <path d="M168,75 Q188,100 186,155 Q184,190 172,210 Q162,200 166,165 Q168,125 158,85 Z" fill={fill} />
        </g>
      );

    case "Long Straight":
      return (
        <g>
          <ellipse cx={100} cy={85} rx={78} ry={80} fill={fill} />
          {/* Left long curtain — goes past body */}
          <path d="M28,78 Q20,135 24,210 Q28,235 40,240 Q42,220 38,175 Q34,130 38,88 Z" fill={fill} />
          {/* Right long curtain */}
          <path d="M172,78 Q180,135 176,210 Q172,235 160,240 Q158,220 162,175 Q166,130 162,88 Z" fill={fill} />
        </g>
      );

    case "Short Messy":
      return (
        <g>
          <ellipse cx={100} cy={85} rx={78} ry={80} fill={fill} />
          {/* Spiky tufts sticking out */}
          <path d="M30,70 Q22,88 32,112 Q40,98 36,75 Z" fill={fill} />
          <path d="M170,70 Q178,88 168,112 Q160,98 164,75 Z" fill={fill} />
          <path d="M60,4 Q54,-6 62,-8 Q68,-4 65,6 Z" fill={fill} />
          <path d="M140,4 Q146,-6 138,-8 Q132,-4 135,6 Z" fill={fill} />
          <path d="M98,2 Q96,-8 104,-8 Q106,0 102,4 Z" fill={fill} />
        </g>
      );

    case "Side Ponytail":
      return (
        <g>
          <ellipse cx={100} cy={85} rx={78} ry={80} fill={fill} />
          {/* Ponytail sweeping right — thick and bouncy */}
          <path d="M164,68 Q192,90 194,145 Q192,195 178,218 Q168,210 174,165 Q176,120 162,80 Z" fill={fill} />
          {/* Small volume left side */}
          <path d="M30,80 Q26,108 36,128 Q42,120 38,95 Z" fill={fill} />
        </g>
      );

    default:
      return null;
  }
}

export function HairFront({ style, gradientId }) {
  const fill = `url(#${gradientId})`;

  switch (style) {
    case "Bob":
      return (
        <g>
          {/* Thick rounded bangs */}
          <path
            d="M32,48 Q42,18 72,8 Q90,4 100,6 Q110,4 128,8 Q158,18 168,48
               Q162,38 145,28 Q125,20 100,22 Q75,20 55,28 Q38,38 32,48 Z"
            fill={fill}
          />
          {/* Left framing strand */}
          <path d="M30,52 Q26,85 28,120 Q30,135 38,140 Q36,125 34,100 Q32,72 34,54 Z" fill={fill} />
          {/* Right framing strand */}
          <path d="M170,52 Q174,85 172,120 Q170,135 162,140 Q164,125 166,100 Q168,72 166,54 Z" fill={fill} />
        </g>
      );

    case "Twin Tails":
      return (
        <g>
          {/* Center-part bangs */}
          <path
            d="M34,48 Q48,15 78,6 Q92,3 100,7 Q108,3 122,6 Q152,15 166,48
               Q158,34 138,24 Q118,18 100,22 Q82,18 62,24 Q42,34 34,48 Z"
            fill={fill}
          />
          {/* Hair tie puffs */}
          <circle cx={32} cy={72} r={12} fill={fill} />
          <circle cx={168} cy={72} r={12} fill={fill} />
          {/* Cute hair tie accents */}
          <circle cx={32} cy={72} r={4} fill="#FF6B8A" opacity="0.8" />
          <circle cx={168} cy={72} r={4} fill="#FF6B8A" opacity="0.8" />
        </g>
      );

    case "Long Straight":
      return (
        <g>
          {/* Blunt-cut bangs — clean hime-cut style */}
          <path
            d="M30,42 Q44,12 78,4 Q100,0 122,4 Q156,12 170,42
               L166,50 Q154,28 125,18 Q100,14 75,18 Q46,28 34,50 Z"
            fill={fill}
          />
          {/* Long side curtains framing face */}
          <path d="M28,50 Q24,88 26,135 Q28,148 34,152 Q32,140 30,115 Q28,85 32,55 Z" fill={fill} />
          <path d="M172,50 Q176,88 174,135 Q172,148 166,152 Q168,140 170,115 Q172,85 168,55 Z" fill={fill} />
        </g>
      );

    case "Short Messy":
      return (
        <g>
          {/* Messy chunky bangs — overlapping tufts */}
          <path d="M36,50 Q46,18 72,6 Q60,30 52,42 Z" fill={fill} />
          <path d="M48,42 Q62,8 92,2 Q78,26 68,38 Z" fill={fill} />
          <path d="M66,36 Q86,0 110,2 Q96,24 86,36 Z" fill={fill} />
          <path d="M84,36 Q108,4 136,8 Q124,28 112,38 Z" fill={fill} />
          <path d="M110,38 Q134,12 162,48 Q150,36 136,32 Z" fill={fill} />
          {/* Extra messy top tuft */}
          <path d="M88,6 Q94,-4 102,-2 Q98,8 92,12 Z" fill={fill} />
        </g>
      );

    case "Side Ponytail":
      return (
        <g>
          {/* Side-swept bangs */}
          <path
            d="M32,46 Q44,14 76,4 Q100,0 130,6 Q158,16 166,42
               Q156,28 132,20 Q108,14 82,18 Q54,26 38,50 Z"
            fill={fill}
          />
          {/* Swooping fringe on left */}
          <path d="M32,50 Q28,72 32,92 Q34,86 34,68 Q34,55 36,48 Z" fill={fill} />
          {/* Hair tie accent */}
          <circle cx={168} cy={66} r={5} fill="#FFD700" opacity="0.9" />
        </g>
      );

    default:
      return null;
  }
}
