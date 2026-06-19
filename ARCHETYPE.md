# Archetype: Sit-Down Restaurant

**Template ID:** `sit-down-restaurant`  
**Category:** Full-service / table-service restaurant  
**Coverage target:** ~80% of restaurant-category Maps listings

## Page goal

A prospect opens the link on mobile and within one scroll knows what to order, what the room feels like, and how to get there or book.

## Audience

Mobile-first. May arrive from WhatsApp, Zalo, or Google Maps share. May not know the menu or local language.

## Information hierarchy

1. Recognition — Is this the place? What are they known for?
2. Decision — What should I order?
3. Confidence — Reviews and room photos
4. Action — Address, hours, phone, directions or reserve
5. Persistence — Sticky call + directions bar

## Conversion path

```
Hero → Menu highlights → Atmosphere → [Social proof] → Visit → Sticky bar
```

Primary CTA set by strategy archetype — never "Learn More".

## Layout patterns (default)

| Section | Pattern | ID |
|---------|---------|-----|
| hero | Asymmetric split (B) or full-bleed (A for LUXURY) | B / A |
| owner-story | Overlap | I |
| menu-highlights | Editorial grid | C |
| atmosphere | Mosaic (H) or prose (E) when few photos | H / E |
| social-proof | Narrow prose | E / D |
| visit | Horizontal band | G |
| footer | Minimal row | J |

No two adjacent sections share the same pattern.

## Menu-highlights modes

| Mode | Trigger |
|------|---------|
| `menu` | Structured menu in client.json |
| `categories` | services_or_menu list only |
| `review-led` | review_themes, no menu |
| `sparse` | No menu data — honest gap + call CTA |

## Modules (conditional, same structure)

- `social-proof` — ≥2 reviews
- `owner-story` — FAMILY BUSINESS + owner_name or owner_story
- `faq` — ≥2 faq items
- `private-dining` — private_dining_note in data
- `full-menu-link` — menu_url in data

## Fixed (do not change per client)

- Section IDs and default order
- Module slot positions
- Mobile sticky utility bar
- Single-page architecture
- next/image, next/font, LocalBusiness JSON-LD
- Max 8 menu highlights (4 for LUXURY via config)
- Max 3 reviews in social-proof

## Configurable (template.config.json + strategy)

- Archetype expression, tone, density
- Hero pattern A vs B
- Typography pairing
- Accent and surface colors
- Module toggles (auto/on/off)
- CTA labels and actions
- Hours in hero zone

## Banned

- Hero + 3 icon cards
- Dark gradient overlay hero with centered white text
- Mission / vision / values boxes
- Fabricated reviews, stats, menu items
- Stock photography
- Default blue-600 / indigo-600 brand
- Purple gradient decoration blobs

## QA gate

Template v1 ships when all five fixtures pass `npm run fixtures:qa` and render screenshots at 375px and 1280px without structural changes.
