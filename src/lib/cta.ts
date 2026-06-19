import { client, phoneHref, strategy } from "./client";

type ResolvedCta = {
  label: string;
  href: string;
  external: boolean;
};

function resolveTarget(target: string | null): string {
  if (!target) return "#";
  if (target === "reserve_url" && client.reserve_url) return client.reserve_url;
  if (target === "menu_url" && client.menu_url) return client.menu_url;
  if (target.startsWith("#")) return target;
  if (target.startsWith("http") || target.startsWith("tel:")) return target;
  return `#${target}`;
}

export function resolveCta(action: (typeof strategy.cta)["primary"]): ResolvedCta | null {
  if (action.action === "none") return null;

  switch (action.action) {
    case "tel":
      return { label: action.label, href: `tel:${phoneHref}`, external: false };
    case "directions":
      return { label: action.label, href: client.maps_url, external: true };
    case "url": {
      const href = resolveTarget(action.target);
      return { label: action.label, href, external: href.startsWith("http") };
    }
    case "scroll": {
      const href = resolveTarget(action.target ?? "#menu-highlights");
      return { label: action.label, href, external: false };
    }
    default:
      return null;
  }
}

export const primaryCta = resolveCta(strategy.cta.primary);
export const secondaryCta = resolveCta(strategy.cta.secondary);
