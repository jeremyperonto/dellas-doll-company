import { useState, useEffect, useRef, useCallback } from "react";
import { FPINS } from "../constants.js";
import { playSuccess, playShipHorn, playPlane } from "../sound.js";

/* ── Reuse the same projection & continent data as WorldMap ── */
const MAP_W = 800, MAP_H = 340;
const proj = (lat, lon) => [((lon + 180) / 360) * MAP_W, ((90 - lat) / 180) * MAP_H];
const pts = (pairs) => pairs.map(([la, lo]) => proj(la, lo).join(",")).join(" ");

const CONTINENTS = [
  { id: "na", points: [[71,-162],[68,-166],[65,-168],[62,-165],[57,-170],[57,-163],[55,-162],[55,-160],[58,-153],[58,-152],[60,-147],[60,-145],[58,-137],[55,-131],[50,-127],[48,-124],[46,-124],[44,-124],[42,-124],[38,-123],[35,-120],[32,-117],[30,-116],[28,-110],[24,-110],[20,-105],[18,-103],[16,-94],[20,-87],[16,-86],[12,-84],[8,-78],[10,-72],[14,-62],[18,-68],[20,-75],[20,-66],[23,-82],[25,-80],[28,-82],[30,-81],[34,-78],[36,-76],[40,-74],[44,-66],[47,-68],[48,-68],[45,-64],[50,-66],[52,-56],[54,-58],[56,-62],[58,-62],[60,-65],[64,-52],[68,-50],[70,-54],[72,-56],[74,-60],[76,-70],[82,-60],[83,-46],[82,-30],[76,-20],[72,-22],[68,-24],[66,-36],[65,-50],[71,-162]] },
  { id: "sa", points: [[10,-73],[8,-63],[4,-52],[2,-50],[0,-50],[-2,-50],[-5,-36],[-8,-35],[-12,-37],[-15,-39],[-20,-40],[-22,-43],[-24,-46],[-28,-49],[-30,-51],[-32,-52],[-34,-53],[-38,-57],[-41,-63],[-44,-65],[-48,-66],[-52,-68],[-54,-68],[-56,-68],[-54,-74],[-50,-74],[-46,-73],[-42,-73],[-38,-72],[-30,-71],[-22,-70],[-15,-75],[-5,-80],[0,-78],[2,-77],[5,-76],[8,-77],[10,-73]] },
  { id: "eu", points: [[71,28],[70,20],[68,15],[65,14],[64,10],[61,5],[58,5],[57,8],[55,8],[52,4],[51,2],[49,-2],[44,-1],[42,3],[38,-1],[36,-6],[37,-9],[38,-9],[40,-8],[43,-8],[44,-1],[45,0],[43,7],[44,8],[46,10],[47,16],[48,17],[50,14],[52,14],[54,18],[57,21],[60,25],[65,26],[68,28],[71,28]] },
  { id: "af", points: [[37,10],[35,11],[32,12],[30,32],[27,34],[24,36],[16,42],[12,44],[8,48],[5,44],[2,42],[0,42],[-2,40],[-5,40],[-10,40],[-14,36],[-22,35],[-26,33],[-30,30],[-34,27],[-34,25],[-34,18],[-29,17],[-22,14],[-16,12],[-10,15],[0,10],[5,2],[5,-3],[10,-15],[15,-17],[20,-17],[24,-15],[30,-18],[35,-15],[37,10]] },
  { id: "as", points: [[71,180],[70,142],[65,143],[60,140],[58,162],[55,162],[52,141],[50,142],[46,138],[43,131],[40,122],[38,122],[35,120],[32,121],[28,121],[24,121],[20,110],[12,109],[8,104],[4,104],[1,110],[5,100],[10,99],[18,94],[22,92],[16,80],[8,77],[10,77],[14,74],[20,72],[24,66],[24,57],[24,51],[22,58],[18,55],[12,44],[8,48],[5,44],[2,42],[0,42],[2,40],[5,36],[10,42],[14,44],[16,42],[24,36],[30,32],[32,36],[36,36],[38,42],[40,44],[42,28],[46,30],[48,28],[50,30],[55,32],[58,60],[60,62],[65,60],[70,60],[71,180]] },
  { id: "au", points: [[-16,122],[-14,128],[-12,132],[-12,136],[-14,140],[-12,142],[-16,145],[-20,149],[-24,152],[-28,154],[-32,152],[-34,151],[-38,146],[-38,140],[-36,136],[-38,130],[-34,122],[-28,114],[-22,114],[-20,118],[-16,122]] },
];
const ISLANDS = [
  [[45,142],[40,140],[35,136],[33,131],[35,133],[38,141],[43,141],[45,142]],
  [[58,-3],[56,-5],[52,-4],[51,1],[52,2],[54,0],[57,-2],[60,-1],[58,-3]],
  [[-40,174],[-43,172],[-46,168],[-46,170],[-40,174]],
];

