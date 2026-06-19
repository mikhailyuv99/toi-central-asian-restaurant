import type { CSSProperties } from "react";
import {
  Bodoni_Moda,
  Cormorant,
  Fraunces,
  Jost,
  Literata,
  Nunito_Sans,
  Outfit,
  Playfair_Display,
  Source_Sans_3,
  Work_Sans,
} from "next/font/google";
import { templateConfig } from "./client";

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const headingFonts = {
  fraunces,
  playfair,
  cormorant,
  literata,
  "bodoni-moda": bodoniModa,
} as const;

const bodyFonts = {
  "work-sans": workSans,
  "source-sans": sourceSans,
  outfit,
  "nunito-sans": nunitoSans,
  jost,
} as const;

type HeadingKey = keyof typeof headingFonts;
type BodyKey = keyof typeof bodyFonts;

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/\s+/g, "-");
}

function pickHeading(key: string) {
  const normalized = normalizeKey(key) as HeadingKey;
  return headingFonts[normalized] ?? fraunces;
}

function pickBody(key: string) {
  const normalized = normalizeKey(key) as BodyKey;
  return bodyFonts[normalized] ?? workSans;
}

const headingFont = pickHeading(templateConfig.expression.typography.headings);
const bodyFont = pickBody(templateConfig.expression.typography.body);

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;

export function themeStyle(): CSSProperties {
  const c = templateConfig.expression.colors;
  return {
    ["--accent" as string]: c.accent,
    ["--accent-bright" as string]: c.accent_bright ?? c.accent,
    ["--surface" as string]: c.surface,
    ["--surface-muted" as string]: c.surface_muted ?? c.surface,
    ["--text" as string]: c.text,
    ["--text-soft" as string]: c.text_soft ?? c.text,
    ["--dark" as string]: c.dark ?? "#14100e",
    ["--rule" as string]: "rgba(26, 20, 16, 0.1)",
  };
}
