import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans:wght@400;600;700&display=swap');`;

/* ──────────────────────────────────────────────
   DESIGN SYSTEM — Korean Graphic Design
   Coral × Navy × Cream
   ────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body { background:#FFF7F0; }

  :root {
    --coral:#E8354A; --coral-dk:#B8192E; --coral-pale:#FFF0F2;
    --navy:#1A2690;  --navy-dk:#0D1760;  --navy-pale:#EEF0FF;
    --cream:#FFF7F0; --white:#FFFFFF;    --black:#0A0A1A;
    --mid:#6B7280;   --border:#E2E4EF;  --gold:#FFD34E;
    --sh: 0 2px 18px rgba(26,38,144,.09), 0 1px 3px rgba(26,38,144,.06);
  }

  .app { font-family:'Noto Sans',sans-serif; min-height:100vh; background:var(--cream); color:var(--black); }

  /* COST BADGE */
  .cost-badge {
    position:fixed; bottom:20px; right:16px;
    background:var(--navy); color:var(--white);
    padding:10px 20px; font-family:'Black Han Sans',cursive; font-size:1rem;
    border-radius:3px; border:2px solid var(--navy-dk);
    box-shadow:4px 4px 0 var(--navy-dk);
    z-index:200; display:flex; align-items:center; gap:7px;
  }
  .cost-badge.pop { animation:badgePop .3s ease; }
  @keyframes badgePop{0%,100%{transform:scale(1) rotate(0)}40%{transform:scale(1.14) rotate(-2deg)}}

  .wrap { max-width:760px; margin:0 auto; padding:24px 16px 120px; }

  /* PAGE HEADERS */
  .step-pill {
    display:inline-flex; align-items:center; gap:6px;
    background:var(--coral); color:var(--white);
    padding:4px 14px; font-family:'Black Han Sans',cursive;
    font-size:.72rem; letter-spacing:3px; text-transform:uppercase;
    margin-bottom:8px;
  }
  .big-title {
    font-family:'Black Han Sans',cursive; font-size:2.6rem; line-height:1.0;
    color:var(--navy); margin-bottom:4px; text-align:center;
  }
  .sub { text-align:center; font-size:.93rem; color:var(--mid); margin-bottom:20px; }

  /* CARDS */
  .card {
    background:var(--white); border:1.5px solid var(--border);
    border-radius:4px; padding:18px; margin:12px 0; box-shadow:var(--sh);
  }
  .card-title {
    font-family:'Black Han Sans',cursive; font-size:1.05rem;
    color:var(--navy); margin-bottom:12px; padding-bottom:9px;
    border-bottom:2px solid var(--coral);
    display:flex; align-items:center; gap:8px;
  }

  /* OPTION GRIDS */
  .ogrid  { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .ogrid3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }

  .obtn {
    background:var(--white); border:1.5px solid var(--border); border-radius:3px;
    padding:11px 7px; cursor:pointer; font-family:'Noto Sans',sans-serif;
    font-size:.8rem; text-align:center; color:var(--mid); transition:all .1s; line-height:1.3;
  }
  .obtn:hover { border-color:var(--coral); color:var(--black); background:var(--coral-pale); }
  .obtn.on { background:var(--navy); border-color:var(--navy-dk); color:var(--white); box-shadow:3px 3px 0 var(--navy-dk); }
  .oe { font-size:1.55rem; display:block; margin-bottom:3px; }
  .oc { font-size:.72rem; display:block; margin-top:3px; color:#9CA3AF; }
  .obtn.on .oc { color:rgba(255,255,255,.55); }

  /* INPUT */
  .ninput {
    width:100%; background:var(--white); border:2px solid var(--border);
    border-radius:3px; padding:11px 14px;
    font-family:'Black Han Sans',cursive; font-size:1.5rem;
    color:var(--navy); outline:none;
  }
  .ninput:focus { border-color:var(--coral); }
  .ninput::placeholder { color:#D1D5DB; }

  /* CTA BUTTON */
  .gbtn {
    display:block; margin:20px auto 0;
    background:var(--coral); color:var(--white); border:none;
    border-radius:3px; padding:13px 42px;
    font-family:'Black Han Sans',cursive; font-size:1.2rem;
    letter-spacing:1px; cursor:pointer;
    box-shadow:4px 4px 0 var(--coral-dk); transition:all .1s;
  }
  .gbtn:hover { transform:translate(-2px,-2px); box-shadow:6px 6px 0 var(--coral-dk); }
  .gbtn:active { transform:translate(1px,1px); box-shadow:2px 2px 0 var(--coral-dk); }
  .gbtn:disabled { background:#D1D5DB; box-shadow:3px 3px 0 #9CA3AF; cursor:not-allowed; transform:none; }

  /* INFO BOX */
  .fact {
    background:var(--cream); border-left:4px solid var(--navy);
    border-radius:0 3px 3px 0; padding:10px 14px;
    font-size:.84rem; color:#374151; margin:10px 0; line-height:1.55;
  }
  .fact b { color:var(--navy); }

  /* JOURNEY DOTS */
  .dots { display:flex; justify-content:center; gap:5px; margin:12px 0; }
  .dot { width:28px; height:5px; border-radius:3px; background:var(--border); transition:all .3s; }
  .dot.active { background:var(--coral); width:42px; }
  .dot.done   { background:var(--navy); }

  /* SCENE */
  .scene {
    background:var(--navy-pale); border:1.5px solid var(--navy); border-radius:3px;
    padding:22px; margin:12px 0; min-height:160px;
    display:flex; align-items:center; justify-content:center; text-align:center;
  }

  /* BAR */
  .barwrap { height:26px; border-radius:3px; border:1.5px solid var(--border); overflow:hidden; display:flex; margin:12px 0; }

  /* CONFETTI */
  .confbox { position:fixed; inset:0; pointer-events:none; z-index:300; }
  .cp { position:absolute; border-radius:2px; animation:fall linear forwards; }
  @keyframes fall{from{transform:translateY(-20px) rotate(0deg);opacity:1}to{transform:translateY(105vh) rotate(900deg);opacity:0}}

  /* STAMP */
  .stamp {
    width:72px; height:72px; border-radius:3px;
    background:var(--white); border:2.5px solid var(--navy); box-shadow:3px 3px 0 var(--navy-dk);
    font-size:2rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .12s;
  }
  .stamp:hover { transform:translate(-2px,-2px); box-shadow:5px 5px 0 var(--navy-dk); }
  .stamp.done { background:var(--navy); animation:sgo .28s ease; }
  @keyframes sgo{0%{transform:scale(2)}100%{transform:scale(1)}}

  .slide { animation:sup .27s ease; }
  @keyframes sup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

  /* P1 LAYOUT */
  .p1-layout { display:flex; gap:14px; align-items:flex-start; }
  .p1-preview { flex:0 0 148px; position:sticky; top:64px; align-self:flex-start; }
  .p1-options { flex:1; min-width:0; }

  /* GENDER TOGGLE */
  .gtoggle { display:flex; border:2px solid var(--navy); border-radius:3px; overflow:hidden; }
  .gtoggle-btn {
    flex:1; padding:9px 16px; font-family:'Black Han Sans',cursive; font-size:.88rem;
    border:none; cursor:pointer; transition:all .15s; background:transparent; color:var(--navy);
  }
  .gtoggle-btn.on { background:var(--navy); color:var(--white); }

  /* SHIP TIME */
  .ship-pill {
    background:var(--navy-pale); border:1.5px solid var(--border); border-radius:3px;
    padding:11px 14px; margin-bottom:12px; display:flex; align-items:center; gap:10px; transition:all .3s;
  }
  .ship-pill.live { border-color:var(--coral); background:var(--coral-pale); }

  .rockship  { animation:rk 2.2s ease-in-out infinite; display:inline-block; }
  @keyframes rk{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg) translateX(7px)}}
  .flyplane  { animation:fly 1.8s ease-in-out infinite; display:inline-block; }
  @keyframes fly{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
  .drivetruck{ animation:drv 1.4s ease-in-out infinite; display:inline-block; }
  @keyframes drv{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}

  @media(max-width:480px){
    .big-title{font-size:2rem} .ogrid3{grid-template-columns:1fr 1fr}
    .p1-layout{flex-direction:column} .p1-preview{position:static;flex:none;width:100%}
  }
`;

/* ──────────────────────────────────────────────
   WORLD MAP  (inline SVG, equirectangular)
   ────────────────────────────────────────────── */
const MAP_W=800, MAP_H=340;
const proj=(lat,lon)=>[((lon+180)/360)*MAP_W,((90-lat)/180)*MAP_H];
const pts=(pairs)=>pairs.map(([la,lo])=>proj(la,lo).join(",")).join(" ");
const CONTINENTS=[
  {id:"na",points:[[71,-162],[68,-166],[65,-168],[62,-165],[57,-170],[57,-163],[55,-162],[55,-160],[58,-153],[58,-152],[60,-147],[60,-145],[58,-137],[55,-131],[50,-127],[48,-124],[46,-124],[44,-124],[42,-124],[38,-123],[35,-120],[32,-117],[30,-116],[28,-110],[24,-110],[20,-105],[18,-103],[16,-94],[20,-87],[16,-86],[12,-84],[8,-78],[10,-72],[14,-62],[18,-68],[20,-75],[20,-66],[23,-82],[25,-80],[28,-82],[30,-81],[34,-78],[36,-76],[40,-74],[44,-66],[47,-68],[48,-68],[45,-64],[50,-66],[52,-56],[54,-58],[56,-62],[58,-62],[60,-65],[64,-52],[68,-50],[70,-54],[72,-56],[74,-60],[76,-70],[82,-60],[83,-46],[82,-30],[76,-20],[72,-22],[68,-24],[66,-36],[65,-50],[71,-162]]},
  {id:"sa",points:[[10,-73],[8,-63],[4,-52],[2,-50],[0,-50],[-2,-50],[-5,-36],[-8,-35],[-12,-37],[-15,-39],[-20,-40],[-22,-43],[-24,-46],[-28,-49],[-30,-51],[-32,-52],[-34,-53],[-38,-57],[-41,-63],[-44,-65],[-48,-66],[-52,-68],[-54,-68],[-56,-68],[-54,-74],[-50,-74],[-46,-73],[-42,-73],[-38,-72],[-30,-71],[-22,-70],[-15,-75],[-5,-80],[0,-78],[2,-77],[5,-76],[8,-77],[10,-73]]},
  {id:"eu",points:[[71,28],[70,20],[68,15],[65,14],[64,10],[61,5],[58,5],[57,8],[55,8],[52,4],[51,2],[49,-2],[44,-1],[42,3],[38,-1],[36,-6],[37,-9],[38,-9],[40,-8],[43,-8],[44,-1],[45,0],[43,7],[44,8],[46,10],[47,16],[48,17],[50,14],[52,14],[54,18],[57,21],[60,25],[65,26],[68,28],[71,28]]},
  {id:"af",points:[[37,10],[35,11],[32,12],[30,32],[27,34],[24,36],[16,42],[12,44],[8,48],[5,44],[2,42],[0,42],[-2,40],[-5,40],[-10,40],[-14,36],[-22,35],[-26,33],[-30,30],[-34,27],[-34,25],[-34,18],[-29,17],[-22,14],[-16,12],[-10,15],[0,10],[5,2],[5,-3],[10,-15],[15,-17],[20,-17],[24,-15],[30,-18],[35,-15],[37,10]]},
  {id:"as",points:[[71,180],[70,142],[65,143],[60,140],[58,162],[55,162],[52,141],[50,142],[46,138],[43,131],[40,122],[38,122],[35,120],[32,121],[28,121],[24,121],[20,110],[12,109],[8,104],[4,104],[1,110],[5,100],[10,99],[18,94],[22,92],[16,80],[8,77],[10,77],[14,74],[20,72],[24,66],[24,57],[24,51],[22,58],[18,55],[12,44],[8,48],[5,44],[2,42],[0,42],[2,40],[5,36],[10,42],[14,44],[16,42],[24,36],[30,32],[32,36],[36,36],[38,42],[40,44],[42,28],[46,30],[48,28],[50,30],[55,32],[58,60],[60,62],[65,60],[70,60],[71,180]]},
  {id:"au",points:[[-16,122],[-14,128],[-12,132],[-12,136],[-14,140],[-12,142],[-16,145],[-20,149],[-24,152],[-28,154],[-32,152],[-34,151],[-38,146],[-38,140],[-36,136],[-38,130],[-34,122],[-28,114],[-22,114],[-20,118],[-16,122]]},
];
const ISLANDS=[
  [[45,142],[40,140],[35,136],[33,131],[35,133],[38,141],[43,141],[45,142]],
  [[58,-3],[56,-5],[52,-4],[51,1],[52,2],[54,0],[57,-2],[60,-1],[58,-3]],
  [[-40,174],[-43,172],[-46,168],[-46,170],[-40,174]],
];
const FPINS={USA:{lat:39,lon:-97,flag:"🇺🇸",col:"#E8354A",label:"USA"},Mexico:{lat:23,lon:-102,flag:"🇲🇽",col:"#00C9A7",label:"Mexico"},China:{lat:28,lon:108,flag:"🇨🇳",col:"#FFD34E",label:"China"}};

function WorldSVGMap({factory}){
  return(
    <div style={{background:"#EEF0FF",borderRadius:4,overflow:"hidden",border:"1.5px solid #C5CAE9",marginBottom:12,width:"100%"}}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} width="100%" style={{display:"block"}} xmlns="http://www.w3.org/2000/svg">
        <rect width={MAP_W} height={MAP_H} fill="#EEF0FF"/>
        {[-60,-30,0,30,60].map(lat=>{const[,y]=proj(lat,0);return <line key={lat} x1={0} y1={y} x2={MAP_W} y2={y} stroke="#C5CAE9" strokeWidth=".6"/>;}) }
        {[-150,-120,-90,-60,-30,0,30,60,90,120,150].map(lon=>{const[x]=proj(0,lon);return <line key={lon} x1={x} y1={0} x2={x} y2={MAP_H} stroke="#C5CAE9" strokeWidth=".6"/>;})}
        {CONTINENTS.map(c=><polygon key={c.id} points={pts(c.points)} fill="#C5CAE9" stroke="#9BA8D8" strokeWidth=".7"/>)}
        {ISLANDS.map((isl,i)=><polygon key={i} points={pts(isl)} fill="#C5CAE9" stroke="#9BA8D8" strokeWidth=".7"/>)}
        {Object.entries(FPINS).map(([id,info])=>{
          const[px,py]=proj(info.lat,info.lon), sel=factory?.id===id;
          return(<g key={id}>
            {sel&&<circle cx={px} cy={py} r={18} fill={info.col} opacity=".2"/>}
            {sel&&<circle cx={px} cy={py} r={11} fill={info.col} opacity=".35"/>}
            <circle cx={px} cy={py} r={sel?7:4.5} fill={sel?info.col:"#9BA8D8"} stroke={sel?"#fff":"#6B7DB0"} strokeWidth={sel?2:1}/>
            {sel&&<g>
              <line x1={px} y1={py-7} x2={px} y2={py-22} stroke={info.col} strokeWidth="1.5" opacity=".8"/>
              <rect x={px-26} y={py-40} width={52} height={19} rx={3} fill={info.col}/>
              <text x={px} y={py-28} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="'Black Han Sans',cursive">{info.flag} {info.label}</text>
            </g>}
            {!sel&&<text x={px} y={py+14} textAnchor="middle" fontSize="8" fill="#9BA8D8" fontFamily="'Noto Sans',sans-serif">{info.label}</text>}
          </g>);
        })}
      </svg>
    </div>
  );
}

/* ────── SHIP TIMES (audited) ────── */
const SHIP_TIMES={USA:{"Cargo Ship":"4–7 days","Air Freight":"1–2 days","Truck":"2–5 days"},Mexico:{"Cargo Ship":"7–10 days","Air Freight":"1–2 days","Truck":"3–5 days"},China:{"Cargo Ship":"18–22 days","Air Freight":"3–5 days","Truck":null}};
const SHIP_WEEKS={USA:{"Cargo Ship":5.5/7,"Air Freight":1.5/7,"Truck":3.5/7},Mexico:{"Cargo Ship":8.5/7,"Air Freight":1.5/7,"Truck":4/7},China:{"Cargo Ship":20/7,"Air Freight":4/7,"Truck":null}};

function ShippingTimeDisplay({factory,ship}){
  if(!factory) return <div className="ship-pill"><span style={{fontSize:"1.25rem"}}>⏳</span><span style={{color:"var(--mid)",fontSize:".86rem"}}>Pick a factory location first to see shipping times</span></div>;
  if(!ship) return <div className="ship-pill"><span style={{fontSize:"1.25rem"}}>{factory.flag}</span><span style={{color:"var(--mid)",fontSize:".86rem"}}>Now pick a shipping method to see how long it takes!</span></div>;
  const time=SHIP_TIMES[factory.id]?.[ship.id];
  if(!time) return <div className="ship-pill" style={{borderColor:"var(--coral)"}}><span style={{fontSize:"1.25rem"}}>🚫</span><span style={{color:"var(--coral)",fontSize:".86rem"}}><b>Truck not available</b> from {factory.id} — too far!</span></div>;
  const isAir=ship.id==="Air Freight",isTruck=ship.id==="Truck";
  const color=isAir?"var(--coral)":isTruck?"#F59E0B":"var(--navy)";
  const anim=isAir?"flyplane":isTruck?"drivetruck":"rockship";
  return(
    <div className="ship-pill live">
      <span className={anim} style={{fontSize:"1.4rem"}}>{ship.emoji}</span>
      <div style={{flex:1}}>
        <div style={{fontSize:".72rem",color:"var(--mid)"}}>{factory.id} → 🇺🇸 USA via {ship.id}</div>
        <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.1rem",color}}>⏱ {time}</div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════
   ANIME / K-POP IDOL FASHION DOLL SVG
   Polished collectible doll aesthetic
   Flowing bezier curves, gradient fills, anime eyes
   ══════════════════════════════════════════════ */
function DollSVG({cfg,gender="female",size=200}){
  const W=size, H=size*2.2, cx=W/2;
  const hi=size>=120, med=size>=60, lo=!med;

  // ── PROPORTIONS ──
  const hR=W*0.175;
  const hCY=hR+W*0.04;
  const nkT=hCY+hR*0.92, nkB=nkT+hR*0.62, nkW=hR*0.36;
  const shY=nkB;
  const isMale=gender==="male";
  const shW=isMale?W*0.225:W*0.19;
  const wstY=shY+H*0.155, wstW=isMale?W*0.155:W*0.118;
  const hipY=wstY+H*0.058, hipW=isMale?W*0.19:W*0.215;
  const armBotY=wstY+H*0.05;
  const armW=W*0.048;
  const lgT=hipY, lgB=lgT+H*0.40, lgW=isMale?W*0.078:W*0.065;
  const lgXL=cx-hipW*0.48, lgXR=cx+hipW*0.48;
  const shoeT=lgB, shoeB=lgB+H*0.052;
  const skirtHemY=hipY+H*0.11;

  // ── LOOKUP TABLES ──
  const fHair={"Twin Tails":{c1:"#FF1A75",c2:"#FF85B3",c3:"#CC0055"},"K-Pop Wave":{c1:"#7B2FFF",c2:"#C47FFF",c3:"#5500BB"},"Demon Horns":{c1:"#180010",c2:"#8833EE",c3:"#330077"},"Rainbow Bob":{c1:"#00C9FF",c2:"#FF6FD8",c3:"#FFE347"}};
  const mHair={"Side Sweep":{c1:"#1A0800",c2:"#5A2800",c3:"#2A0800"},"Undercut":{c1:"#0A0A1A",c2:"#4400BB",c3:"#000077"},"Spiky":{c1:"#DDBB00",c2:"#FF9900",c3:"#AA5500"},"Curly Top":{c1:"#200828",c2:"#DD00CC",c3:"#880088"}};
  const fOut={"Street Style":{top:"#1c1c3a",trim:"#9b30ff",btm:"#2a1545",belt:"#9b30ff"},"Stage Glam":{top:"#c8005a",trim:"#FFD34E",btm:"#8b0041",belt:"#FFD34E"},"Dark Angel":{top:"#0d0d0d",trim:"#7b00d4",btm:"#1a0828",belt:"#7b00d4"},"Idol Uniform":{top:"#1A2690",trim:"#ffffff",btm:"#0D1760",belt:"#ffffff"}};
  const mOut={"Street Fit":{top:"#1c1c3a",trim:"#9b30ff",btm:"#2a1545",belt:"#9b30ff"},"Stage King":{top:"#8b0041",trim:"#FFD34E",btm:"#4a0020",belt:"#FFD34E"},"Shadow Cloak":{top:"#0d0d0d",trim:"#7b00d4",btm:"#111111",belt:"#7b00d4"},"Idol Jacket":{top:"#1A2690",trim:"#ffffff",btm:"#0D1760",belt:"#ffffff"}};
  const eyeD={"Sparkle":{i:"#0AD4FF",r:"#0090CC"},"Demon":{i:"#FF2020",r:"#990000"},"Hologram":{i:"#CC44FF",r:"#8800CC"},"Sharp":{i:"#00EE88",r:"#007744"},"Fierce":{i:"#FF6600",r:"#993300"},"Galaxy":{i:"#7744FF",r:"#441188"}};
  const bootCol={"Street Style":"#120022","Stage Glam":"#C8005A","Dark Angel":"#0d0d0d","Idol Uniform":"#fff","Street Fit":"#120022","Stage King":"#4a0020","Shadow Cloak":"#0d0d0d","Idol Jacket":"#0D1760"};

  const hairLib=isMale?mHair:fHair;
  const outLib=isMale?mOut:fOut;
  const h=hairLib[cfg.hair]||Object.values(hairLib)[0];
  const o=outLib[cfg.outfit]||Object.values(outLib)[0];
  const e=eyeD[cfg.eyes]||eyeD.Sparkle;
  const bc=bootCol[cfg.outfit]||"#120022";

  // ── UNIQUE IDS ──
  const uid=`d${size}${isMale?"m":"f"}`;

  // ── EYE GEOMETRY ──
  const eyeRx=hR*0.38, eyeRy=hR*0.25;
  const eyeY=hCY+hR*0.05;
  const eyeXL=cx-hR*0.46, eyeXR=cx+hR*0.46;

  const almondPath=(ex,ey,rx,ry,right)=>{
    const d=right?1:-1;
    const ic=right?ex-rx:ex+rx;
    const oc=right?ex+rx:ex-rx;
    const ocY=ey-ry*0.35;
    return `M${ic},${ey} C${ic+d*rx*0.45},${ey-ry*1.35} ${oc-d*rx*0.35},${ocY-ry*1.0} ${oc},${ocY} C${oc-d*rx*0.2},${ocY+ry*1.1} ${ic+d*rx*0.3},${ey+ry*0.85} ${ic},${ey} Z`;
  };

  const Eye=({ex,right})=>{
    const ey=eyeY, rx=eyeRx, ry=eyeRy;
    const cid=`${uid}ec${right?1:0}`;
    const almond=almondPath(ex,ey,rx,ry,right);
    const d=right?1:-1;
    const ic=right?ex-rx:ex+rx;
    const oc=right?ex+rx:ex-rx;
    const ocY=ey-ry*0.35;
    const lidUp=`M${ic},${ey} C${ic+d*rx*0.45},${ey-ry*1.35} ${oc-d*rx*0.35},${ocY-ry*1.0} ${oc},${ocY}`;
    const irisR=ry*1.15;
    const irisX=ex, irisY=ey+ry*0.08;
    const isSparkle=cfg.eyes==="Sparkle";

    if(lo){
      return(<g>
        <path d={almond} fill="#fff"/>
        <circle cx={irisX} cy={irisY} r={irisR*0.8} fill={e.i}/>
        <circle cx={irisX} cy={irisY} r={irisR*0.35} fill="#000"/>
        <circle cx={ex-rx*0.18} cy={ey-ry*0.18} r={ry*0.22} fill="#fff" opacity=".9"/>
        <path d={almond} fill="none" stroke="#1A0A20" strokeWidth="0.7"/>
      </g>);
    }

    return(<g>
      <defs>
        <clipPath id={cid}><path d={almond}/></clipPath>
        <radialGradient id={`${cid}ig`} cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor={e.i} stopOpacity="1"/>
          <stop offset="55%" stopColor={e.i} stopOpacity=".9"/>
          <stop offset="78%" stopColor={e.r}/>
          <stop offset="100%" stopColor="#0A0010"/>
        </radialGradient>
      </defs>
      {/* eye white with subtle gradient */}
      <path d={almond} fill="#FAFAFA"/>
      {/* iris with radial gradient */}
      <circle cx={irisX} cy={irisY} r={irisR} fill={`url(#${cid}ig)`} clipPath={`url(#${cid})`}/>
      {/* iris detail ring */}
      <circle cx={irisX} cy={irisY} r={irisR*0.85} fill="none" stroke={e.r} strokeWidth="0.4" opacity=".5" clipPath={`url(#${cid})`}/>
      {/* pupil */}
      <circle cx={irisX} cy={irisY} r={irisR*0.32} fill="#050008" clipPath={`url(#${cid})`}/>
      {/* main highlight — upper left */}
      <ellipse cx={ex-rx*0.2} cy={ey-ry*0.22} rx={ry*0.36} ry={ry*0.28} fill="#fff" opacity=".95" clipPath={`url(#${cid})`}/>
      {/* secondary highlight — lower right */}
      <circle cx={ex+rx*0.18} cy={ey+ry*0.25} r={ry*0.16} fill="#fff" opacity=".55" clipPath={`url(#${cid})`}/>
      {/* sparkle stars for Sparkle eye style */}
      {isSparkle&&hi&&<>
        <circle cx={ex-rx*0.05} cy={ey-ry*0.5} r={ry*0.07} fill="#fff" opacity=".8" clipPath={`url(#${cid})`}/>
        <circle cx={ex+rx*0.28} cy={ey-ry*0.08} r={ry*0.06} fill="#fff" opacity=".7" clipPath={`url(#${cid})`}/>
      </>}
      {/* upper lash line — thick with flick */}
      <path d={lidUp} fill="none" stroke="#0A0010" strokeWidth={hi?"1.8":"1.2"} strokeLinecap="round"/>
      {/* lash flick at outer corner */}
      <line x1={oc} y1={ocY} x2={oc+d*rx*0.18} y2={ocY-ry*0.5} stroke="#0A0010" strokeWidth={hi?"1.4":"1.0"} strokeLinecap="round"/>
      {/* individual upper lashes */}
      {(hi?[-0.5,-0.15,0.2,0.45]:(med?[-0.3,0.2]:[])).map((t,li)=>{
        const lx=ex+d*rx*t;
        const la=d*(t*0.3+0.12);
        return <line key={li} x1={lx} y1={ey-ry*0.85} x2={lx+la*ry*1.8} y2={ey-ry*1.8} stroke="#0A0010" strokeWidth={hi?"1.0":"0.8"} strokeLinecap="round"/>;
      })}
      {/* subtle lower lash line */}
      <path d={`M${oc},${ocY} C${oc-d*rx*0.2},${ocY+ry*1.1} ${ic+d*rx*0.3},${ey+ry*0.85} ${ic},${ey}`} fill="none" stroke="#443344" strokeWidth={hi?"0.8":"0.5"} strokeLinecap="round" opacity=".6"/>
      {/* outline */}
      <path d={almond} fill="none" stroke="#1A0A20" strokeWidth={hi?"0.9":"0.6"}/>
    </g>);
  };

  // ── BODY PATH ──
  const bodyPath=()=>{
    if(isMale){
      return `M${cx-shW},${shY}
        C${cx-shW+W*0.01},${shY+H*0.06} ${cx-wstW-W*0.01},${wstY-H*0.02} ${cx-wstW},${wstY}
        C${cx-wstW-W*0.005},${wstY+H*0.02} ${cx-hipW+W*0.01},${hipY-H*0.01} ${cx-hipW},${hipY}
        L${cx+hipW},${hipY}
        C${cx+hipW-W*0.01},${hipY-H*0.01} ${cx+wstW+W*0.005},${wstY+H*0.02} ${cx+wstW},${wstY}
        C${cx+wstW+W*0.01},${wstY-H*0.02} ${cx+shW-W*0.01},${shY+H*0.06} ${cx+shW},${shY} Z`;
    }
    return `M${cx-shW},${shY}
      C${cx-shW+W*0.01},${shY+H*0.05} ${cx-wstW-W*0.02},${wstY-H*0.03} ${cx-wstW},${wstY}
      C${cx-wstW+W*0.005},${wstY+H*0.015} ${cx-hipW-W*0.01},${hipY-H*0.015} ${cx-hipW},${hipY}
      L${cx+hipW},${hipY}
      C${cx+hipW+W*0.01},${hipY-H*0.015} ${cx+wstW-W*0.005},${wstY+H*0.015} ${cx+wstW},${wstY}
      C${cx+wstW+W*0.02},${wstY-H*0.03} ${cx+shW-W*0.01},${shY+H*0.05} ${cx+shW},${shY} Z`;
  };

  // ── ARM PATHS (closed, filled) ──
  const armPath=(side)=>{
    const d=side==="left"?-1:1;
    const sx=cx+d*shW, sy=shY;
    const elbX=cx+d*(shW+W*0.055), elbY=shY+H*0.09;
    const wrX=cx+d*(shW+W*0.04), wrY=armBotY;
    const aw=armW;
    return `M${sx},${sy-aw*0.3}
      C${sx+d*W*0.02},${sy+H*0.03} ${elbX+d*aw*0.4},${elbY-H*0.02} ${elbX+d*aw*0.5},${elbY}
      C${elbX+d*aw*0.3},${elbY+H*0.03} ${wrX+d*aw*0.5},${wrY-H*0.02} ${wrX+d*aw*0.3},${wrY}
      L${wrX+d*aw*0.3},${wrY+W*0.025}
      C${wrX+d*aw*0.4},${wrY+W*0.05} ${wrX-d*aw*0.4},${wrY+W*0.055} ${wrX-d*aw*0.3},${wrY+W*0.025}
      L${wrX-d*aw*0.3},${wrY}
      C${wrX-d*aw*0.3},${wrY-H*0.02} ${elbX-d*aw*0.2},${elbY+H*0.03} ${elbX-d*aw*0.3},${elbY}
      C${elbX-d*aw*0.2},${elbY-H*0.02} ${sx-d*W*0.005},${sy+H*0.03} ${sx},${sy+aw*0.5} Z`;
  };

  // ── LEG PATHS (closed, filled) ──
  const legPath=(side)=>{
    const lgX=side==="left"?lgXL:lgXR;
    const d=side==="left"?-1:1;
    const thighW=lgW*1.3, kneeW=lgW*0.95, ankleW=lgW*0.7, calfW=lgW*1.05;
    const kneeY=lgT+H*0.18, calfY=lgT+H*0.28;
    return `M${lgX-thighW},${lgT}
      C${lgX-thighW-d*W*0.003},${kneeY-H*0.04} ${lgX-kneeW},${kneeY-H*0.01} ${lgX-kneeW},${kneeY}
      C${lgX-kneeW+W*0.002},${calfY-H*0.03} ${lgX-calfW+W*0.005},${calfY} ${lgX-ankleW},${lgB}
      L${lgX+ankleW},${lgB}
      C${lgX+calfW-W*0.005},${calfY} ${lgX+kneeW-W*0.002},${calfY-H*0.03} ${lgX+kneeW},${kneeY}
      C${lgX+kneeW},${kneeY-H*0.01} ${lgX+thighW+d*W*0.003},${kneeY-H*0.04} ${lgX+thighW},${lgT} Z`;
  };

  // ── SHOE PATHS ──
  const shoePath=(side)=>{
    const lgX=side==="left"?lgXL:lgXR;
    const d=side==="left"?-1:1;
    const ankleW=lgW*0.7;
    const toeX=lgX+d*W*0.06;
    const heelX=lgX-d*W*0.02;
    const soleH=H*0.012;
    if(isMale){
      return `M${lgX-ankleW},${shoeT}
        L${lgX-ankleW-d*W*0.01},${shoeB-soleH}
        Q${lgX-ankleW-d*W*0.015},${shoeB} ${lgX-d*W*0.035},${shoeB}
        L${lgX+d*W*0.08},${shoeB}
        Q${lgX+d*W*0.095},${shoeB} ${lgX+d*W*0.09},${shoeB-soleH}
        L${lgX+d*W*0.06},${shoeT+H*0.008}
        Q${lgX+ankleW+d*W*0.01},${shoeT} ${lgX+ankleW},${shoeT} Z`;
    }
    return `M${lgX-ankleW},${shoeT}
      C${lgX-ankleW},${shoeT+H*0.01} ${heelX-d*W*0.01},${shoeB-H*0.005} ${heelX},${shoeB}
      Q${lgX},${shoeB+H*0.003} ${toeX},${shoeB-H*0.003}
      Q${toeX+d*W*0.015},${shoeB-H*0.008} ${toeX},${shoeT+H*0.012}
      L${lgX+ankleW},${shoeT} Z`;
  };

  // ── HAIR RENDERERS ──
  const renderHairBack=()=>{
    const hb=[];
    if(!isMale){
      if(cfg.hair==="Twin Tails"){
        // Two flowing ponytails as teardrop bezier curves
        const tieY=hCY+hR*0.1;
        hb.push(
          <path key="ttb" d={`M${cx},${hCY-hR*0.95} C${cx-hR*1.1},${hCY-hR*1.0} ${cx-hR*1.2},${hCY-hR*0.2} ${cx-hR*1.05},${hCY+hR*0.3} L${cx-hR*0.85},${hCY-hR*0.1} C${cx-hR*0.7},${hCY-hR*0.8} ${cx},${hCY-hR*0.9} ${cx},${hCY-hR*0.95} Z`} fill={h.c1}/>,
          <path key="ttb2" d={`M${cx},${hCY-hR*0.95} C${cx+hR*1.1},${hCY-hR*1.0} ${cx+hR*1.2},${hCY-hR*0.2} ${cx+hR*1.05},${hCY+hR*0.3} L${cx+hR*0.85},${hCY-hR*0.1} C${cx+hR*0.7},${hCY-hR*0.8} ${cx},${hCY-hR*0.9} ${cx},${hCY-hR*0.95} Z`} fill={h.c1}/>,
          // Left flowing tail
          <path key="ttl" d={`M${cx-hR*1.0},${tieY} C${cx-W*0.35},${tieY+H*0.04} ${cx-W*0.42},${tieY+H*0.14} ${cx-W*0.38},${wstY+H*0.06} C${cx-W*0.36},${wstY+H*0.08} ${cx-W*0.28},${wstY+H*0.04} ${cx-W*0.30},${tieY+H*0.12} C${cx-W*0.32},${tieY+H*0.06} ${cx-W*0.28},${tieY+H*0.02} ${cx-hR*0.8},${tieY} Z`} fill={`url(#${uid}hg)`}/>,
          // Right flowing tail
          <path key="ttr" d={`M${cx+hR*1.0},${tieY} C${cx+W*0.35},${tieY+H*0.04} ${cx+W*0.42},${tieY+H*0.14} ${cx+W*0.38},${wstY+H*0.06} C${cx+W*0.36},${wstY+H*0.08} ${cx+W*0.28},${wstY+H*0.04} ${cx+W*0.30},${tieY+H*0.12} C${cx+W*0.32},${tieY+H*0.06} ${cx+W*0.28},${tieY+H*0.02} ${cx+hR*0.8},${tieY} Z`} fill={`url(#${uid}hg)`}/>
        );
      } else if(cfg.hair==="K-Pop Wave"){
        // Dramatic flowing side-swept volume
        hb.push(
          <path key="kwb" d={`M${cx-hR*0.3},${hCY-hR*1.05} C${cx-hR*1.3},${hCY-hR*0.8} ${cx-hR*1.45},${hCY+hR*0.5} ${cx-hR*1.2},${hCY+hR*1.5} C${cx-W*0.42},${hCY+H*0.18} ${cx-W*0.38},${wstY+H*0.04} ${cx-W*0.28},${wstY+H*0.06} C${cx-W*0.22},${wstY+H*0.04} ${cx-W*0.18},${hCY+H*0.12} ${cx-hR*0.6},${hCY+hR*0.8} C${cx-hR*0.4},${hCY+hR*0.3} ${cx-hR*0.3},${hCY-hR*0.2} ${cx-hR*0.3},${hCY-hR*1.05} Z`} fill={`url(#${uid}hg)`}/>,
          <path key="kwb2" d={`M${cx+hR*0.3},${hCY-hR*1.05} C${cx+hR*1.2},${hCY-hR*0.9} ${cx+hR*1.3},${hCY+hR*0.2} ${cx+hR*1.1},${hCY+hR*1.0} C${cx+hR*0.8},${hCY+hR*0.6} ${cx+hR*0.5},${hCY+hR*0.3} ${cx+hR*0.3},${hCY-hR*1.05} Z`} fill={h.c1}/>
        );
      } else if(cfg.hair==="Demon Horns"){
        // Sleek dark hair cap
        hb.push(
          <path key="dhb" d={`M${cx},${hCY-hR*1.08} C${cx-hR*1.15},${hCY-hR*1.0} ${cx-hR*1.2},${hCY+hR*0.1} ${cx-hR*0.9},${hCY+hR*0.6} L${cx-hR*0.7},${hCY+hR*0.3} C${cx-hR*0.6},${hCY-hR*0.4} ${cx},${hCY-hR*0.8} ${cx},${hCY-hR*1.08} Z`} fill={h.c1}/>,
          <path key="dhb2" d={`M${cx},${hCY-hR*1.08} C${cx+hR*1.15},${hCY-hR*1.0} ${cx+hR*1.2},${hCY+hR*0.1} ${cx+hR*0.9},${hCY+hR*0.6} L${cx+hR*0.7},${hCY+hR*0.3} C${cx+hR*0.6},${hCY-hR*0.4} ${cx},${hCY-hR*0.8} ${cx},${hCY-hR*1.08} Z`} fill={h.c1}/>,
          // Left horn
          <path key="dhl" d={`M${cx-hR*0.55},${hCY-hR*0.65} C${cx-hR*0.7},${hCY-hR*1.3} ${cx-hR*0.45},${hCY-hR*1.8} ${cx-hR*0.28},${hCY-hR*2.15} C${cx-hR*0.22},${hCY-hR*1.75} ${cx-hR*0.3},${hCY-hR*1.2} ${cx-hR*0.35},${hCY-hR*0.65} Z`} fill={`url(#${uid}horn)`}/>,
          // Right horn
          <path key="dhr" d={`M${cx+hR*0.55},${hCY-hR*0.65} C${cx+hR*0.7},${hCY-hR*1.3} ${cx+hR*0.45},${hCY-hR*1.8} ${cx+hR*0.28},${hCY-hR*2.15} C${cx+hR*0.22},${hCY-hR*1.75} ${cx+hR*0.3},${hCY-hR*1.2} ${cx+hR*0.35},${hCY-hR*0.65} Z`} fill={`url(#${uid}horn)`}/>
        );
      } else if(cfg.hair==="Rainbow Bob"){
        // Chin-length bob volume behind head
        hb.push(
          <path key="rbb" d={`M${cx},${hCY-hR*1.05} C${cx-hR*1.3},${hCY-hR*0.95} ${cx-hR*1.4},${hCY+hR*0.3} ${cx-hR*1.15},${hCY+hR*1.0} C${cx-hR*0.9},${hCY+hR*1.15} ${cx-hR*0.5},${hCY+hR*1.1} ${cx},${hCY+hR*1.05} C${cx+hR*0.5},${hCY+hR*1.1} ${cx+hR*0.9},${hCY+hR*1.15} ${cx+hR*1.15},${hCY+hR*1.0} C${cx+hR*1.4},${hCY+hR*0.3} ${cx+hR*1.3},${hCY-hR*0.95} ${cx},${hCY-hR*1.05} Z`} fill={h.c1}/>
        );
      }
    } else {
      if(cfg.hair==="Side Sweep"){
        hb.push(
          <path key="ssb" d={`M${cx},${hCY-hR*1.0} C${cx-hR*1.1},${hCY-hR*0.9} ${cx-hR*1.15},${hCY+hR*0.1} ${cx-hR*0.85},${hCY+hR*0.4} L${cx-hR*0.65},${hCY+hR*0.15} C${cx-hR*0.5},${hCY-hR*0.5} ${cx},${hCY-hR*0.85} ${cx},${hCY-hR*1.0} Z`} fill={h.c1}/>,
          <path key="ssb2" d={`M${cx},${hCY-hR*1.0} C${cx+hR*1.05},${hCY-hR*0.9} ${cx+hR*1.1},${hCY+hR*0.05} ${cx+hR*0.8},${hCY+hR*0.35} L${cx+hR*0.6},${hCY+hR*0.1} C${cx+hR*0.45},${hCY-hR*0.5} ${cx},${hCY-hR*0.85} ${cx},${hCY-hR*1.0} Z`} fill={h.c1}/>
        );
      } else if(cfg.hair==="Undercut"){
        hb.push(
          <path key="ucb" d={`M${cx-hR*0.85},${hCY+hR*0.2} C${cx-hR*0.95},${hCY-hR*0.3} ${cx-hR*0.8},${hCY-hR*0.7} ${cx},${hCY-hR*0.75} C${cx+hR*0.8},${hCY-hR*0.7} ${cx+hR*0.95},${hCY-hR*0.3} ${cx+hR*0.85},${hCY+hR*0.2} L${cx+hR*0.7},${hCY+hR*0.05} C${cx+hR*0.65},${hCY-hR*0.3} ${cx},${hCY-hR*0.5} ${cx-hR*0.65},${hCY-hR*0.3} L${cx-hR*0.7},${hCY+hR*0.05} Z`} fill={h.c1}/>
        );
        // texture dots for undercut sides
        if(hi){
          [-0.82,-0.78,-0.72,-0.68,0.68,0.72,0.78,0.82].forEach((dx,i)=>{
            hb.push(<circle key={`ucd${i}`} cx={cx+hR*dx} cy={hCY+hR*0.08} r={hR*0.02} fill={h.c1} opacity=".5"/>);
          });
        }
      } else if(cfg.hair==="Spiky"){
        hb.push(
          <path key="skb" d={`M${cx},${hCY-hR*0.95} C${cx-hR*1.1},${hCY-hR*0.85} ${cx-hR*1.15},${hCY+hR*0.05} ${cx-hR*0.85},${hCY+hR*0.3} L${cx-hR*0.65},${hCY+hR*0.05} C${cx-hR*0.5},${hCY-hR*0.45} ${cx},${hCY-hR*0.75} ${cx},${hCY-hR*0.95} Z`} fill={h.c1}/>,
          <path key="skb2" d={`M${cx},${hCY-hR*0.95} C${cx+hR*1.1},${hCY-hR*0.85} ${cx+hR*1.15},${hCY+hR*0.05} ${cx+hR*0.85},${hCY+hR*0.3} L${cx+hR*0.65},${hCY+hR*0.05} C${cx+hR*0.5},${hCY-hR*0.45} ${cx},${hCY-hR*0.75} ${cx},${hCY-hR*0.95} Z`} fill={h.c1}/>
        );
      } else if(cfg.hair==="Curly Top"){
        // Bouncy curls behind head
        [-0.55,-0.25,0.05,0.35,0.65].forEach((dx,i)=>{
          hb.push(<ellipse key={`ctb${i}`} cx={cx+hR*dx} cy={hCY-hR*0.65} rx={hR*0.32} ry={hR*0.38} fill={i%2===0?h.c1:h.c2}/>);
        });
        [-0.4,-0.1,0.2,0.5].forEach((dx,i)=>{
          hb.push(<ellipse key={`ctb2${i}`} cx={cx+hR*dx} cy={hCY-hR*0.88} rx={hR*0.26} ry={hR*0.3} fill={i%2===0?h.c2:h.c1}/>);
        });
      }
    }
    return hb;
  };

  const renderHairFront=()=>{
    const hf=[];
    if(!isMale){
      if(cfg.hair==="Twin Tails"){
        // Bangs with side-parted fringe strands
        hf.push(
          <path key="ttf" d={`M${cx-hR*0.95},${hCY+hR*0.08} C${cx-hR*0.98},${hCY-hR*0.85} ${cx-hR*0.3},${hCY-hR*1.08} ${cx},${hCY-hR*1.05} C${cx+hR*0.3},${hCY-hR*1.08} ${cx+hR*0.98},${hCY-hR*0.85} ${cx+hR*0.95},${hCY+hR*0.08} C${cx+hR*0.55},${hCY-hR*0.35} ${cx+hR*0.2},${hCY-hR*0.42} ${cx},${hCY-hR*0.42} C${cx-hR*0.2},${hCY-hR*0.42} ${cx-hR*0.55},${hCY-hR*0.35} ${cx-hR*0.95},${hCY+hR*0.08} Z`} fill={h.c2}/>
        );
        if(med){
          // Individual bang strands
          [-0.6,-0.3,0.0,0.3,0.6].forEach((dx,i)=>{
            hf.push(<path key={`tts${i}`} d={`M${cx+hR*dx},${hCY-hR*0.95} C${cx+hR*(dx-0.05)},${hCY-hR*0.7} ${cx+hR*(dx+0.03)},${hCY-hR*0.55} ${cx+hR*(dx-0.02)},${hCY-hR*0.38}`} stroke={h.c1} strokeWidth={hi?"2.2":"1.5"} fill="none" strokeLinecap="round" opacity=".7"/>);
          });
        }
        // Hair ties
        hf.push(
          <circle key="ttie1" cx={cx-hR*0.95} cy={hCY+hR*0.1} r={W*0.032} fill={h.c3} stroke={h.c1} strokeWidth="1"/>,
          <circle key="ttie2" cx={cx+hR*0.95} cy={hCY+hR*0.1} r={W*0.032} fill={h.c3} stroke={h.c1} strokeWidth="1"/>
        );
        // Shine highlight
        if(med) hf.push(<path key="tth" d={`M${cx-hR*0.35},${hCY-hR*0.82} Q${cx},${hCY-hR*0.95} ${cx+hR*0.28},${hCY-hR*0.84}`} stroke="rgba(255,255,255,.4)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>);
      } else if(cfg.hair==="K-Pop Wave"){
        // Asymmetric wavy bangs
        hf.push(
          <path key="kwf" d={`M${cx-hR*0.96},${hCY+hR*0.15} C${cx-hR*1.0},${hCY-hR*0.9} ${cx-hR*0.2},${hCY-hR*1.12} ${cx+hR*0.1},${hCY-hR*1.08} C${cx+hR*0.5},${hCY-hR*1.1} ${cx+hR*0.98},${hCY-hR*0.85} ${cx+hR*0.95},${hCY+hR*0.08} C${cx+hR*0.5},${hCY-hR*0.38} ${cx},${hCY-hR*0.45} ${cx-hR*0.5},${hCY-hR*0.32} Z`} fill={h.c2}/>
        );
        // Flowing side piece
        hf.push(
          <path key="kwside" d={`M${cx-hR*0.96},${hCY+hR*0.15} C${cx-hR*1.15},${hCY+hR*0.6} ${cx-hR*0.85},${hCY+hR*0.85} ${cx-hR*0.5},${hCY+hR*0.5}`} stroke={h.c1} strokeWidth={W*0.055} fill="none" strokeLinecap="round"/>
        );
        if(med){
          // Wave strands
          [-0.5,-0.15,0.2].forEach((dx,i)=>{
            hf.push(<path key={`kws${i}`} d={`M${cx+hR*dx},${hCY-hR*0.98} C${cx+hR*(dx-0.1)},${hCY-hR*0.65} ${cx+hR*(dx+0.08)},${hCY-hR*0.48} ${cx+hR*(dx-0.06)},${hCY-hR*0.3}`} stroke={h.c1} strokeWidth={hi?"2.5":"1.8"} fill="none" strokeLinecap="round" opacity=".6"/>);
          });
          // Shine
          hf.push(<path key="kwh" d={`M${cx-hR*0.5},${hCY-hR*0.72} Q${cx-hR*0.2},${hCY-hR*0.88} ${cx+hR*0.15},${hCY-hR*0.75}`} stroke="rgba(255,255,255,.3)" strokeWidth="2.8" fill="none" strokeLinecap="round"/>);
        }
      } else if(cfg.hair==="Demon Horns"){
        // Sleek bangs
        hf.push(
          <path key="dhf" d={`M${cx-hR*0.92},${hCY+hR*0.08} C${cx-hR*0.95},${hCY-hR*0.88} ${cx},${hCY-hR*1.05} C${cx+hR*0.95},${hCY-hR*0.88} ${cx+hR*0.92},${hCY+hR*0.08} C${cx+hR*0.5},${hCY-hR*0.42} ${cx},${hCY-hR*0.48} ${cx-hR*0.5},${hCY-hR*0.42} Z`} fill={h.c1}/>
        );
        // Purple accent glow
        if(med) hf.push(<path key="dhglow" d={`M${cx+hR*0.1},${hCY-hR*0.88} Q${cx+hR*0.35},${hCY-hR*0.6} ${cx+hR*0.25},${hCY-hR*0.1}`} stroke={h.c2} strokeWidth="4" fill="none" strokeLinecap="round" opacity=".7"/>);
        // Shine
        if(med) hf.push(<path key="dhsh" d={`M${cx-hR*0.35},${hCY-hR*0.78} Q${cx},${hCY-hR*0.92} ${cx+hR*0.3},${hCY-hR*0.8}`} stroke="rgba(255,255,255,.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>);
      } else if(cfg.hair==="Rainbow Bob"){
        // Bob bangs
        hf.push(
          <path key="rbf" d={`M${cx-hR*0.95},${hCY+hR*0.3} C${cx-hR*1.0},${hCY-hR*0.85} ${cx},${hCY-hR*1.08} C${cx+hR*1.0},${hCY-hR*0.85} ${cx+hR*0.95},${hCY+hR*0.3} C${cx+hR*0.5},${hCY-hR*0.28} ${cx},${hCY-hR*0.32} ${cx-hR*0.5},${hCY-hR*0.28} Z`} fill={h.c2}/>
        );
        // Rainbow color sections
        if(med){
          const rainbowColors=["#FF3CAC","#FF9F0A","#FFE347","#4ADE80","#38BDF8","#A78BFA"];
          rainbowColors.forEach((c,i)=>{
            const dx=-0.55+i*0.2;
            hf.push(<path key={`rbs${i}`} d={`M${cx+hR*dx},${hCY-hR*0.95} C${cx+hR*(dx+0.02)},${hCY-hR*0.6} ${cx+hR*(dx-0.03)},${hCY-hR*0.35} ${cx+hR*(dx+0.01)},${hCY-hR*0.15}`} stroke={c} strokeWidth={hi?"3":"2"} fill="none" strokeLinecap="round" opacity=".75"/>);
          });
        }
        // Shine
        if(med) hf.push(<path key="rbh" d={`M${cx-hR*0.3},${hCY-hR*0.82} Q${cx},${hCY-hR*0.96} ${cx+hR*0.25},${hCY-hR*0.84}`} stroke="rgba(255,255,255,.35)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>);
      }
    } else {
      if(cfg.hair==="Side Sweep"){
        // Swept bangs
        hf.push(
          <path key="ssf" d={`M${cx-hR*0.92},${hCY+hR*0.18} C${cx-hR*0.88},${hCY-hR*0.85} ${cx+hR*0.15},${hCY-hR*1.05} C${cx+hR*0.92},${hCY-hR*0.82} ${cx+hR*0.94},${hCY+hR*0.05} C${cx+hR*0.42},${hCY-hR*0.38} ${cx},${hCY-hR*0.42} ${cx-hR*0.42},${hCY-hR*0.36} Z`} fill={h.c2}/>
        );
        // Sweep direction strands
        if(med){
          hf.push(
            <path key="sss1" d={`M${cx-hR*0.75},${hCY-hR*0.5} Q${cx+hR*0.1},${hCY-hR*0.65} ${cx+hR*0.7},${hCY-hR*0.2}`} stroke={h.c1} strokeWidth={W*0.05} fill="none" strokeLinecap="round"/>,
            <path key="ssh" d={`M${cx-hR*0.45},${hCY-hR*0.65} Q${cx+hR*0.1},${hCY-hR*0.78} ${cx+hR*0.65},${hCY-hR*0.25}`} stroke="rgba(255,255,255,.22)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          );
        }
      } else if(cfg.hair==="Undercut"){
        // Longer styled top
        hf.push(
          <path key="ucf" d={`M${cx-hR*0.72},${hCY-hR*0.55} C${cx-hR*0.6},${hCY-hR*1.05} ${cx},${hCY-hR*1.08} C${cx+hR*0.6},${hCY-hR*1.05} ${cx+hR*0.72},${hCY-hR*0.55} C${cx+hR*0.38},${hCY-hR*0.48} ${cx},${hCY-hR*0.5} ${cx-hR*0.38},${hCY-hR*0.48} Z`} fill={h.c2}/>
        );
        // Colored streak
        if(med) hf.push(<path key="ucs" d={`M${cx+hR*0.12},${hCY-hR*1.0} Q${cx+hR*0.25},${hCY-hR*0.7} ${cx+hR*0.2},${hCY-hR*0.48}`} stroke={h.c3} strokeWidth="3.5" fill="none" strokeLinecap="round"/>);
        // Shine
        if(med) hf.push(<path key="uch" d={`M${cx-hR*0.25},${hCY-hR*0.88} Q${cx},${hCY-hR*0.98} ${cx+hR*0.2},${hCY-hR*0.9}`} stroke="rgba(255,255,255,.2)" strokeWidth="2" fill="none" strokeLinecap="round"/>);
      } else if(cfg.hair==="Spiky"){
        // Base front hair
        hf.push(
          <path key="skf" d={`M${cx-hR*0.92},${hCY+hR*0.15} C${cx-hR*0.9},${hCY-hR*0.45} ${cx-hR*0.55},${hCY-hR*0.85} ${cx},${hCY-hR*0.68} C${cx+hR*0.55},${hCY-hR*0.85} ${cx+hR*0.9},${hCY-hR*0.45} ${cx+hR*0.92},${hCY+hR*0.15} C${cx+hR*0.42},${hCY-hR*0.38} ${cx},${hCY-hR*0.42} ${cx-hR*0.42},${hCY-hR*0.38} Z`} fill={h.c1}/>
        );
        // Individual curved spikes
        const spikeData=[
          {dx:-0.48,h1:1.45,w:0.14,lean:-0.08},
          {dx:-0.22,h1:1.65,w:0.13,lean:-0.04},
          {dx:0.0,h1:1.75,w:0.14,lean:0.0},
          {dx:0.22,h1:1.65,w:0.13,lean:0.04},
          {dx:0.48,h1:1.45,w:0.14,lean:0.08}
        ];
        spikeData.forEach((s,i)=>{
          const sx=cx+hR*s.dx, bY=hCY-hR*0.6, tY=hCY-hR*s.h1;
          hf.push(
            <path key={`spk${i}`} d={`M${sx-hR*s.w},${bY} C${sx-hR*s.w*0.5},${bY-hR*0.4} ${sx+hR*s.lean-hR*s.w*0.3},${tY+hR*0.2} ${sx+hR*s.lean},${tY} C${sx+hR*s.lean+hR*s.w*0.3},${tY+hR*0.2} ${sx+hR*s.w*0.5},${bY-hR*0.4} ${sx+hR*s.w},${bY} Z`} fill={`url(#${uid}hg)`}/>
          );
          // Highlight along leading edge
          if(med) hf.push(
            <path key={`spkh${i}`} d={`M${sx-hR*s.w*0.6},${bY-hR*0.1} C${sx-hR*s.w*0.3},${bY-hR*0.35} ${sx+hR*s.lean-hR*s.w*0.2},${tY+hR*0.25} ${sx+hR*s.lean},${tY+hR*0.05}`} stroke="rgba(255,255,255,.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          );
        });
      } else if(cfg.hair==="Curly Top"){
        // Front curls
        [-0.45,-0.15,0.15,0.45].forEach((dx,i)=>{
          hf.push(<ellipse key={`ctf${i}`} cx={cx+hR*dx} cy={hCY-hR*0.72} rx={hR*0.3} ry={hR*0.35} fill={i%2===0?h.c1:h.c2}/>);
        });
        // Highlight curls
        if(med){
          [-0.3,0.0,0.3].forEach((dx,i)=>{
            hf.push(<ellipse key={`cth${i}`} cx={cx+hR*dx} cy={hCY-hR*0.78} rx={hR*0.15} ry={hR*0.18} fill="rgba(255,255,255,.15)"/>);
          });
          hf.push(<path key="ctsh" d={`M${cx+hR*0.18},${hCY-hR*0.55} Q${cx+hR*0.32},${hCY-hR*0.9} ${cx+hR*0.22},${hCY-hR*1.05}`} stroke={h.c3} strokeWidth="3.2" fill="none" strokeLinecap="round"/>);
        }
      }
    }
    return hf;
  };

  // ── OUTFIT DETAILS ──
  const renderOutfitDetails=()=>{
    const od=[];
    const outName=cfg.outfit;
    // Collar / neckline
    if(outName==="Street Style"||outName==="Street Fit"){
      // Hoodie collar with drawstrings
      od.push(
        <path key="hcol" d={`M${cx-nkW*1.1},${shY+H*0.005} C${cx-nkW*0.5},${shY+H*0.018} ${cx},${shY+H*0.025} ${cx+nkW*0.5},${shY+H*0.018} L${cx+nkW*1.1},${shY+H*0.005}`} stroke={o.trim} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".8"/>
      );
      if(hi){
        od.push(
          <line key="ds1" x1={cx-nkW*0.3} y1={shY+H*0.015} x2={cx-nkW*0.35} y2={shY+H*0.055} stroke={o.trim} strokeWidth="1" opacity=".6"/>,
          <line key="ds2" x1={cx+nkW*0.3} y1={shY+H*0.015} x2={cx+nkW*0.35} y2={shY+H*0.055} stroke={o.trim} strokeWidth="1" opacity=".6"/>
        );
      }
    } else if(outName==="Stage Glam"||outName==="Stage King"){
      // V-neck
      od.push(
        <path key="vneck" d={`M${cx-shW*0.5},${shY} L${cx},${shY+H*0.06} L${cx+shW*0.5},${shY}`} stroke={o.trim} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      );
      // Sequin sparkles
      if(hi){
        [[-0.22,0.08],[-0.05,0.12],[0.15,0.09],[-0.12,0.18],[0.08,0.2],[0.22,0.15],[-0.18,0.06],[0.0,0.16]].forEach(([dx,dy],i)=>{
          od.push(<circle key={`seq${i}`} cx={cx+shW*2*dx} cy={shY+H*dy} r={W*0.012} fill={o.trim} opacity=".7"/>);
        });
      } else if(med){
        [[-0.2,0.1],[0.15,0.12],[0.0,0.18]].forEach(([dx,dy],i)=>{
          od.push(<circle key={`seq${i}`} cx={cx+shW*2*dx} cy={shY+H*dy} r={W*0.015} fill={o.trim} opacity=".7"/>);
        });
      }
    } else if(outName==="Dark Angel"||outName==="Shadow Cloak"){
      // Crew neck
      od.push(
        <path key="cneck" d={`M${cx-nkW*1.0},${shY+H*0.003} C${cx},${shY+H*0.02} ${cx},${shY+H*0.02} ${cx+nkW*1.0},${shY+H*0.003}`} stroke={o.trim} strokeWidth="1.2" fill="none" opacity=".6"/>
      );
      // Wing shapes behind shoulders
      od.push(
        <path key="wl" d={`M${cx-shW*0.8},${shY+H*0.02} C${cx-shW*1.6},${shY-H*0.06} ${cx-shW*1.8},${shY-H*0.1} ${cx-shW*1.2},${shY-H*0.12} C${cx-shW*1.5},${shY-H*0.06} ${cx-shW*1.4},${shY+H*0.01} ${cx-shW*0.8},${shY+H*0.06} Z`} fill={o.trim} opacity=".25"/>,
        <path key="wr" d={`M${cx+shW*0.8},${shY+H*0.02} C${cx+shW*1.6},${shY-H*0.06} ${cx+shW*1.8},${shY-H*0.1} ${cx+shW*1.2},${shY-H*0.12} C${cx+shW*1.5},${shY-H*0.06} ${cx+shW*1.4},${shY+H*0.01} ${cx+shW*0.8},${shY+H*0.06} Z`} fill={o.trim} opacity=".25"/>
      );
      // Second wing layer
      if(hi){
        od.push(
          <path key="wl2" d={`M${cx-shW*0.85},${shY+H*0.03} C${cx-shW*1.4},${shY-H*0.03} ${cx-shW*1.55},${shY-H*0.06} ${cx-shW*1.1},${shY-H*0.08}`} stroke={o.trim} strokeWidth="1" fill="none" opacity=".4"/>,
          <path key="wr2" d={`M${cx+shW*0.85},${shY+H*0.03} C${cx+shW*1.4},${shY-H*0.03} ${cx+shW*1.55},${shY-H*0.06} ${cx+shW*1.1},${shY-H*0.08}`} stroke={o.trim} strokeWidth="1" fill="none" opacity=".4"/>
        );
      }
    } else if(outName==="Idol Uniform"||outName==="Idol Jacket"){
      // Lapel lines
      od.push(
        <path key="lap1" d={`M${cx-shW*0.55},${shY} L${cx-W*0.02},${shY+H*0.08} L${cx-W*0.01},${hipY}`} stroke={o.trim} strokeWidth="1.5" fill="none" opacity=".7"/>,
        <path key="lap2" d={`M${cx+shW*0.55},${shY} L${cx+W*0.02},${shY+H*0.08} L${cx+W*0.01},${hipY}`} stroke={o.trim} strokeWidth="1.5" fill="none" opacity=".7"/>
      );
      // Center buttons
      if(hi){
        [0.04,0.08,0.12].forEach((dy,i)=>{
          od.push(<circle key={`btn${i}`} cx={cx} cy={shY+H*dy+H*0.03} r={W*0.01} fill={o.trim} opacity=".8"/>);
        });
      }
      // Badge emblem
      if(med){
        const bx=cx-shW*0.35, by=shY+H*0.04;
        od.push(
          <rect key="badge" x={bx-W*0.02} y={by-W*0.015} width={W*0.04} height={W*0.03} rx={W*0.005} fill={o.trim} opacity=".5"/>,
          <line key="badgel" x1={bx-W*0.01} y1={by} x2={bx+W*0.01} y2={by} stroke={o.top} strokeWidth="0.8" opacity=".8"/>
        );
      }
    }
    return od;
  };

  return(
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Skin radial gradient */}
        <radialGradient id={`${uid}skin`} cx="48%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#FFF0E6"/>
          <stop offset="45%" stopColor="#FADCC8"/>
          <stop offset="100%" stopColor="#E8B896"/>
        </radialGradient>
        {/* Skin body gradient */}
        <radialGradient id={`${uid}skinb`} cx="50%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#FFF0E6"/>
          <stop offset="50%" stopColor="#FADCC8"/>
          <stop offset="100%" stopColor="#D4956E"/>
        </radialGradient>
        {/* Hair gradient (root to tip) */}
        <linearGradient id={`${uid}hg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={h.c1}/>
          <stop offset="100%" stopColor={h.c2}/>
        </linearGradient>
        {/* Horn gradient for Demon Horns */}
        <linearGradient id={`${uid}horn`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={h.c1}/>
          <stop offset="60%" stopColor={h.c2}/>
          <stop offset="100%" stopColor={h.c3}/>
        </linearGradient>
        {/* Outfit linear gradient overlay */}
        <linearGradient id={`${uid}og`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".12"/>
          <stop offset="100%" stopColor="#000000" stopOpacity=".15"/>
        </linearGradient>
        {/* Soft shadow filter */}
        <filter id={`${uid}shf`}><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        {/* Blush filter */}
        <radialGradient id={`${uid}blush`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB3C1" stopOpacity=".5"/>
          <stop offset="100%" stopColor="#FFB3C1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* ════ 1. HAIR BACK LAYER ════ */}
      {renderHairBack()}

      {/* ════ 2. LEGS + SHOES ════ */}
      {/* Left leg */}
      <path d={legPath("left")} fill={isMale?o.btm:"#FADCC8"}/>
      {!isMale&&<path d={legPath("left")} fill={`url(#${uid}skinb)`} opacity=".5"/>}
      {isMale&&<path d={legPath("left")} fill={`url(#${uid}og)`}/>}
      {/* Right leg */}
      <path d={legPath("right")} fill={isMale?o.btm:"#FADCC8"}/>
      {!isMale&&<path d={legPath("right")} fill={`url(#${uid}skinb)`} opacity=".5"/>}
      {isMale&&<path d={legPath("right")} fill={`url(#${uid}og)`}/>}
      {/* Knee suggestion (subtle darker line) */}
      {hi&&<>
        <ellipse cx={lgXL} cy={lgT+H*0.18} rx={lgW*0.5} ry={lgW*0.2} fill="none" stroke={isMale?o.trim:"#D4956E"} strokeWidth="0.6" opacity=".3"/>
        <ellipse cx={lgXR} cy={lgT+H*0.18} rx={lgW*0.5} ry={lgW*0.2} fill="none" stroke={isMale?o.trim:"#D4956E"} strokeWidth="0.6" opacity=".3"/>
      </>}

      {/* Shoes */}
      <path d={shoePath("left")} fill={bc}/>
      <path d={shoePath("right")} fill={bc}/>
      {/* Shoe sole line */}
      <line x1={lgXL-lgW*0.8} y1={shoeB-H*0.006} x2={lgXL+(isMale?1:-1)*W*0.07} y2={shoeB-H*0.006} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1={lgXR+lgW*0.8} y1={shoeB-H*0.006} x2={lgXR-(isMale?1:-1)*W*0.07} y2={shoeB-H*0.006} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Shoe highlight */}
      {med&&<>
        <path d={`M${lgXL-lgW*0.4},${shoeT+H*0.008} Q${lgXL},${shoeT+H*0.004} ${lgXL+lgW*0.4},${shoeT+H*0.008}`} stroke="rgba(255,255,255,.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d={`M${lgXR-lgW*0.4},${shoeT+H*0.008} Q${lgXR},${shoeT+H*0.004} ${lgXR+lgW*0.4},${shoeT+H*0.008}`} stroke="rgba(255,255,255,.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </>}

      {/* ════ 3. ARMS + HANDS ════ */}
      <path d={armPath("left")} fill="#FADCC8"/>
      <path d={armPath("left")} fill={`url(#${uid}skinb)`} opacity=".4"/>
      {/* Inner arm shadow */}
      {hi&&<path d={`M${cx-shW},${shY+armW*0.3} C${cx-shW-W*0.01},${shY+H*0.04} ${cx-shW-W*0.025},${armBotY-H*0.02} ${cx-shW-W*0.02},${armBotY}`} stroke="#D4956E" strokeWidth="0.7" fill="none" opacity=".4"/>}
      <path d={armPath("right")} fill="#FADCC8"/>
      <path d={armPath("right")} fill={`url(#${uid}skinb)`} opacity=".4"/>
      {hi&&<path d={`M${cx+shW},${shY+armW*0.3} C${cx+shW+W*0.01},${shY+H*0.04} ${cx+shW+W*0.025},${armBotY-H*0.02} ${cx+shW+W*0.02},${armBotY}`} stroke="#D4956E" strokeWidth="0.7" fill="none" opacity=".4"/>}

      {/* ════ 4. TORSO / BODY WITH OUTFIT ════ */}
      <path d={bodyPath()} fill={o.top}/>
      <path d={bodyPath()} fill={`url(#${uid}og)`}/>
      {/* Side depth overlay */}
      {hi&&<>
        <path d={`M${cx-shW},${shY} C${cx-shW+W*0.005},${shY+H*0.04} ${cx-wstW-W*0.01},${wstY-H*0.01} ${cx-wstW},${wstY}`} stroke="rgba(0,0,0,.12)" strokeWidth="2" fill="none"/>
        <path d={`M${cx+shW},${shY} C${cx+shW-W*0.005},${shY+H*0.04} ${cx+wstW+W*0.01},${wstY-H*0.01} ${cx+wstW},${wstY}`} stroke="rgba(0,0,0,.12)" strokeWidth="2" fill="none"/>
      </>}

      {/* ════ 5. OUTFIT DETAILS ════ */}
      {renderOutfitDetails()}

      {/* ════ 6. BELT ════ */}
      <rect x={cx-wstW*1.6} y={wstY+H*0.008} width={wstW*3.2} height={H*0.02} rx={H*0.008} fill={o.belt} opacity=".9"/>
      {hi&&<rect x={cx-W*0.01} y={wstY+H*0.01} width={W*0.02} height={H*0.015} rx={H*0.005} fill={o.belt} stroke="rgba(0,0,0,.15)" strokeWidth="0.5"/>}

      {/* ════ 7. SKIRT / PANTS OVERLAY ════ */}
      {!isMale&&(
        <path d={`M${cx-hipW*1.08},${hipY} C${cx-hipW*1.15},${hipY+H*0.02} ${cx-hipW*1.1},${skirtHemY-H*0.01} ${cx-hipW*0.75},${skirtHemY} C${cx-hipW*0.4},${skirtHemY+H*0.008} ${cx},${skirtHemY+H*0.01} ${cx+hipW*0.4},${skirtHemY+H*0.008} L${cx+hipW*0.75},${skirtHemY} C${cx+hipW*1.1},${skirtHemY-H*0.01} ${cx+hipW*1.15},${hipY+H*0.02} ${cx+hipW*1.08},${hipY} Z`} fill={o.btm}/>
      )}
      {!isMale&&hi&&(
        // Skirt pleat lines
        <g opacity=".2">
          {[-0.5,-0.15,0.15,0.5].map((dx,i)=>(
            <line key={`pl${i}`} x1={cx+hipW*dx} y1={hipY+H*0.005} x2={cx+hipW*dx*0.85} y2={skirtHemY-H*0.005} stroke={o.trim} strokeWidth="0.8"/>
          ))}
        </g>
      )}
      {isMale&&(
        <path d={`M${cx-hipW},${hipY}
          C${cx-hipW+W*0.01},${hipY+H*0.08} ${cx-hipW*0.55},${lgT+H*0.28} ${lgXL-lgW*1.1},${lgB}
          L${lgXL+lgW*1.1},${lgB}
          C${cx-lgW*0.3},${lgT+H*0.15} ${cx-lgW*0.2},${hipY+H*0.02} ${cx},${hipY+H*0.01}
          C${cx+lgW*0.2},${hipY+H*0.02} ${cx+lgW*0.3},${lgT+H*0.15} ${lgXR-lgW*1.1},${lgB}
          L${lgXR+lgW*1.1},${lgB}
          C${cx+hipW*0.55},${lgT+H*0.28} ${cx+hipW-W*0.01},${hipY+H*0.08} ${cx+hipW},${hipY} Z`} fill={o.btm}/>
      )}
      {isMale&&(
        <path d={`M${cx-hipW},${hipY}
          C${cx-hipW+W*0.01},${hipY+H*0.08} ${cx-hipW*0.55},${lgT+H*0.28} ${lgXL-lgW*1.1},${lgB}
          L${lgXL+lgW*1.1},${lgB}
          C${cx-lgW*0.3},${lgT+H*0.15} ${cx-lgW*0.2},${hipY+H*0.02} ${cx},${hipY+H*0.01}
          C${cx+lgW*0.2},${hipY+H*0.02} ${cx+lgW*0.3},${lgT+H*0.15} ${lgXR-lgW*1.1},${lgB}
          L${lgXR+lgW*1.1},${lgB}
          C${cx+hipW*0.55},${lgT+H*0.28} ${cx+hipW-W*0.01},${hipY+H*0.08} ${cx+hipW},${hipY} Z`} fill={`url(#${uid}og)`}/>
      )}

      {/* ════ 8. NECK ════ */}
      <path d={`M${cx-nkW},${nkT} C${cx-nkW*0.9},${nkT+hR*0.15} ${cx-nkW*0.8},${nkB} ${cx-nkW*0.82},${nkB} L${cx+nkW*0.82},${nkB} C${cx+nkW*0.8},${nkB} ${cx+nkW*0.9},${nkT+hR*0.15} ${cx+nkW},${nkT} Z`} fill="#FADCC8"/>
      <path d={`M${cx-nkW},${nkT} C${cx-nkW*0.9},${nkT+hR*0.15} ${cx-nkW*0.8},${nkB} ${cx-nkW*0.82},${nkB} L${cx+nkW*0.82},${nkB} C${cx+nkW*0.8},${nkB} ${cx+nkW*0.9},${nkT+hR*0.15} ${cx+nkW},${nkT} Z`} fill={`url(#${uid}skinb)`} opacity=".3"/>
      {/* Neck shadow under chin */}
      {med&&<ellipse cx={cx} cy={nkT+hR*0.08} rx={nkW*0.7} ry={hR*0.06} fill="#D4956E" opacity=".3"/>}

      {/* ════ 9. HEAD ════ */}
      {/* Face shape with jaw taper — anime proportioned */}
      <path d={`M${cx-hR*0.82},${hCY-hR*0.18}
        C${cx-hR*1.02},${hCY-hR*0.55} ${cx-hR*1.02},${hCY-hR*1.02} ${cx},${hCY-hR*1.08}
        C${cx+hR*1.02},${hCY-hR*1.02} ${cx+hR*1.02},${hCY-hR*0.55} ${cx+hR*0.82},${hCY-hR*0.18}
        C${cx+hR*0.75},${hCY+hR*0.3} ${cx+hR*0.48},${hCY+hR*0.85} ${cx},${hCY+hR*1.0}
        C${cx-hR*0.48},${hCY+hR*0.85} ${cx-hR*0.75},${hCY+hR*0.3} ${cx-hR*0.82},${hCY-hR*0.18} Z`} fill="#FADCC8"/>
      {/* Face skin gradient overlay */}
      <path d={`M${cx-hR*0.82},${hCY-hR*0.18}
        C${cx-hR*1.02},${hCY-hR*0.55} ${cx-hR*1.02},${hCY-hR*1.02} ${cx},${hCY-hR*1.08}
        C${cx+hR*1.02},${hCY-hR*1.02} ${cx+hR*1.02},${hCY-hR*0.55} ${cx+hR*0.82},${hCY-hR*0.18}
        C${cx+hR*0.75},${hCY+hR*0.3} ${cx+hR*0.48},${hCY+hR*0.85} ${cx},${hCY+hR*1.0}
        C${cx-hR*0.48},${hCY+hR*0.85} ${cx-hR*0.75},${hCY+hR*0.3} ${cx-hR*0.82},${hCY-hR*0.18} Z`} fill={`url(#${uid}skin)`}/>
      {/* Forehead highlight */}
      {med&&<ellipse cx={cx} cy={hCY-hR*0.55} rx={hR*0.45} ry={hR*0.25} fill="#FFF0E6" opacity=".3"/>}
      {/* Nose bridge highlight */}
      {hi&&<line x1={cx} y1={hCY-hR*0.15} x2={cx} y2={hCY+hR*0.3} stroke="#FFF0E6" strokeWidth="1.5" opacity=".2" strokeLinecap="round"/>}

      {/* ════ 10. CHEEK BLUSH ════ */}
      <ellipse cx={cx-hR*0.62} cy={hCY+hR*0.32} rx={hR*0.22} ry={hR*0.12} fill={`url(#${uid}blush)`} opacity={isMale?".5":".8"}/>
      <ellipse cx={cx+hR*0.62} cy={hCY+hR*0.32} rx={hR*0.22} ry={hR*0.12} fill={`url(#${uid}blush)`} opacity={isMale?".5":".8"}/>

      {/* ════ 11. EYES ════ */}
      <Eye ex={eyeXL} right={false}/>
      <Eye ex={eyeXR} right={true}/>

      {/* ════ 12. EYEBROWS ════ */}
      {[[-1],[1]].map(([d])=>{
        const bx=cx+d*hR*0.44;
        const thick=isMale?2.4:1.8;
        return <path key={d} d={`M${bx-d*hR*0.3},${hCY-hR*(isMale?0.44:0.48)} C${bx-d*hR*0.1},${hCY-hR*(isMale?0.56:0.62)} ${bx+d*hR*0.2},${hCY-hR*(isMale?0.52:0.56)} ${bx+d*hR*0.32},${hCY-hR*(isMale?0.42:0.44)}`} stroke="#1A0A20" strokeWidth={thick} fill="none" strokeLinecap="round"/>;
      })}

      {/* ════ 13. NOSE ════ */}
      <path d={`M${cx-hR*0.05},${hCY+hR*0.42} Q${cx},${hCY+hR*0.36} ${cx+hR*0.05},${hCY+hR*0.42}`} stroke="#D4956E" strokeWidth="1" fill="none" strokeLinecap="round" opacity=".7"/>
      {hi&&<>
        <circle cx={cx-hR*0.08} cy={hCY+hR*0.44} r={hR*0.025} fill="#D4956E" opacity=".45"/>
        <circle cx={cx+hR*0.08} cy={hCY+hR*0.44} r={hR*0.025} fill="#D4956E" opacity=".45"/>
      </>}

      {/* ════ 14. MOUTH / LIPS ════ */}
      {!isMale&&<>
        {/* Upper lip — cupid's bow */}
        <path d={`M${cx-hR*0.24},${hCY+hR*0.6} C${cx-hR*0.16},${hCY+hR*0.55} ${cx-hR*0.05},${hCY+hR*0.53} ${cx},${hCY+hR*0.56} C${cx+hR*0.05},${hCY+hR*0.53} ${cx+hR*0.16},${hCY+hR*0.55} ${cx+hR*0.24},${hCY+hR*0.6}`} stroke="#D4618A" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Lower lip filled */}
        <path d={`M${cx-hR*0.24},${hCY+hR*0.6} Q${cx},${hCY+hR*0.76} ${cx+hR*0.24},${hCY+hR*0.6}`} fill="#FF9AC6" opacity=".7"/>
        <path d={`M${cx-hR*0.24},${hCY+hR*0.6} Q${cx},${hCY+hR*0.76} ${cx+hR*0.24},${hCY+hR*0.6}`} stroke="#D4618A" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        {/* Lip gloss highlight */}
        {med&&<path d={`M${cx-hR*0.08},${hCY+hR*0.66} Q${cx},${hCY+hR*0.64} ${cx+hR*0.06},${hCY+hR*0.66}`} stroke="rgba(255,255,255,.55)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>}
      </>}
      {isMale&&<>
        <path d={`M${cx-hR*0.22},${hCY+hR*0.6} Q${cx-hR*0.08},${hCY+hR*0.56} ${cx},${hCY+hR*0.58} Q${cx+hR*0.08},${hCY+hR*0.56} ${cx+hR*0.22},${hCY+hR*0.6}`} stroke="#A05060" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d={`M${cx-hR*0.22},${hCY+hR*0.6} Q${cx},${hCY+hR*0.72} ${cx+hR*0.22},${hCY+hR*0.6}`} fill="#C07080" opacity=".4"/>
        <path d={`M${cx-hR*0.22},${hCY+hR*0.6} Q${cx},${hCY+hR*0.72} ${cx+hR*0.22},${hCY+hR*0.6}`} stroke="#A05060" strokeWidth="1.0" fill="none" strokeLinecap="round"/>
      </>}

      {/* ════ 15. HAIR FRONT LAYER ════ */}
      {renderHairFront()}
    </svg>
  );
}

/* ── DOLL PREVIEW WRAPPER (name below) ── */
function DollPreview({cfg,gender,size=118}){
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <DollSVG cfg={cfg} gender={gender} size={size}/>
      {cfg.name&&(
        <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".88rem",color:"var(--navy)",marginTop:3,letterSpacing:".5px",textAlign:"center"}}>
          {cfg.name}
        </div>
      )}
    </div>
  );
}

/* ── CONFETTI ── */
function Confetti({on}){
  if(!on) return null;
  const c=["#E8354A","#1A2690","#FFD34E","#4ADE80","#FF9F0A","#C084FC"];
  return(
    <div className="confbox">
      {Array.from({length:48}).map((_,i)=>(
        <div key={i} className="cp" style={{left:`${Math.random()*100}%`,background:c[i%c.length],width:`${6+Math.random()*9}px`,height:`${6+Math.random()*9}px`,borderRadius:Math.random()>.5?"50%":"2px",animationDuration:`${1.2+Math.random()*2.2}s`,animationDelay:`${Math.random()*.5}s`}}/>
      ))}
    </div>
  );
}

/* ── COST BADGE ── */
function CostBadge({cost}){
  const [pop,setPop]=useState(false);
  const prev=useRef(cost);
  useEffect(()=>{if(cost!==prev.current){prev.current=cost;setPop(true);const t=setTimeout(()=>setPop(false),340);return()=>clearTimeout(t);}},[cost]);
  return <div className={`cost-badge${pop?" pop":""}`}>💰 ${cost.toFixed(2)} / doll</div>;
}

/* ══════════════════════════════════════
   DATA CONSTANTS
   ══════════════════════════════════════ */
const FEMALE_HAIR=[{id:"Twin Tails",emoji:"🎀",cost:.55,desc:"Classic idol pigtails"},{id:"K-Pop Wave",emoji:"🌊",cost:.75,desc:"Swoopy side part"},{id:"Demon Horns",emoji:"😈",cost:.95,desc:"Dark & edgy horns"},{id:"Rainbow Bob",emoji:"🌈",cost:1.10,desc:"Multi-color streaks"}];
const MALE_HAIR=[{id:"Side Sweep",emoji:"💈",cost:.55,desc:"Swept to one side"},{id:"Undercut",emoji:"⚡",cost:.75,desc:"Shaved sides, styled top"},{id:"Spiky",emoji:"🔥",cost:.90,desc:"Anime-style spikes"},{id:"Curly Top",emoji:"🌀",cost:1.10,desc:"Fluffy curls + streak"}];
const FEMALE_EYES=[{id:"Sparkle",emoji:"✨",cost:.25,desc:"Electric blue"},{id:"Demon",emoji:"🔥",cost:.45,desc:"Glowing red"},{id:"Hologram",emoji:"💜",cost:.65,desc:"Purple galaxy"}];
const MALE_EYES=[{id:"Sharp",emoji:"⚡",cost:.25,desc:"Electric green"},{id:"Fierce",emoji:"🔥",cost:.45,desc:"Deep amber"},{id:"Galaxy",emoji:"🌌",cost:.65,desc:"Deep violet"}];
const FEMALE_OUTFITS=[{id:"Street Style",emoji:"🧥",cost:.85,desc:"Cool & casual"},{id:"Stage Glam",emoji:"⭐",cost:1.50,desc:"Gold & glitter"},{id:"Dark Angel",emoji:"🖤",cost:1.35,desc:"Moody vibes"},{id:"Idol Uniform",emoji:"💙",cost:1.20,desc:"Group uniform"}];
const MALE_OUTFITS=[{id:"Street Fit",emoji:"🧥",cost:.85,desc:"Hoodie & joggers"},{id:"Stage King",emoji:"👑",cost:1.50,desc:"Glam rock jacket"},{id:"Shadow Cloak",emoji:"🖤",cost:1.35,desc:"All-black fit"},{id:"Idol Jacket",emoji:"💙",cost:1.20,desc:"Sharp group jacket"}];
const BODY_OPTS=[{id:"Plastic",emoji:"🧱",cost:.75,desc:"Classic hard shell"},{id:"Soft Vinyl",emoji:"🫧",cost:1.20,desc:"Squishy & bendy"},{id:"Plush",emoji:"🧸",cost:.95,desc:"Soft & huggable"}];
const QTY_OPTS=[{id:"10",qty:10,mult:3.2,emoji:"🤲",desc:"Almost handmade!",prodWeeks:.5},{id:"100",qty:100,mult:1.6,emoji:"📦",desc:"Small batch",prodWeeks:1},{id:"1,000",qty:1000,mult:1.0,emoji:"🏪",desc:"Now we're cooking!",prodWeeks:3},{id:"10,000",qty:10000,mult:.6,emoji:"🏭",desc:"Cheapest per doll!",prodWeeks:8}];
const FACTORY_OPTS=[{id:"USA",flag:"🇺🇸",labor:6.50,desc:"Super fast, but pricey.",defectRate:.015},{id:"Mexico",flag:"🇲🇽",labor:2.50,desc:"Good balance of cost & time.",defectRate:.04},{id:"China",flag:"🇨🇳",labor:.85,desc:"Where most toys are made!",defectRate:.06}];
const SHIP_OPTS_ALL=[{id:"Cargo Ship",emoji:"🚢",cost:.25,desc:"Cheapest — but very slow!",usaOnly:false},{id:"Air Freight",emoji:"✈️",cost:2.00,desc:"Fastest — but pricey!",usaOnly:false},{id:"Truck",emoji:"🚛",cost:.35,desc:"USA & Mexico only",usaOnly:true}];
const BOX_OPTS=[{id:"Plain Box",emoji:"📦",cost:.20,desc:"Simple brown box"},{id:"Holo Box",emoji:"✨",cost:.65,desc:"Shiny holographic!"},{id:"Window Box",emoji:"🪟",cost:1.00,desc:"Kids can see the doll!"}];
const BODY_DEFECT={"Plastic":0,"Soft Vinyl":.015,"Plush":.03};
const PR={female:{sub:"she",obj:"her",pos:"her",cap:"She",capObj:"Her"},male:{sub:"he",obj:"him",pos:"his",cap:"He",capObj:"Him"}};

/* ════════════════════
   PHASE 1
   ════════════════════ */
function Phase1({onCostChange,onDone}){
  const [gender,setGender]=useState("female");
  const [name,setName]=useState("");
  const [hair,setHair]=useState(null);
  const [eyes,setEyes]=useState(null);
  const [outfit,setOutfit]=useState(null);
  const [body,setBody]=useState(null);
  const hairOpts=gender==="male"?MALE_HAIR:FEMALE_HAIR;
  const eyeOpts=gender==="male"?MALE_EYES:FEMALE_EYES;
  const outfitOpts=gender==="male"?MALE_OUTFITS:FEMALE_OUTFITS;
  const p=PR[gender];
  const handleGender=(g)=>{setGender(g);setHair(null);setEyes(null);setOutfit(null);};
  const baseCost=(hair?.cost||0)+(eyes?.cost||0)+(outfit?.cost||0)+(body?.cost||0);
  const cfg={name:name.trim(),hair:hair?.id||"",eyes:eyes?.id||"",outfit:outfit?.id||"",body:body?.id||""};
  const ok=name.trim()&&hair&&eyes&&outfit&&body;
  useEffect(()=>{onCostChange(baseCost);},[baseCost]);
  const Sel=({list,val,set,three=false})=>(
    <div className={three?"ogrid3":"ogrid"}>
      {list.map(o=>(
        <button key={o.id} className={`obtn${val?.id===o.id?" on":""}`} onClick={()=>set(o)}>
          <span className="oe">{o.emoji}</span>{o.id}
          <span style={{display:"block",fontSize:".7rem",color:val?.id===o.id?"rgba(255,255,255,.5)":"var(--mid)",marginTop:2}}>{o.desc}</span>
          <span className="oc">+${o.cost.toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
  return(
    <div className="slide">
      <div style={{textAlign:"center",marginBottom:6}}><span className="step-pill">✏️ Step 1 of 4</span></div>
      <h1 className="big-title">Design Your Doll</h1>
      <p className="sub">Every pick changes the look — and the cost to build it</p>
      <div className="card">
        <div className="card-title">🎭 What kind of doll?</div>
        <div className="gtoggle"><button className={`gtoggle-btn${gender==="female"?" on":""}`} onClick={()=>handleGender("female")}>👧 Girl Doll</button><button className={`gtoggle-btn${gender==="male"?" on":""}`} onClick={()=>handleGender("male")}>👦 Boy Doll</button></div>
      </div>
      <div className="p1-layout">
        <div className="p1-preview">
          <div className="card" style={{padding:"12px 8px",background:"var(--navy-pale)",border:"1.5px solid var(--navy)"}}>
            <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".8rem",color:"var(--navy)",textAlign:"center",marginBottom:6,letterSpacing:"1px"}}>LIVE PREVIEW</div>
            <DollPreview cfg={cfg} gender={gender} size={120}/>
            {baseCost>0&&!cfg.name&&<div style={{marginTop:4,fontFamily:"'Black Han Sans',cursive",fontSize:".85rem",color:"var(--coral)",textAlign:"center"}}>${baseCost.toFixed(2)}</div>}
            {!hair&&<div style={{fontSize:".68rem",color:"var(--mid)",marginTop:4,textAlign:"center"}}>Pick options →<br/>to dress {p.obj}!</div>}
          </div>
        </div>
        <div className="p1-options">
          <div className="card">
            <div className="card-title">🏷️ Give {p.obj} a name</div>
            <input className="ninput" placeholder="DOLL NAME…" maxLength={12} value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="card">
            <div className="card-title">💇 Hair Style</div>
            <div className="fact">💡 More colors = more dye and more factory steps, so it costs more!</div>
            <Sel list={hairOpts} val={hair} set={setHair}/>
          </div>
          <div className="card">
            <div className="card-title">👀 Eye Style</div>
            <div className="fact">💡 Fancier eye printing takes longer and costs more — each one is hand-checked!</div>
            <Sel list={eyeOpts} val={eyes} set={setEyes} three/>
          </div>
          <div className="card">
            <div className="card-title">👗 Outfit</div>
            <div className="fact">💡 More sequins and layers = more fabric and more sewing time!</div>
            <Sel list={outfitOpts} val={outfit} set={setOutfit}/>
          </div>
          <div className="card">
            <div className="card-title">🧸 Body Material</div>
            <div className="fact">💡 Soft vinyl and plush feel better — but can also break or tear more easily!</div>
            <Sel list={BODY_OPTS} val={body} set={setBody} three/>
          </div>
        </div>
      </div>
      <button className="gbtn" disabled={!ok} onClick={()=>onDone({name:name.trim(),hair,eyes,outfit,body,baseCost,gender})}>
        Send {name||"Your Doll"} to the Factory →
      </button>
    </div>
  );
}

/* ════════════════════
   PHASE 2
   ════════════════════ */
function Phase2({doll,onCostChange,onDone}){
  const [qty,setQty]=useState(null);
  const [factory,setFactory]=useState(null);
  const [ship,setShip]=useState(null);
  const [box,setBox]=useState(null);
  const p=PR[doll.gender||"female"];
  const shipOpts=factory?.id==="China"?SHIP_OPTS_ALL.filter(s=>!s.usaOnly):SHIP_OPTS_ALL;
  const perDoll=+((doll.baseCost*(qty?.mult||1))+(factory?.labor||0)+(ship?.cost||0)+(box?.cost||0)).toFixed(2);
  useEffect(()=>{onCostChange(perDoll);},[perDoll]);
  const Sel=({list,val,set,three=false})=>(
    <div className={three?"ogrid3":"ogrid"}>
      {list.map(o=>(
        <button key={o.id} className={`obtn${val?.id===o.id?" on":""}`} onClick={()=>set(o)}>
          <span className="oe">{o.emoji||o.flag}</span>{o.id}
          <span style={{display:"block",fontSize:".7rem",color:val?.id===o.id?"rgba(255,255,255,.5)":"var(--mid)",marginTop:2}}>{o.desc}</span>
          <span className="oc">{o.mult?`×${o.mult} materials`:o.labor!=null?`$${o.labor.toFixed(2)}/doll`:`+$${o.cost.toFixed(2)}/doll`}</span>
        </button>
      ))}
    </div>
  );
  return(
    <div className="slide">
      <div style={{textAlign:"center",marginBottom:6}}><span className="step-pill">🏭 Step 2 of 4</span></div>
      <h1 className="big-title">Run the Factory</h1>
      <p className="sub">Where to build, how many to make, how to ship {p.obj}</p>
      <div className="card">
        <div className="card-title">📊 How many {doll.name}s?</div>
        <div className="fact">💡 <b>The more you order, the cheaper each one gets!</b> Machines cost the same to run for 10 or 10,000 — that's called a <b>bulk discount</b>!</div>
        <Sel list={QTY_OPTS} val={qty} set={setQty}/>
      </div>
      <div className="card">
        <div className="card-title">🌍 Where should the factory be?</div>
        <div className="fact">💡 Workers in different countries earn different wages — that's the main reason most toys are made overseas!</div>
        <WorldSVGMap factory={factory}/>
        <div className="ogrid3" style={{marginTop:10}}>
          {FACTORY_OPTS.map(o=>(
            <button key={o.id} className={`obtn${factory?.id===o.id?" on":""}`} onClick={()=>{setFactory(o);if(ship?.usaOnly&&o.id==="China")setShip(null);}}>
              <span className="oe">{o.flag}</span>{o.id}
              <span style={{display:"block",fontSize:".7rem",color:factory?.id===o.id?"rgba(255,255,255,.5)":"var(--mid)",marginTop:2}}>{o.desc}</span>
              <span className="oc">${o.labor.toFixed(2)}/doll labor</span>
            </button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title">🚚 How do you ship the dolls?</div>
        <div className="fact">💡 A cargo ship takes weeks but costs almost nothing extra per doll. A plane is fast but nearly 8× more expensive!</div>
        <ShippingTimeDisplay factory={factory} ship={ship}/>
        <Sel list={shipOpts} val={ship} set={setShip} three/>
      </div>
      <div className="card">
        <div className="card-title">📦 What kind of box?</div>
        <div className="fact">💡 A great box makes kids want to grab it off the shelf — stores call this <b>shelf appeal</b>!</div>
        <Sel list={BOX_OPTS} val={box} set={setBox} three/>
      </div>
      {qty&&factory&&ship&&box&&(
        <div className="card" style={{background:"var(--navy)",border:"none"}}>
          <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".88rem",color:"rgba(255,255,255,.6)",marginBottom:6,letterSpacing:"2px"}}>YOUR PLAN</div>
          <p style={{fontSize:".95rem",lineHeight:1.7,color:"rgba(255,255,255,.85)"}}>
            <b style={{color:"var(--gold)"}}>{qty.id} {doll.name}s</b> · built in <b style={{color:"#8EA3FF"}}>{factory.id}</b> · shipped by <b style={{color:"#6EE7B7"}}>{ship.id}</b> {ship.emoji} · in a <b style={{color:"var(--gold)"}}>{box.id}</b>
          </p>
          <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.5rem",color:"var(--gold)",marginTop:8}}>${perDoll.toFixed(2)} per doll</div>
        </div>
      )}
      <button className="gbtn" disabled={!(qty&&factory&&ship&&box)} onClick={()=>onDone({qty,factory,ship,box,perDoll})}>
        Start the Journey →
      </button>
    </div>
  );
}

/* ════════════════════
   PHASE 3 — JOURNEY
   ════════════════════ */
function getChapters(biz,doll){
  if(!biz||!doll) return [];
  const {ship,factory,qty,box}=biz, p=PR[doll.gender||"female"];
  const isAir=ship?.id==="Air Freight", isTruck=ship?.id==="Truck";
  const shipTime=factory?.id&&ship?.id?SHIP_TIMES[factory.id]?.[ship.id]:"a few days";
  return[
    {key:"materials",title:"Gathering Materials",emoji:"🌍",fact:`Toy materials come from all over the world! Plastic from oil refineries, fabric from cotton farms, paints from chemical factories. Even the parts for <b>${box?.id||"the box"}</b> ship in first!`,cta:"🚛 Deliver the Materials!",scene:"materials"},
    {key:"factory",title:"Building on the Factory Floor",emoji:"⚙️",fact:`Workers in <b>${factory?.id||"the factory"}</b> put everything together. Machines mold the plastic body, people sew the outfit, and a team inspects every step. Before factories, every toy was made by hand — one at a time!`,cta:"🔩 Start Building!",scene:"factory"},
    {key:"quality",title:"Safety Check Time!",emoji:"✅",fact:`Every doll must pass safety tests before leaving the factory — inspectors check for sharp edges, toxic paint, and secure hair. A doll that fails gets thrown away: wasted money!`,cta:"STAMP",scene:"quality"},
    {key:"packaging",title:"Box It Up!",emoji:"📦",fact:`${box?.id==="Window Box"?`A window lets kids see ${doll.name} inside — huge for sales!`:box?.id==="Holo Box"?"That shiny foil catches light from across the store!":"Even a plain box has to stand out on a crowded shelf."} The box is a full design project all on its own.`,cta:`${box?.emoji||"📦"} Pack ${p.capObj} Up!`,scene:"packaging"},
    isAir?{key:"shipping",title:"Wheels Up! ✈️",emoji:"✈️",fact:`The ${qty?.id||""} ${doll.name}s board a cargo plane! Air freight reaches the USA in just <b>${shipTime}</b> from <b>${factory?.id}</b> — but costs 8× more than a ship, and airlines charge by weight.`,cta:"✈️ Cleared for Takeoff!",scene:"air",shipTime}
    :isTruck?{key:"shipping",title:"Hit the Road! 🚛",emoji:"🚛",fact:`Since the factory is in <b>${factory?.id}</b>, trucks drive ${doll.name} straight to a US warehouse — no ocean crossing needed! About <b>${shipTime}</b> door to door.`,cta:"🚛 Let's Roll!",scene:"truck",shipTime}
    :{key:"shipping",title:"Bon Voyage! 🚢",emoji:"🌊",fact:`The ${qty?.id||""} ${doll.name}s are sealed in a shipping container and loaded onto a cargo ship! One ship holds 20,000 containers — that's why ocean freight is so cheap per doll. But it takes about <b>${shipTime}</b>.`,cta:"⛵ Set Sail!",scene:"ship",shipTime},
    {key:"store",title:"Hit the Shelves!",emoji:"🏪",fact:`After arriving in the USA the dolls go to a warehouse, then trucks again, then finally the store shelf. Every stop costs money and time — getting a toy from factory to a kid's hands is seriously complicated!`,cta:"🛒 Stock the Shelves!",scene:"store"},
  ];
}

function ChapterScene({ch,doll,biz,stamped}){
  const cfg={name:doll.name,hair:doll.hair?.id||"",eyes:doll.eyes?.id||"",outfit:doll.outfit?.id||"",body:doll.body?.id||""};
  const g=doll.gender||"female";
  if(ch.scene==="materials") return(
    <div>
      <div style={{fontSize:"2.2rem",marginBottom:8}}>🛢️ 🌾 🎨</div>
      <p style={{fontWeight:700,color:"var(--navy)",margin:"0 0 10px"}}>Materials arrive from around the world!</p>
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
        {["🧱 Plastic","💛 Hair fiber","🎨 Dye & paint","🪡 Fabric"].map(t=>(
          <span key={t} style={{background:"var(--white)",border:"1.5px solid var(--navy)",borderRadius:3,padding:"4px 10px",fontSize:".78rem",fontWeight:700,color:"var(--navy)"}}>{t}</span>
        ))}
      </div>
    </div>
  );
  if(ch.scene==="factory") return(
    <div>
      <div style={{fontSize:"2rem",marginBottom:10}}>⚙️ 🔩 🪛</div>
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
        {[["Mold plastic","🧱"],["Sew outfit","🧵"],["Assemble","🔧"],["Attach hair","💇"]].map(([s,e])=>(
          <div key={s} style={{background:"var(--white)",border:"1.5px solid var(--navy)",borderRadius:3,padding:"7px 10px",fontWeight:700,fontSize:".78rem",color:"var(--navy)"}}>{e} {s}</div>
        ))}
      </div>
    </div>
  );
  if(ch.scene==="quality") return(
    <div style={{width:"100%"}}>
      <p style={{fontWeight:700,color:"var(--navy)",margin:"0 0 10px"}}>Does {doll.name} pass the test?</p>
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
        {["No sharp edges","Safe paint","Right size","Strong hair","Tight seams"].map(t=>(
          <div key={t} style={{background:stamped?"var(--navy)":"var(--white)",border:`1.5px solid ${stamped?"var(--navy)":"var(--border)"}`,borderRadius:3,padding:"5px 9px",fontWeight:700,fontSize:".77rem",color:stamped?"var(--white)":"var(--mid)",transition:"all .3s"}}>
            {stamped?"✅":"⬜"} {t}
          </div>
        ))}
      </div>
    </div>
  );
  if(ch.scene==="packaging") return(
    <div>
      <div style={{display:"flex",gap:16,justifyContent:"center",alignItems:"center"}}>
        <DollSVG cfg={cfg} gender={g} size={60}/>
        <div style={{fontSize:"1.8rem",color:"var(--navy)",fontWeight:700}}>→</div>
        <div style={{fontSize:"3rem"}}>{biz.box?.emoji}</div>
      </div>
      <p style={{fontWeight:700,color:"var(--navy)",margin:"10px 0 0"}}>{doll.name} goes into the <b>{biz.box?.id}</b>!</p>
    </div>
  );
  if(ch.scene==="ship") return(
    <div>
      <div className="rockship" style={{fontSize:"3rem"}}>🚢</div>
      <p style={{fontWeight:700,margin:"8px 0 4px",color:"var(--navy)"}}>{biz.factory?.id} → 🇺🇸 USA</p>
      <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.1rem",color:"var(--navy)"}}>⏱ About {ch.shipTime}</div>
      <p style={{color:"var(--mid)",fontSize:".8rem",margin:"4px 0 0"}}>{biz.qty?.id} {doll.name}s on board</p>
    </div>
  );
  if(ch.scene==="air") return(
    <div>
      <div className="flyplane" style={{fontSize:"3rem"}}>✈️</div>
      <p style={{fontWeight:700,margin:"8px 0 4px",color:"var(--navy)"}}>{biz.factory?.id} → 🇺🇸 USA</p>
      <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.1rem",color:"var(--coral)"}}>⚡ Just {ch.shipTime}!</div>
      <p style={{color:"var(--mid)",fontSize:".8rem",margin:"4px 0 0"}}>{biz.qty?.id} {doll.name}s in the hold</p>
    </div>
  );
  if(ch.scene==="truck") return(
    <div>
      <div className="drivetruck" style={{fontSize:"3rem"}}>🚛</div>
      <p style={{fontWeight:700,margin:"8px 0 4px",color:"var(--navy)"}}>{biz.factory?.id} → 🇺🇸 USA</p>
      <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.1rem",color:"#F59E0B"}}>🛣 About {ch.shipTime}</div>
      <p style={{color:"var(--mid)",fontSize:".8rem",margin:"4px 0 0"}}>{biz.qty?.id} {doll.name}s on board</p>
    </div>
  );
  if(ch.scene==="store") return(
    <div>
      <div style={{fontSize:"1.8rem",marginBottom:8}}>🚛 → 🏬 → 🛒</div>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
        {[1,2,3].map(i=>(
          <div key={i} style={{background:"var(--white)",border:"1.5px solid var(--navy)",borderRadius:3,padding:5}}>
            <DollSVG cfg={cfg} gender={g} size={46}/>
          </div>
        ))}
      </div>
      <p style={{fontWeight:700,color:"var(--navy)",margin:"10px 0 0"}}>{doll.name} is on the shelf! 🎉</p>
    </div>
  );
  return null;
}

function Phase3({doll,biz,onDone}){
  const [idx,setIdx]=useState(0);
  const [done,setDone]=useState(false);
  const [stamp,setStamp]=useState(false);
  const chapters=getChapters(biz,doll);
  const ch=chapters[idx];
  const isLast=idx===chapters.length-1;
  const next=()=>{setDone(false);setStamp(false);if(isLast)onDone();else setIdx(i=>i+1);};
  if(!ch) return null;
  return(
    <div className="slide">
      <div style={{textAlign:"center",marginBottom:6}}><span className="step-pill">🗺️ Step 3 of 4</span></div>
      <h1 className="big-title">{doll.name}'s Journey</h1>
      <div className="dots">{chapters.map((c,i)=><div key={c.key} className={`dot${i<idx?" done":i===idx?" active":""}`}/>)}</div>
      <div className="card slide" key={ch.key}>
        <div className="card-title">{ch.emoji} {ch.title}</div>
        <div className="scene"><ChapterScene ch={ch} doll={doll} biz={biz} stamped={stamp}/></div>
        <div className="fact" dangerouslySetInnerHTML={{__html:"💡 "+ch.fact}}/>
        <div style={{marginTop:14,display:"flex",justifyContent:"center"}}>
          {ch.cta==="STAMP"
            ?<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
               <button className={`stamp${stamp?" done":""}`} onClick={()=>{setStamp(true);setDone(true);}}>
                 {stamp?"✅":"🔍"}
               </button>
               <span style={{fontFamily:"'Black Han Sans',cursive",fontSize:".85rem",color:stamp?"var(--navy)":"var(--mid)"}}>{stamp?"APPROVED!":"Tap to inspect"}</span>
             </div>
            :<button className="gbtn" style={{margin:0,background:done?"var(--navy)":"var(--coral)"}} onClick={()=>setDone(true)}>
               {done?"Done! ✅":ch.cta}
             </button>
          }
        </div>
      </div>
      <button className="gbtn" disabled={!done} onClick={next} style={{background:"var(--navy)"}}>
        {isLast?"See the Sales Report →":`Next: ${chapters[idx+1].title} ${chapters[idx+1].emoji}`}
      </button>
    </div>
  );
}

/* ════════════════════
   PHASE 4 — SALES
   ════════════════════ */
function Phase4({doll,biz,onRestart}){
  const [conf,setConf]=useState(true);
  useEffect(()=>{const t=setTimeout(()=>setConf(false),3400);return()=>clearTimeout(t);},[]);
  const p=PR[doll.gender||"female"];
  const qty=biz.qty.qty;
  const mfgCost=+((doll.baseCost*biz.qty.mult)+biz.factory.labor+biz.ship.cost+biz.box.cost).toFixed(2);
  const wholesale=+(mfgCost*2.0).toFixed(2);
  const retail=+(wholesale*2.0).toFixed(2);
  const defectPct=biz.factory.defectRate+(BODY_DEFECT[doll.body?.id]||0);
  const defects=Math.max(1,Math.round(qty*defectPct));
  const sellable=qty-defects;
  const defectLoss=+(defects*mfgCost).toFixed(2);
  const revenue=+(sellable*wholesale).toFixed(2);
  const totalMfg=+(qty*mfgCost).toFixed(2);
  const mktPct=.22;
  const marketing=+(revenue*mktPct).toFixed(2);
  const netProfit=+(revenue-totalMfg-marketing).toFixed(2);
  const isProfit=netProfit>=0;
  const breakEven=Math.ceil(totalMfg/(wholesale*(1-mktPct)));
  const prodW=biz.qty.prodWeeks;
  const shipW=SHIP_WEEKS[biz.factory.id]?.[biz.ship.id]||1;
  const totalW=prodW+shipW;
  const fw=w=>w<1?`${Math.round(w*7)} day${Math.round(w*7)!==1?"s":""}`:w<2?`${Math.round(w*10)/10} wk`:`${Math.round(w*10)/10} wks`;
  const cfg={name:doll.name,hair:doll.hair?.id||"",eyes:doll.eyes?.id||"",outfit:doll.outfit?.id||"",body:doll.body?.id||""};
  const maxI=Math.min(qty,20), scale=qty/maxI;
  const dIco=Math.max(1,Math.round(defects/scale)), gIco=maxI-dIco;

  const matSlice=(doll.baseCost*biz.qty.mult)/retail;
  const labSlice=biz.factory.labor/retail;
  const shpSlice=biz.ship.cost/retail;
  const pkgSlice=biz.box.cost/retail;
  const mktSlice=(mktPct*wholesale)/retail;
  const storeSlice=0.50;
  const profSlice=Math.max(0,1-matSlice-labSlice-shpSlice-pkgSlice-mktSlice-storeSlice);
  const slices=[
    {l:"Materials",  v:matSlice,  c:"#1A2690"},
    {l:"Labor",      v:labSlice,  c:"#E8354A"},
    {l:"Shipping",   v:shpSlice,  c:"#00C9A7"},
    {l:"Packaging",  v:pkgSlice,  c:"#FFD34E"},
    {l:"Advertising",v:mktSlice,  c:"#F59E0B"},
    {l:"Store's cut",v:storeSlice,c:"#9BA8D8"},
    {l:"Your profit",v:profSlice, c:"#22C55E"},
  ];

  return(
    <div className="slide">
      <Confetti on={conf}/>
      <div style={{textAlign:"center",marginBottom:6}}><span className="step-pill">💰 Step 4 of 4</span></div>
      <h1 className="big-title">The Sales Report</h1>
      <p className="sub">The real story behind making money from a toy</p>

      {/* DOLL + PRICE BADGES */}
      <div style={{display:"flex",justifyContent:"center",margin:"10px auto 4px",position:"relative",width:"fit-content"}}>
        <DollPreview cfg={cfg} gender={doll.gender||"female"} size={148}/>
        <div style={{position:"absolute",top:-6,right:-20,background:"var(--coral)",color:"#fff",borderRadius:3,width:56,height:56,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Black Han Sans',cursive",fontSize:".8rem",border:"2.5px solid var(--coral-dk)",boxShadow:"3px 3px 0 var(--coral-dk)",textAlign:"center",lineHeight:1.1}}>
          ${retail}<br/><span style={{fontSize:".6rem",opacity:.8}}>in store</span>
        </div>
        <div style={{position:"absolute",bottom:-4,left:-20,background:"var(--navy)",color:"#fff",borderRadius:3,width:52,height:52,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Black Han Sans',cursive",fontSize:".75rem",border:"2.5px solid var(--navy-dk)",boxShadow:"3px 3px 0 var(--navy-dk)",textAlign:"center",lineHeight:1.1}}>
          ${wholesale}<br/><span style={{fontSize:".58rem",opacity:.8}}>you get</span>
        </div>
      </div>

      {/* HOW IS PRICE SET */}
      <div className="card">
        <div className="card-title">💵 How is the price set?</div>
        <div className="fact">
          💡 {doll.name} costs <b>${mfgCost.toFixed(2)}</b> to make. You sell {p.obj} to the store for <b>${wholesale.toFixed(2)}</b> — that's the <b>wholesale price</b>. The store puts {p.obj} on the shelf for <b>${retail.toFixed(2)}</b> and keeps the difference to cover their own costs!
        </div>
      </div>

      {/* TIMELINE */}
      <div className="card" style={{border:"1.5px solid var(--navy)"}}>
        <div className="card-title">⏱ How long does everything take?</div>
        <div style={{display:"flex",alignItems:"center",overflow:"auto",paddingBottom:4}}>
          {[{label:"Design",t:"1–2 wks",emoji:"✏️",c:"var(--coral)"},{label:"Build",t:fw(prodW),emoji:"⚙️",c:"var(--navy)"},{label:biz.ship.id,t:SHIP_TIMES[biz.factory.id]?.[biz.ship.id]||"?",emoji:biz.ship.emoji,c:"#00C9A7"},{label:"On Shelves",t:"Done!",emoji:"🏪",c:"#22C55E"}].map((s,i,arr)=>(
            <div key={s.label} style={{display:"flex",alignItems:"center",flex:i<arr.length-1?"1 1 0":"0 0 auto"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:64,padding:"0 2px"}}>
                <div style={{fontSize:"1.3rem",marginBottom:3}}>{s.emoji}</div>
                <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".75rem",color:s.c,textAlign:"center",lineHeight:1.1}}>{s.label}</div>
                <div style={{fontSize:".65rem",color:"var(--mid)",marginTop:2}}>{s.t}</div>
              </div>
              {i<arr.length-1&&<div style={{flex:1,height:2,background:`linear-gradient(90deg,${s.c},${arr[i+1].c})`,minWidth:8,margin:"0 2px",borderRadius:1,marginTop:-12}}/>}
            </div>
          ))}
        </div>
        <div style={{background:"var(--navy)",color:"var(--white)",borderRadius:3,padding:"10px 14px",textAlign:"center",marginTop:10}}>
          <span style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.05rem"}}>
            🗓 Build + {biz.ship.id} = {fw(totalW)} just to reach the store
          </span>
        </div>
        <div className="fact" style={{marginTop:10}}>💡 That's why toy companies start planning <b>holiday toys in January</b> — by the time you build, ship, and stock the shelves, it's already December!</div>
      </div>

      {/* DOLLAR BREAKDOWN */}
      <div className="card">
        <div className="card-title">🍕 Where does every dollar go?</div>
        <div className="fact" style={{marginBottom:12}}>
          💡 Every time someone pays <b>${retail.toFixed(2)}</b> for {doll.name}, that money gets split below. The store keeps <b>50%</b> right away. The rest comes to you — but you still have to cover materials, labor, shipping, packaging, and ads first!
        </div>
        <div className="barwrap">{slices.map(s=><div key={s.l} style={{background:s.c,flex:Math.max(s.v,0.001)}}/>)}</div>
        <div style={{display:"flex",flexDirection:"column",gap:7,marginTop:12}}>
          {slices.map(s=>(
            <div key={s.l} style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:10,height:10,borderRadius:2,background:s.c,flexShrink:0}}/>
              <span style={{flex:1,fontSize:".88rem",fontWeight:600}}>{s.l}</span>
              <span style={{fontFamily:"'Black Han Sans',cursive",fontSize:".95rem",color:s.c}}>${(s.v*retail).toFixed(2)}/doll</span>
              <span style={{color:"var(--mid)",fontSize:".74rem"}}>({Math.round(s.v*100)}%)</span>
            </div>
          ))}
          <div style={{borderTop:"1.5px solid var(--border)",marginTop:3,paddingTop:6,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:10,height:10,borderRadius:2,background:"var(--border)",flexShrink:0}}/>
            <span style={{flex:1,fontSize:".82rem",color:"var(--mid)"}}>Total retail price</span>
            <span style={{fontFamily:"'Black Han Sans',cursive",fontSize:".95rem",color:"var(--mid)"}}>${retail.toFixed(2)}/doll</span>
            <span style={{color:"var(--mid)",fontSize:".74rem"}}>(100%)</span>
          </div>
        </div>
      </div>

      {/* DEFECTS */}
      <div className="card" style={{border:"1.5px solid var(--coral)"}}>
        <div className="card-title" style={{color:"var(--coral)"}}>⚠️ Watch Out for Broken Dolls!</div>
        <div className="fact" style={{borderLeftColor:"var(--coral)"}}>
          💡 The factory in <b>{biz.factory.id}</b> makes about <b>{Math.round(biz.factory.defectRate*100)}%</b> defective dolls.
          {(BODY_DEFECT[doll.body?.id]||0)>0&&<> <b>{doll.body?.id}</b> adds <b>{Math.round((BODY_DEFECT[doll.body?.id]||0)*100)}%</b> more risk.</>}
          {" "}Broken ones can't be sold — that's money gone!
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:3,margin:"12px 0",justifyContent:"center"}}>
          {Array.from({length:gIco}).map((_,i)=><span key={`g${i}`} style={{fontSize:"1.1rem"}}>🪆</span>)}
          {Array.from({length:dIco}).map((_,i)=><span key={`d${i}`} style={{fontSize:"1.1rem",filter:"grayscale(1) opacity(.3)"}}>🪆</span>)}
        </div>
        {qty>maxI&&<div style={{textAlign:"center",fontSize:".7rem",color:"var(--mid)",marginBottom:8}}>Each 🪆 ≈ {Math.round(scale)} dolls</div>}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {[{l:"✅ Good dolls",v:sellable.toLocaleString(),c:"#22C55E"},{l:"❌ Broken",v:defects.toLocaleString(),c:"var(--coral)"},{l:"💸 Wasted",v:"$"+defectLoss.toLocaleString(),c:"#EF4444"}].map(n=>(
            <div key={n.l} style={{background:"var(--cream)",border:`2px solid ${n.c}`,borderRadius:3,padding:"9px 14px",textAlign:"center",boxShadow:`3px 3px 0 ${n.c}33`}}>
              <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.45rem",color:n.c}}>{n.v}</div>
              <div style={{fontSize:".73rem",color:"var(--mid)"}}>{n.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* P&L */}
      <div className="card" style={{border:`2px solid ${isProfit?"#22C55E":"var(--coral)"}`}}>
        <div className="card-title" style={{color:isProfit?"#22C55E":"var(--coral)"}}>
          {isProfit?"📈 Did You Make Money?":"📉 Uh Oh — You Lost Money!"}
        </div>
        {/* Vertical equation */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
          {[
            {label:"Revenue",sub:`${sellable.toLocaleString()} good dolls × $${wholesale}`,v:revenue,c:"#22C55E",op:null},
            {label:"− Building cost",sub:`all ${qty.toLocaleString()} dolls × $${mfgCost.toFixed(2)}`,v:totalMfg,c:"var(--coral)",op:"minus"},
            {label:"− Ads & marketing",sub:"22% of revenue",v:marketing,c:"#F59E0B",op:"minus"},
          ].map((row,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,background:"var(--cream)",borderRadius:3,padding:"10px 14px",border:"1.5px solid var(--border)"}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".82rem",color:row.c}}>{row.label}</div>
                <div style={{fontSize:".7rem",color:"var(--mid)",marginTop:1}}>{row.sub}</div>
              </div>
              <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.35rem",color:row.c}}>${row.v.toLocaleString()}</div>
            </div>
          ))}
          <div style={{borderTop:"2px solid var(--border)",margin:"2px 0"}}/>
          <div style={{textAlign:"center",background:isProfit?"#F0FDF4":"#FFF1F2",border:`2px solid ${isProfit?"#22C55E":"var(--coral)"}`,borderRadius:3,padding:"14px 16px",boxShadow:`4px 4px 0 ${isProfit?"#16A34A44":"var(--coral-dk)44"}`}}>
            <div style={{fontSize:".75rem",color:"var(--mid)",marginBottom:2}}>= Your {isProfit?"profit":"loss"}</div>
            <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:"2.4rem",color:isProfit?"#16A34A":"var(--coral)"}}>
              {isProfit?"+":"-"}${Math.abs(netProfit).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Break-even bar */}
        <div style={{display:"flex",justifyContent:"space-between",fontSize:".76rem",color:"var(--mid)",marginBottom:5}}>
          <span>0 sold</span>
          <span style={{color:"var(--navy)",fontWeight:700}}>Break-even: {breakEven.toLocaleString()} dolls</span>
          <span>{sellable.toLocaleString()} sold</span>
        </div>
        <div style={{height:18,background:"var(--cream)",borderRadius:3,border:"1.5px solid var(--border)",overflow:"hidden",position:"relative"}}>
          <div style={{position:"absolute",top:0,bottom:0,left:`${Math.min(99,(breakEven/Math.max(sellable,1))*100)}%`,width:2.5,background:"var(--navy)",zIndex:2}}/>
          <div style={{height:"100%",width:"100%",background:"linear-gradient(90deg,var(--coral),#22C55E)",borderRadius:2}}/>
        </div>
        <div className="fact" style={{marginTop:10}}>
          💡 Sell <b style={{color:"var(--navy)"}}>{breakEven.toLocaleString()} {doll.name}s</b> just to break even. Every doll after that is actual profit!
          {breakEven>sellable&&<span style={{color:"var(--coral)"}}> But you only have <b>{sellable.toLocaleString()}</b> good dolls — this batch loses money. Try a bigger order or a factory with fewer defects!</span>}
        </div>
        <div style={{marginTop:12,background:"var(--cream)",border:"1.5px solid var(--border)",borderRadius:3,padding:"10px 14px",fontSize:".82rem",color:"var(--mid)",lineHeight:1.6}}>
          <span style={{color:"var(--coral)",fontWeight:700}}>⚠️ More costs in real life: </span>
          Real companies also pay for <b style={{color:"var(--black)"}}>warehouse rent, employees, returns, and taxes</b>. It can take years to make a profit!
        </div>
      </div>

      <div className="fact" style={{textAlign:"center",borderLeft:"none",borderTop:"3px solid var(--navy)",borderRadius:3,background:"var(--navy-pale)"}}>
        🌟 You now know what real toy company bosses think about every single day. Making a cool doll is just the start — the challenge is selling it!
      </div>
      <button className="gbtn" style={{background:"var(--navy)"}} onClick={onRestart}>← Design Another Doll</button>
    </div>
  );
}

/* ════════════════════
   HOME SCREEN
   Korean poster style
   ════════════════════ */
function HomeScreen({onStart}){
  const steps=[{emoji:"✏️",label:"DESIGN",color:"var(--coral)"},{emoji:"🏭",label:"FACTORY",color:"var(--navy)"},{emoji:"🚢",label:"SHIP",color:"#00C9A7"},{emoji:"💰",label:"SALES",color:"#22C55E"}];
  const previewCfg={name:"",hair:"Twin Tails",eyes:"Sparkle",outfit:"Stage Glam",body:"Soft Vinyl"};
  return(
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {/* HERO - coral poster block */}
      <div style={{background:"var(--coral)",padding:"48px 20px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        {/* Geometric background elements */}
        <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,background:"rgba(255,255,255,.06)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",bottom:-60,left:-30,width:160,height:160,background:"rgba(0,0,0,.06)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",top:20,left:20,width:60,height:60,background:"var(--navy)",opacity:.15}}/>
        {/* Title */}
        <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".72rem",letterSpacing:"5px",color:"rgba(255,255,255,.7)",marginBottom:8}}>DELLA'S</div>
        <h1 style={{fontFamily:"'Black Han Sans',cursive",fontSize:"3.4rem",color:"var(--white)",lineHeight:.95,margin:"0 0 4px",textShadow:"3px 3px 0 var(--coral-dk)"}}>DOLL<br/>FACTORY</h1>
        <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".72rem",letterSpacing:"4px",color:"rgba(255,255,255,.7)",marginBottom:28}}>EDUCATIONAL · INTERACTIVE</div>
        {/* Hero doll */}
        <div style={{display:"inline-flex",gap:12,marginBottom:28}}>
          {[{hair:"Twin Tails",eyes:"Sparkle",outfit:"Stage Glam"},{hair:"Undercut",eyes:"Sharp",outfit:"Stage King"},{hair:"Rainbow Bob",eyes:"Hologram",outfit:"Dark Angel"}].map((c,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.12)",borderRadius:4,padding:"8px 6px",border:"1.5px solid rgba(255,255,255,.25)"}}>
              <DollSVG cfg={{name:"",hair:c.hair,eyes:c.eyes,outfit:c.outfit,body:"Plastic"}} gender={i===1?"male":"female"} size={72}/>
            </div>
          ))}
        </div>
        <br/>
        <button className="gbtn" style={{margin:"0 auto",background:"var(--white)",color:"var(--coral)",boxShadow:"4px 4px 0 var(--coral-dk)",fontSize:"1.25rem",display:"inline-block"}} onClick={onStart}>
          LET'S BUILD! →
        </button>
        <p style={{color:"rgba(255,255,255,.6)",fontSize:".75rem",marginTop:12,letterSpacing:"1px"}}>ABOUT 10 MINUTES · NO WRONG ANSWERS</p>
      </div>

      {/* STEPS - navy bar */}
      <div style={{background:"var(--navy)",padding:"20px 16px"}}>
        <div style={{maxWidth:480,margin:"0 auto",display:"flex",gap:0}}>
          {steps.map((s,i)=>(
            <div key={s.label} style={{flex:1,display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1}}>
                <div style={{width:42,height:42,borderRadius:3,background:"rgba(255,255,255,.08)",border:"1.5px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",marginBottom:5}}>{s.emoji}</div>
                <div style={{fontFamily:"'Black Han Sans',cursive",fontSize:".68rem",color:"rgba(255,255,255,.7)",letterSpacing:"1.5px"}}>{s.label}</div>
              </div>
              {i<steps.length-1&&<div style={{width:12,height:1.5,background:"rgba(255,255,255,.2)",flexShrink:0,marginBottom:18}}/>}
            </div>
          ))}
        </div>
      </div>

      {/* TAGLINE */}
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 20px",textAlign:"center"}}>
        <div>
          <p style={{fontFamily:"'Black Han Sans',cursive",fontSize:"1.2rem",color:"var(--navy)",marginBottom:8}}>Design. Build. Ship. Sell.</p>
          <p style={{color:"var(--mid)",maxWidth:320,margin:"0 auto",lineHeight:1.6,fontSize:".9rem"}}>Learn how real toy companies decide what to make, where to build it, and how to make a profit — all in one fun simulation!</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════
   ROOT
   ════════════════════ */
export default function App(){
  const [phase,setPhase]=useState(0);
  const [doll,setDoll]=useState(null);
  const [biz,setBiz]=useState(null);
  const [cost,setCost]=useState(0);
  const goPhase=(n)=>{ window.scrollTo({top:0,behavior:"smooth"}); setPhase(n); };
  const restart=()=>{ setDoll(null); setBiz(null); setCost(0); goPhase(0); };
  return(
    <>
      <style>{FONTS}{css}</style>
      <div className="app">
        {phase>0&&<CostBadge cost={cost}/>}
        {phase===0&&<HomeScreen onStart={()=>goPhase(1)}/>}
        {phase===1&&<div className="wrap"><Phase1 onCostChange={setCost} onDone={d=>{setDoll(d);setCost(d.baseCost);goPhase(2);}}/></div>}
        {phase===2&&doll&&<div className="wrap"><Phase2 doll={doll} onCostChange={setCost} onDone={b=>{setBiz(b);setCost(b.perDoll);goPhase(3);}}/></div>}
        {phase===3&&doll&&biz&&<div className="wrap"><Phase3 doll={doll} biz={biz} onDone={()=>{const t=(doll.baseCost*biz.qty.mult)+biz.factory.labor+biz.ship.cost+biz.box.cost;setCost(+(t*2.0*2.0).toFixed(2));goPhase(4);}}/></div>}
        {phase===4&&doll&&biz&&<div className="wrap"><Phase4 doll={doll} biz={biz} onRestart={restart}/></div>}
      </div>
    </>
  );
}