/* ── Destination is always USA ── */
const USA_PIN = FPINS.USA;
const TO = proj(USA_PIN.lat, USA_PIN.lon);

function getRoute(factoryId) {
  const pin = FPINS[factoryId] || FPINS.China;
  const from = proj(pin.lat, pin.lon);
  // Curved SVG path from factory → USA
  const mx = (from[0] + TO[0]) / 2;
  const my = Math.min(from[1], TO[1]) - 30;
  return { from, path: `M${from[0]},${from[1]} Q${mx},${my} ${TO[0]},${TO[1]}` };
}

const EMOJIS = { "Cargo Ship": "🚢", "Air Freight": "✈️", Truck: "🚛" };

export default function ShippingRoute({ onComplete, factoryId, shipMethod }) {
  const [progress, setProgress] = useState(0);
  const [boosting, setBoosting] = useState(false);
  const [arrived, setArrived] = useState(false);
  const speedRef = useRef(0.004);
  const rafRef = useRef(null);
  const pathRef = useRef(null);
  const route = getRoute(factoryId);
  const emoji = EMOJIS[shipMethod] || "🚢";

  useEffect(() => {
    let prog = 0;
    const tick = () => {
      prog += speedRef.current;
      if (prog >= 1) {
        prog = 1;
        setProgress(1);
        setArrived(true);
        if (shipMethod === "Cargo Ship") playShipHorn();
        else if (shipMethod === "Air Freight") playPlane();
        else playSuccess();
        setTimeout(onComplete, 1000);
        return;
      }
      setProgress(prog);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [onComplete, shipMethod]);

  const handleBoost = useCallback(() => {
    if (arrived) return;
    setBoosting(true);
    speedRef.current = 0.012;
    setTimeout(() => {
      speedRef.current = 0.004;
      setBoosting(false);
    }, 400);
  }, [arrived]);

  const getPoint = useCallback(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      const pt = pathRef.current.getPointAtLength(progress * len);
      return { x: pt.x, y: pt.y };
    }
    const f = route.from;
    return { x: f[0] + (TO[0] - f[0]) * progress, y: f[1] + (TO[1] - f[1]) * progress };
  }, [progress, route]);

  const pt = getPoint();

  return (
    <div className="mini-game" onPointerDown={handleBoost}
      style={{ minHeight: 320, cursor: arrived ? "default" : "pointer" }}>
      <div className="mini-game-instruction">{"Tap anywhere to boost your " + (shipMethod || "vehicle") + "!"}</div>

      <div style={{
        background: "linear-gradient(135deg, #E8F4FD 0%, #D4ECF7 100%)",
        borderRadius: 14, overflow: "hidden",
        border: "1.5px solid #B8D8F0",
        marginBottom: 12, width: "100%",
        boxShadow: "0 2px 12px rgba(0,0,0,.05)",
      }}>
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} width="100%" style={{ display: "block" }}>
          <defs>
            <linearGradient id="sr-ocean" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8F4FD" />
              <stop offset="100%" stopColor="#D0E8F7" />
            </linearGradient>
            <linearGradient id="sr-land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8E8D4" />
              <stop offset="100%" stopColor="#A8D8B8" />
            </linearGradient>
          </defs>

          <rect width={MAP_W} height={MAP_H} fill="url(#sr-ocean)" />

          {/* Wave decorations */}
          {[80, 160, 240].map((y) => (
            <path key={y} d={`M0,${y} Q${MAP_W * 0.25},${y - 6} ${MAP_W * 0.5},${y} Q${MAP_W * 0.75},${y + 6} ${MAP_W},${y}`} fill="none" stroke="#B8D8F0" strokeWidth=".8" opacity=".4" />
          ))}

          {/* Continents */}
          {CONTINENTS.map((c) => (
            <polygon key={c.id} points={pts(c.points)} fill="url(#sr-land)" stroke="#8CC4A0" strokeWidth=".8" />
          ))}
          {ISLANDS.map((isl, i) => (
            <polygon key={i} points={pts(isl)} fill="url(#sr-land)" stroke="#8CC4A0" strokeWidth=".8" />
          ))}

          {/* Factory pins (dimmed, just for context) */}
          {Object.entries(FPINS).map(([id, info]) => {
            const [px, py] = proj(info.lat, info.lon);
            const isOrigin = id === factoryId;
            const isDest = id === "USA";
            if (!isOrigin && !isDest) return (
              <circle key={id} cx={px} cy={py} r={4} fill="#A8C8B8" stroke="#8CB8A0" strokeWidth={1} />
            );
            return (
              <g key={id}>
                <circle cx={px} cy={py} r={10} fill={info.col} opacity=".2">
                  <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={px} cy={py} r={6} fill={info.col} stroke="#fff" strokeWidth={2} />
                <rect x={px - 24} y={py - 30} width={48} height={18} rx={6} fill={info.col} />
                <text x={px} y={py - 18.5} textAnchor="middle" fontSize="10" fill="#fff" fontFamily="'Black Han Sans',cursive">
                  {info.flag} {info.label}
                </text>
              </g>
            );
          })}

          {/* Route path — dashed */}
          <path ref={pathRef} d={route.path} fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeDasharray="8 5" opacity=".4" />

          {/* Vehicle emoji */}
          <text x={pt.x} y={pt.y} fontSize={boosting ? "32" : "24"} textAnchor="middle" dominantBaseline="central"
            style={{ transition: "font-size .15s", filter: boosting ? "drop-shadow(0 0 8px var(--coral))" : "none" }}>
            {emoji}
          </text>

          {/* Arrival sparkles */}
          {arrived && [0, 1, 2, 3, 4].map((i) => (
            <circle key={i}
              cx={TO[0] + Math.cos(i * 1.26) * 24}
              cy={TO[1] + Math.sin(i * 1.26) * 24}
              r="4" fill="var(--gold)">
              <animate attributeName="opacity" values="1;0" dur="0.8s" fill="freeze" />
              <animate attributeName="r" values="4;10" dur="0.8s" fill="freeze" />
            </circle>
          ))}
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 18, borderRadius: 10, border: "1.5px solid var(--border)",
        background: "var(--white)", overflow: "hidden", margin: "0 auto",
        maxWidth: 400,
      }}>
        <div style={{
          height: "100%", borderRadius: 10,
          background: arrived ? "linear-gradient(90deg, #4ADE80, #16A34A)" : "linear-gradient(90deg, var(--navy), var(--coral))",
          width: `${progress * 100}%`, transition: "width .1s linear",
        }} />
      </div>

      {arrived && (
        <div style={{
          textAlign: "center", fontFamily: "'Black Han Sans',cursive",
          fontSize: 18, color: "var(--coral)", marginTop: 10,
          animation: "sup .35s ease",
        }}>
          {"🎉 Delivered!"}
        </div>
      )}
    </div>
  );
}
