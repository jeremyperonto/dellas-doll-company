/* ══════════════════════════════════════
   DATA CONSTANTS
   ══════════════════════════════════════ */

export const HAIR_STYLES = [
  { id: "Bob", emoji: "💇", cost: 0.50, desc: "Clean & classic" },
  { id: "Twin Tails", emoji: "🎀", cost: 0.65, desc: "Cute pigtails" },
  { id: "Long Straight", emoji: "✨", cost: 0.75, desc: "Flowing & elegant" },
  { id: "Short Messy", emoji: "🌟", cost: 0.55, desc: "Playful & fun" },
  { id: "Side Ponytail", emoji: "💫", cost: 0.60, desc: "Sassy & sweet" },
];

export const HAIR_COLORS = [
  { id: "Dark", emoji: "🖤", cost: 0.10, desc: "Classic dark" },
  { id: "Auburn", emoji: "🤎", cost: 0.20, desc: "Warm reddish" },
  { id: "Blonde", emoji: "💛", cost: 0.25, desc: "Honey blonde" },
  { id: "Pink", emoji: "💗", cost: 0.35, desc: "Fantasy pink" },
];

export const SKIN_TONES = [
  { id: "Light", emoji: "🌸", cost: 0, desc: "Light peach" },
  { id: "Medium", emoji: "🌻", cost: 0, desc: "Warm golden" },
  { id: "Deep", emoji: "🌰", cost: 0, desc: "Rich & warm" },
];

export const OUTFITS = [
  { id: "Denim Jumper", emoji: "🧥", cost: 0.85, desc: "Cool & casual" },
  { id: "Pink Dress", emoji: "👗", cost: 1.50, desc: "Pretty in pink" },
  { id: "Gray Jumper", emoji: "🖤", cost: 1.35, desc: "Cozy vibes" },
  { id: "Blue Plaid", emoji: "💙", cost: 1.20, desc: "Preppy chic" },
  { id: "Brown Overalls", emoji: "🤎", cost: 0.95, desc: "Earthy & cute" },
  { id: "Striped Dress", emoji: "🎪", cost: 1.10, desc: "Fun stripes" },
  { id: "Flower Tee", emoji: "🌺", cost: 0.80, desc: "Garden fresh" },
  { id: "Green Dress", emoji: "💚", cost: 1.40, desc: "Elegant & long" },
];

export const BODY_OPTS = [
  { id: "Plastic", emoji: "🧱", cost: 0.75, desc: "Classic hard shell" },
  { id: "Soft Vinyl", emoji: "🫧", cost: 1.20, desc: "Squishy & bendy" },
  { id: "Plush", emoji: "🧸", cost: 0.95, desc: "Soft & huggable" },
];
export const QTY_OPTS = [
  { id: "10", qty: 10, mult: 3.2, emoji: "🤲", desc: "Almost handmade!", prodWeeks: 0.5 },
  { id: "100", qty: 100, mult: 1.6, emoji: "📦", desc: "Small batch", prodWeeks: 1 },
  { id: "1,000", qty: 1000, mult: 1.0, emoji: "🏪", desc: "Now we're cooking!", prodWeeks: 3 },
  { id: "10,000", qty: 10000, mult: 0.6, emoji: "🏭", desc: "Cheapest per doll!", prodWeeks: 8 },
];
export const FACTORY_OPTS = [
  { id: "USA", flag: "🇺🇸", labor: 6.50, desc: "Super fast, but pricey.", defectRate: 0.015 },
  { id: "Mexico", flag: "🇲🇽", labor: 2.50, desc: "Good balance of cost & time.", defectRate: 0.04 },
  { id: "China", flag: "🇨🇳", labor: 0.85, desc: "Where most toys are made!", defectRate: 0.06 },
];
export const SHIP_OPTS_ALL = [
  { id: "Cargo Ship", emoji: "🚢", cost: 0.25, desc: "Cheapest — but very slow!", usaOnly: false },
  { id: "Air Freight", emoji: "✈️", cost: 2.00, desc: "Fastest — but pricey!", usaOnly: false },
  { id: "Truck", emoji: "🚛", cost: 0.35, desc: "USA & Mexico only", usaOnly: true },
];
export const BOX_OPTS = [
  { id: "Plain Box", emoji: "📦", cost: 0.20, desc: "Simple brown box" },
  { id: "Holo Box", emoji: "✨", cost: 0.65, desc: "Shiny holographic!" },
  { id: "Window Box", emoji: "🪟", cost: 1.00, desc: "Kids can see the doll!" },
];
export const BODY_DEFECT = { Plastic: 0, "Soft Vinyl": 0.015, Plush: 0.03 };

export const SHIP_TIMES = {
  USA: { "Cargo Ship": "4–7 days", "Air Freight": "1–2 days", Truck: "2–5 days" },
  Mexico: { "Cargo Ship": "7–10 days", "Air Freight": "1–2 days", Truck: "3–5 days" },
  China: { "Cargo Ship": "18–22 days", "Air Freight": "3–5 days", Truck: null },
};
export const SHIP_WEEKS = {
  USA: { "Cargo Ship": 5.5 / 7, "Air Freight": 1.5 / 7, Truck: 3.5 / 7 },
  Mexico: { "Cargo Ship": 8.5 / 7, "Air Freight": 1.5 / 7, Truck: 4 / 7 },
  China: { "Cargo Ship": 20 / 7, "Air Freight": 4 / 7, Truck: null },
};

export const PR = { sub: "she", obj: "her", pos: "her", cap: "She", capObj: "Her" };

// Map pin data for WorldMap
export const FPINS = {
  USA: { lat: 39, lon: -97, flag: "🇺🇸", col: "#E8354A", label: "USA" },
  Mexico: { lat: 23, lon: -102, flag: "🇲🇽", col: "#00C9A7", label: "Mexico" },
  China: { lat: 28, lon: 108, flag: "🇨🇳", col: "#FFD34E", label: "China" },
};
