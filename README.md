# Sit-Down Restaurant — Template #1

Reusable factory template for dine-in restaurants. Covers Vietnamese, Italian, seafood, family-run, and premium/fine dining without structural changes — expression varies by archetype and fixture data.

## Path

`/templates/sit-down-restaurant/`

## When to use

- Table-service restaurants with a fixed address
- Walk-in, reservation, or mixed service models
- Any cuisine where guests need: what to eat → what it feels like → how to visit

## When not to use

- Counter-only / no dine-in → Quick Service template
- Delivery-only / cloud kitchen
- Bar-primary nightlife venue
- Catering-only / quote-first with no public menu

See `ARCHETYPE.md` for full exclusion list.

## Core sections (fixed order)

| # | Section | Always |
|---|---------|--------|
| 1 | `hero` | Yes |
| 2 | `owner-story` | Module — FAMILY BUSINESS + data |
| 3 | `menu-highlights` | Yes (content mode varies) |
| 4 | `atmosphere` | Yes (layout adapts to photo count) |
| 5 | `social-proof` | Module — ≥2 reviews |
| 6 | `faq` | Module — ≥2 FAQ items |
| 7 | `private-dining` | Module — data present |
| 8 | `visit` | Yes |
| 9 | `footer` | Yes |

## Data files

| File | Purpose |
|------|---------|
| `data/client.json` | Business facts (from scraper + owner) |
| `data/strategy.json` | Archetype, CTAs, section order, design direction |
| `data/template.config.json` | Expression: fonts, colors, modules, density |

Schemas: `schemas/client.schema.json`, `schemas/strategy.schema.json`, `schemas/template.config.schema.json`

## Fixtures (QA)

| Fixture | Archetype | Tests |
|---------|-----------|-------|
| `fixtures/vietnamese/` | LOCAL TRUST | Review-led menu, hours in hero |
| `fixtures/italian/` | MODERN PREMIUM | Priced menu, FAQ, full menu link |
| `fixtures/seafood/` | EXPERIENCE DRIVEN | Reserve CTA, private dining |
| `fixtures/family/` | FAMILY BUSINESS | Owner-story module |
| `fixtures/luxury/` | LUXURY | Full-bleed hero, 4 menu items max |

## Commands

```bash
cd templates/sit-down-restaurant
npm install
npm run fixtures:photos          # Generate SVG fixture images
npm run fixture:prepare vietnamese  # Load one fixture into data/
npm run dev                      # Dev server (defaults to vietnamese)
npm run fixtures:build           # Production build all 5 fixtures
npm run fixtures:qa              # QA gate all 5 fixtures
npm run fixtures:screenshots     # Screenshots at 375px + 1280px
```

## Per-client scaffold

```bash
cp -r templates/sit-down-restaurant sites/<slug>
cd sites/<slug>
# Copy scraped data into data/client.json
# Add strategy.json + template.config.json from website-strategy agent
# Copy photos into public/photos/
npm install && npm run dev
```

## Component architecture

```
src/
├── app/                    # layout, page, globals
├── components/
│   ├── shell/              # Header, Footer, MobileStickyCTA
│   ├── sections/           # One component per section/module
│   └── ui/                 # CtaButton, SectionLabel, PullQuote
└── lib/
    ├── client.ts           # Types + JSON imports
    ├── sections.ts         # Module visibility + density
    ├── menu.ts             # Menu-highlights modes
    ├── photos.ts           # Photo allocation
    ├── cta.ts              # Strategy CTA resolution
    ├── copy.ts             # Data-derived copy helpers
    └── theme.ts            # Fonts + CSS variables
```
