export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans:wght@400;600;700&display=swap');`;

export const css = `
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html, body { background:#FFF7F0; }

  :root {
    --coral:#E8354A; --coral-dk:#B8192E; --coral-pale:#FFF0F2;
    --navy:#1A2690;  --navy-dk:#0D1760;  --navy-pale:#EEF0FF;
    --cream:#FFF7F0; --white:#FFFFFF;    --black:#0A0A1A;
    --mid:#6B7280;   --border:#E2E4EF;  --gold:#FFD34E;
    --pink:#FFB5C8;  --mint:#A8E6CF;    --lavender:#C3B1E1;
    --peach:#FFDAB9;
    --sh: 0 3px 20px rgba(26,38,144,.08), 0 1px 4px rgba(26,38,144,.05);
    --radius: 12px;
  }

  .app {
    font-family:'Noto Sans',sans-serif; min-height:100vh;
    background: linear-gradient(180deg, #FFF7F0 0%, #FFE8F0 50%, #FFF0E8 100%);
    color:var(--black);
  }

  /* COST BADGE */
  .cost-badge {
    position:fixed; bottom:20px; right:16px;
    background:var(--navy); color:var(--white);
    padding:10px 20px; font-family:'Black Han Sans',cursive; font-size:1rem;
    border-radius:var(--radius); border:2px solid var(--navy-dk);
    box-shadow:4px 4px 0 var(--navy-dk);
    z-index:200; display:flex; align-items:center; gap:7px;
  }
  .cost-badge.pop { animation:badgePop .3s ease; }
  @keyframes badgePop{0%,100%{transform:scale(1) rotate(0)}40%{transform:scale(1.14) rotate(-2deg)}}

  /* MUTE TOGGLE */
  .mute-btn {
    position:fixed; bottom:20px; left:16px;
    background:var(--white); border:2px solid var(--border);
    border-radius:50%; width:44px; height:44px;
    display:flex; align-items:center; justify-content:center;
    font-size:1.2rem; cursor:pointer; z-index:200;
    box-shadow:var(--sh); transition:all .15s;
  }
  .mute-btn:hover { transform:scale(1.1); }

  .wrap { max-width:760px; margin:0 auto; padding:24px 16px 120px; }

  /* PAGE HEADERS */
  .step-pill {
    display:inline-flex; align-items:center; gap:6px;
    background:var(--coral); color:var(--white);
    padding:5px 16px; font-family:'Black Han Sans',cursive;
    font-size:.72rem; letter-spacing:3px; text-transform:uppercase;
    border-radius:20px;
    margin-bottom:8px;
  }
  .big-title {
    font-family:'Black Han Sans',cursive; font-size:2.6rem; line-height:1.0;
    color:var(--navy); margin-bottom:4px; text-align:center;
  }
  .sub { text-align:center; font-size:.93rem; color:var(--mid); margin-bottom:20px; }

  /* CARDS */
  .card {
    background:linear-gradient(135deg, #FFFFFF 0%, #FFF8FA 100%);
    border:1.5px solid var(--border);
    border-radius:16px; padding:18px; margin:12px 0;
    box-shadow:var(--sh);
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
    background:var(--white); border:2px solid var(--border); border-radius:var(--radius);
    padding:12px 8px; cursor:pointer; font-family:'Noto Sans',sans-serif;
    font-size:.8rem; text-align:center; color:var(--mid); transition:all .15s; line-height:1.3;
  }
  .obtn:hover { border-color:var(--coral); color:var(--black); background:var(--coral-pale); transform:translateY(-2px); }
  .obtn.on {
    background:var(--navy); border-color:var(--navy-dk); color:var(--white);
    box-shadow:3px 3px 0 var(--navy-dk);
    animation: btnBounce .3s ease;
  }
  @keyframes btnBounce { 0%{transform:scale(1)} 40%{transform:scale(1.08)} 100%{transform:scale(1)} }
  .oe { font-size:1.55rem; display:block; margin-bottom:3px; }
  .oc { font-size:.72rem; display:block; margin-top:3px; color:#9CA3AF; }
  .obtn.on .oc { color:rgba(255,255,255,.55); }

  /* INPUT */
  .ninput {
    width:100%; background:var(--white); border:2px solid var(--border);
    border-radius:var(--radius); padding:11px 14px;
    font-family:'Black Han Sans',cursive; font-size:1.5rem;
    color:var(--navy); outline:none;
  }
  .ninput:focus { border-color:var(--coral); }
  .ninput::placeholder { color:#D1D5DB; }

  /* CTA BUTTON */
  .gbtn {
    display:block; margin:20px auto 0;
    background:var(--coral); color:var(--white); border:none;
    border-radius:var(--radius); padding:14px 42px;
    font-family:'Black Han Sans',cursive; font-size:1.2rem;
    letter-spacing:1px; cursor:pointer;
    box-shadow:4px 4px 0 var(--coral-dk); transition:all .12s;
  }
  .gbtn:hover { transform:translate(-2px,-2px); box-shadow:6px 6px 0 var(--coral-dk); }
  .gbtn:active { transform:translate(1px,1px); box-shadow:2px 2px 0 var(--coral-dk); }
  .gbtn:disabled { background:#D1D5DB; box-shadow:3px 3px 0 #9CA3AF; cursor:not-allowed; transform:none; }
  .gbtn.pulse {
    animation: btnPulse 1.5s ease-in-out infinite;
  }
  @keyframes btnPulse {
    0%,100% { box-shadow:4px 4px 0 var(--coral-dk), 0 0 0 0 rgba(232,53,74,.3); }
    50% { box-shadow:4px 4px 0 var(--coral-dk), 0 0 0 12px rgba(232,53,74,0); }
  }

  /* FACT / INFO BOX */
  .fact {
    background:linear-gradient(135deg, var(--cream) 0%, #FFF0F8 100%);
    border-left:4px solid var(--navy);
    border-radius:0 var(--radius) var(--radius) 0; padding:12px 16px;
    font-size:.84rem; color:#374151; margin:10px 0; line-height:1.55;
  }
  .fact b { color:var(--navy); }

  /* JOURNEY DOTS */
  .dots { display:flex; justify-content:center; gap:6px; margin:14px 0; }
  .dot {
    width:28px; height:28px; border-radius:50%;
    background:var(--border); transition:all .3s;
    display:flex; align-items:center; justify-content:center;
    font-size:.7rem; color:var(--white);
    border:2px solid transparent;
  }
  .dot.active {
    background:var(--coral); transform:scale(1.2);
    box-shadow:0 0 12px rgba(232,53,74,.3);
    border-color:var(--coral-dk);
  }
  .dot.done {
    background:linear-gradient(135deg, var(--navy), #4A5ACF);
    border-color:var(--navy-dk);
  }

  /* SCENE */
  .scene {
    background:linear-gradient(135deg, var(--navy-pale) 0%, #F0F0FF 100%);
    border:1.5px solid var(--navy); border-radius:var(--radius);
    padding:22px; margin:12px 0; min-height:160px;
    display:flex; align-items:center; justify-content:center; text-align:center;
  }

  /* BAR */
  .barwrap { height:26px; border-radius:var(--radius); border:1.5px solid var(--border); overflow:hidden; display:flex; margin:12px 0; }

  /* CONFETTI */
  .confbox { position:fixed; inset:0; pointer-events:none; z-index:300; }
  .cp { position:absolute; border-radius:3px; animation:fall linear forwards; }
  @keyframes fall{from{transform:translateY(-20px) rotate(0deg);opacity:1}to{transform:translateY(105vh) rotate(900deg);opacity:0}}

  /* STAMP */
  .stamp {
    width:72px; height:72px; border-radius:var(--radius);
    background:var(--white); border:2.5px solid var(--navy); box-shadow:3px 3px 0 var(--navy-dk);
    font-size:2rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .12s;
  }
  .stamp:hover { transform:translate(-2px,-2px); box-shadow:5px 5px 0 var(--navy-dk); }
  .stamp.done { background:var(--navy); animation:sgo .28s ease; }
  @keyframes sgo{0%{transform:scale(2)}100%{transform:scale(1)}}

  .slide { animation:sup .35s ease; }
  @keyframes sup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  /* P1 LAYOUT */
  .p1-layout { display:flex; gap:14px; align-items:flex-start; }
  .p1-preview { flex:0 0 160px; position:sticky; top:64px; align-self:flex-start; }
  .p1-options { flex:1; min-width:0; }

  /* GENDER TOGGLE */
  .gtoggle { display:flex; border:2px solid var(--navy); border-radius:var(--radius); overflow:hidden; }
  .gtoggle-btn {
    flex:1; padding:9px 16px; font-family:'Black Han Sans',cursive; font-size:.88rem;
    border:none; cursor:pointer; transition:all .15s; background:transparent; color:var(--navy);
  }
  .gtoggle-btn.on { background:var(--navy); color:var(--white); }

  /* SHIP TIME */
  .ship-pill {
    background:var(--navy-pale); border:1.5px solid var(--border); border-radius:var(--radius);
    padding:11px 14px; margin-bottom:12px; display:flex; align-items:center; gap:10px; transition:all .3s;
  }
  .ship-pill.live { border-color:var(--coral); background:var(--coral-pale); }

  .rockship  { animation:rk 2.2s ease-in-out infinite; display:inline-block; }
  @keyframes rk{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg) translateX(7px)}}
  .flyplane  { animation:fly 1.8s ease-in-out infinite; display:inline-block; }
  @keyframes fly{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
  .drivetruck{ animation:drv 1.4s ease-in-out infinite; display:inline-block; }
  @keyframes drv{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}

  /* SPARKLE PARTICLES */
  .sparkle-container { position:relative; overflow:visible; }
  .sparkle {
    position:absolute; width:6px; height:6px; border-radius:50%;
    animation: sparkleFloat 2s ease-in-out infinite;
    pointer-events:none;
  }
  @keyframes sparkleFloat {
    0%,100% { opacity:0; transform:translateY(0) scale(0); }
    50% { opacity:1; transform:translateY(-20px) scale(1); }
  }

  /* DOLL IDLE ANIMATION */
  .doll-sway { animation: dollSway 4s ease-in-out infinite; }
  @keyframes dollSway {
    0%,100% { transform:rotate(-1.5deg); }
    50% { transform:rotate(1.5deg); }
  }
  .doll-blink .eye-group { animation: none; }
  .doll-blinking .eye-group { animation: blink .2s ease; }
  @keyframes blink { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.15)} }

  /* MINI-GAME SHARED */
  .mini-game {
    background:linear-gradient(150deg, #FFF4F8 0%, #F0EEFF 40%, #FFF0F8 100%);
    border:2px solid rgba(26,38,144,.2); border-radius:16px;
    padding:20px; margin:12px 0; min-height:280px;
    position:relative; overflow:hidden; touch-action:none;
    box-shadow: inset 0 0 40px rgba(255,181,200,.08);
  }
  .mini-game-instruction {
    text-align:center; font-family:'Black Han Sans',cursive;
    font-size:.95rem; color:var(--navy); margin-bottom:16px;
  }
  .drag-item {
    cursor:grab; user-select:none; touch-action:none;
    transition:transform .15s, box-shadow .15s;
  }
  .drag-item:hover { transform:scale(1.08); }
  .drag-item.dragging {
    cursor:grabbing; transform:scale(1.12);
    box-shadow:0 8px 24px rgba(0,0,0,.15);
    z-index:100;
  }
  .drop-zone {
    border:2px dashed var(--border); border-radius:var(--radius);
    transition:all .2s;
  }
  .drop-zone.hover {
    border-color:var(--coral); background:var(--coral-pale);
    transform:scale(1.02);
  }
  .drop-zone.filled {
    border-style:solid; border-color:var(--navy);
    background:var(--navy-pale);
  }

  /* COUNTER ANIMATION */
  .count-up { display:inline-block; }

  /* SHARE CARD */
  .doll-card {
    width:300px; margin:20px auto; padding:24px;
    background:linear-gradient(135deg, #FFE8F0 0%, #FFF0E8 30%, #E8F0FF 70%, #F0E8FF 100%);
    border:3px solid var(--navy); border-radius:16px;
    box-shadow:6px 6px 0 var(--navy-dk);
    text-align:center; position:relative; overflow:hidden;
  }
  .doll-card::before {
    content:''; position:absolute; inset:8px;
    border:1.5px solid rgba(26,38,144,.15); border-radius:12px;
    pointer-events:none;
  }

  @media(max-width:480px){
    .big-title{font-size:2rem} .ogrid3{grid-template-columns:1fr 1fr}
    .p1-layout{flex-direction:column} .p1-preview{position:static;flex:none;width:100%}
  }
`;
