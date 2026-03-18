/* ══════════════════════════════════════
   WEB AUDIO API SYNTH SOUND SYSTEM
   Zero audio files — everything generated
   ══════════════════════════════════════ */

let ctx = null;
let muted = false;

function getCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// Initialize on first user gesture
export function initAudio() {
  getCtx();
}

export function setMuted(v) {
  muted = v;
}
export function isMuted() {
  return muted;
}

function osc(freq, type, duration, vol = 0.15) {
  const c = getCtx();
  if (!c || muted) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + duration);
}

function noise(duration, vol = 0.08) {
  const c = getCtx();
  if (!c || muted) return;
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  const g = c.createGain();
  src.buffer = buffer;
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  src.connect(g).connect(c.destination);
  src.start();
}

// Short blip for button clicks
export function playClick() {
  osc(800, "sine", 0.08, 0.1);
}

// Ascending C-E-G arpeggio for completion
export function playSuccess() {
  const c = getCtx();
  if (!c || muted) return;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    setTimeout(() => osc(freq, "sine", 0.2, 0.12), i * 100);
  });
}

// Low thunk + noise burst for QA stamp
export function playStamp() {
  osc(200, "square", 0.15, 0.18);
  noise(0.1, 0.12);
}

// Ship horn — low sawtooth with vibrato
export function playShipHorn() {
  const c = getCtx();
  if (!c || muted) return;
  const o = c.createOscillator();
  const g = c.createGain();
  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  o.type = "sawtooth";
  o.frequency.value = 180;
  lfo.frequency.value = 4;
  lfoGain.gain.value = 8;
  lfo.connect(lfoGain).connect(o.frequency);
  g.gain.setValueAtTime(0.12, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.8);
  o.connect(g).connect(c.destination);
  o.start();
  lfo.start();
  o.stop(c.currentTime + 0.8);
  lfo.stop(c.currentTime + 0.8);
}

// Plane whoosh — rising pitch noise
export function playPlane() {
  const c = getCtx();
  if (!c || muted) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(200, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(600, c.currentTime + 0.5);
  g.gain.setValueAtTime(0.08, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.6);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.6);
  noise(0.4, 0.06);
}

// Cash register ding
export function playCashRegister() {
  osc(1200, "sine", 0.3, 0.12);
  setTimeout(() => osc(800, "sine", 0.2, 0.08), 80);
}

// Pick up item
export function playDrag() {
  osc(600, "sine", 0.05, 0.08);
}

// Drop item in place
export function playDrop() {
  osc(400, "sine", 0.08, 0.1);
  noise(0.05, 0.06);
}

// Wrong action — descending E-C
export function playError() {
  osc(659.25, "sine", 0.15, 0.1);
  setTimeout(() => osc(523.25, "sine", 0.2, 0.1), 120);
}

// Sad trombone for losing money
export function playSadTrombone() {
  const c = getCtx();
  if (!c || muted) return;
  const notes = [293.66, 277.18, 261.63, 246.94];
  notes.forEach((freq, i) => {
    setTimeout(() => osc(freq, "sawtooth", 0.35, 0.08), i * 300);
  });
}

// Ta-da fanfare for unboxing
export function playFanfare() {
  const c = getCtx();
  if (!c || muted) return;
  const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5];
  const times = [0, 80, 160, 300, 400, 500];
  const durs = [0.08, 0.08, 0.08, 0.12, 0.12, 0.35];
  notes.forEach((freq, i) => {
    setTimeout(() => osc(freq, "sine", durs[i], 0.12), times[i]);
  });
}

// Conveyor belt rumble
export function playConveyor() {
  osc(80, "sawtooth", 0.6, 0.06);
  noise(0.5, 0.04);
}

// Box close thud
export function playBoxClose() {
  osc(150, "sine", 0.12, 0.15);
  noise(0.08, 0.1);
}
