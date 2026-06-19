import {
  client,
  strategy,
  templateConfig,
  type MenuHighlightsMode,
} from "./client";
import { hasReviewThemes, hasServicesList, hasStructuredMenu } from "./copy";

function resolveToggle(
  toggle: "auto" | "on" | "off",
  autoValue: boolean
): boolean {
  if (toggle === "on") return true;
  if (toggle === "off") return false;
  return autoValue;
}

export function getMenuMode(): MenuHighlightsMode {
  const configured = templateConfig.expression.menu_highlights_mode;
  if (configured !== "auto") return configured;

  if (hasStructuredMenu()) return "menu";
  if (hasServicesList()) return "categories";
  if (hasReviewThemes()) return "review-led";
  return "sparse";
}

export function getMenuMax(): number {
  const configured = templateConfig.expression.menu_highlights_max;
  if (configured !== "auto") return Number(configured);

  if (strategy.archetype.assigned === "LUXURY") return 4;
  return 8;
}

export function getHeroPattern(): "A" | "B" {
  const configured = templateConfig.expression.hero_pattern;
  if (configured !== "auto") return configured;

  if (
    strategy.archetype.assigned === "LUXURY" ||
    strategy.archetype.assigned === "EXPERIENCE DRIVEN"
  ) {
    return "A";
  }
  return "B";
}

export function showHoursInHero(): boolean {
  const configured = templateConfig.expression.hours_in_hero;
  if (configured === "show") return true;
  if (configured === "hide") return false;
  return (
    strategy.archetype.assigned === "LOCAL TRUST" ||
    strategy.archetype.assigned === "FAMILY BUSINESS"
  );
}

export const modules = {
  socialProof: resolveToggle(
    templateConfig.modules.social_proof,
    client.reviews.length >= 2
  ),
  ownerStory: resolveToggle(
    templateConfig.modules.owner_story,
    strategy.archetype.assigned === "FAMILY BUSINESS" &&
      Boolean(client.owner_name || client.owner_story)
  ),
  faq: resolveToggle(templateConfig.modules.faq, client.faq.length >= 2),
  privateDining: resolveToggle(
    templateConfig.modules.private_dining,
    Boolean(client.private_dining_note?.trim())
  ),
  fullMenuLink: resolveToggle(
    templateConfig.modules.full_menu_link,
    Boolean(client.menu_url)
  ),
} as const;

export type ModuleKey = keyof typeof modules;

export function sectionDensity(
  id: "hero" | "menu_highlights" | "atmosphere" | "social_proof" | "visit"
): "tight" | "medium" | "open" {
  const strategyId = id.replace("_", "-") as
    | "hero"
    | "menu-highlights"
    | "atmosphere"
    | "social-proof"
    | "visit";
  const fromStrategy = strategy.section_order.find((s) => s.id === strategyId)?.density;
  if (fromStrategy) return fromStrategy;
  return templateConfig.expression.density[id] ?? "medium";
}

export const densityPad = {
  tight: "py-12 md:py-16",
  medium: "py-14 md:py-20",
  open: "py-16 md:py-28",
} as const;

export function atmosphereMode(): "mosaic" | "inline" | "prose" {
  const remaining = client.photos.length > 1 ? client.photos.length - 1 : 0;
  if (remaining >= 3) return "mosaic";
  if (remaining >= 1) return "inline";
  if (modules.socialProof && client.reviews.length === 1) return "prose";
  return "inline";
}

export function mergeSocialProofIntoAtmosphere(): boolean {
  return !modules.socialProof && client.reviews.length === 1;
}

export function topReviews() {
  return [...client.reviews]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 3);
}
