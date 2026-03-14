# Della's Doll Factory

My daughter asked me to build her a factory. What she really wanted was to create a doll — but I saw a chance to teach her something bigger. Where do dolls actually come from? Who makes them? Why do they cost what they cost? Why does a $4 toy sell for $16?

This is a single-page interactive simulation that walks a child through the entire supply chain of a fashion doll — from design decisions to factory economics to global shipping to retail shelf. They make every choice, and every choice has a real financial consequence.

## What it teaches

**Design → Manufacturing → Logistics → Sales.** The four phases mirror how a real toy company operates:

1. **Design Studio** — Pick hair, eyes, outfit, body material. Each option has a different cost. Kids learn that creative decisions are also business decisions: rainbow hair costs more because it needs more dye and more factory steps.

2. **Factory Floor** — Choose quantity (10 to 10,000), factory location (USA/Mexico/China), shipping method, and packaging. This is where the real lessons hit: bulk discounts, labor cost differences across countries, the tradeoff between speed and cost in shipping, and why packaging matters for "shelf appeal."

3. **The Journey** — A step-by-step walkthrough of materials sourcing, assembly, quality inspection, packaging, shipping, and stocking shelves. Each step has a "did you know?" fact grounded in how real supply chains work.

4. **Sales Report** — The payoff. Kids see their doll's retail price (4x manufacturing cost), a dollar-breakdown bar chart showing where every cent goes (materials, labor, shipping, packaging, advertising, store's cut, profit), defect rates and their financial impact, a full P&L statement, and a break-even analysis. They learn that making a cool doll is the easy part — making money from it is the hard part.

## Design philosophy

**One file, zero dependencies.** The entire application is a single React JSX file with inline CSS and inline SVG. No images, no asset pipeline, no build complexity. This was intentional: I wanted something I could hand to my daughter on any device with a React runtime and have it just work.

**Anime/K-pop idol aesthetic.** The dolls are rendered as inline SVG with a K-pop fashion illustration style — large expressive eyes, flowing hair with shine highlights, detailed outfits, and smooth gradients. Think collectible idol dolls, not clip art. The visual language draws from Korean graphic design: bold sans-serif type (Black Han Sans), coral × navy × cream palette, hard shadow buttons, and poster-style layouts.

**Real math, simplified.** The financial model uses real industry patterns (2x wholesale markup, 2x retail markup, 22% marketing spend, location-based defect rates) but simplifies enough for a child to follow. The app explicitly tells kids that real companies also deal with warehouse rent, salaries, returns, and taxes — this is a starting point, not the full picture.

**Everything is a tradeoff.** There are no "right" answers. Cheap factory = more defects. Small batch = higher per-unit cost. Fast shipping = expensive. The point isn't to optimize — it's to understand that every business decision involves giving something up.

## Running it

This is a single React component. Drop it into any React project:

```bash
# With Vite
npm create vite@latest my-app -- --template react
cp dellas-doll-corporation.jsx my-app/src/App.jsx
cd my-app && npm install && npm run dev
```

The only external dependency is Google Fonts (Black Han Sans + Noto Sans), loaded via CSS `@import` in the component.

## The financial model

For the curious, here's how the numbers work:

| Cost Layer | Formula |
|---|---|
| Materials | (hair + eyes + outfit + body costs) × quantity multiplier |
| Labor | Factory rate per doll (USA $6.50, Mexico $2.50, China $0.85) |
| Shipping | Per-doll rate (Ship $0.25, Air $2.00, Truck $0.35) |
| Packaging | Per-doll box cost ($0.20 – $1.00) |
| **Manufacturing cost** | **Sum of above** |
| Wholesale price | Manufacturing × 2 |
| Retail price | Wholesale × 2 |
| Defects | Factory rate + body material risk, subtracted from sellable units |
| Marketing | 22% of revenue |
| **Net profit** | **Revenue − total manufacturing − marketing** |

Break-even = total manufacturing cost ÷ (wholesale × 0.78).

The dollar-breakdown visualization shows where every dollar of the retail price goes. The store keeps 50% off the top. Of the remaining 50%, the manufacturer covers materials, labor, shipping, packaging, and advertising — profit is whatever's left.

## Why this exists

Because a seven-year-old asked "can you build me a factory?" and the honest answer was: "Let me show you how one works."
