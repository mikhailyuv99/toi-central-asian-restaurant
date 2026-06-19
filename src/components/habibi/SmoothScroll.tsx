"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const NAV_OFFSET = -56;
const LEGACY_HASHES = new Set(["menu-viewer"]);

function ScrollRestoreFix() {
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navEntry?.type === "reload";
    let hash = window.location.hash.slice(1);

    if (LEGACY_HASHES.has(hash)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      hash = "";
    }

    if (isReload && !hash) {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return null;
}

function HashScrollHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const hash = window.location.hash.slice(1);
    if (!hash || LEGACY_HASHES.has(hash)) return;

    const target = document.getElementById(hash);
    if (!target) return;

    requestAnimationFrame(() => {
      lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 });
    });
  }, [lenis, pathname]);

  return null;
}

function AnchorClickHandler() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== pathname) return;

      const hash = url.hash.slice(1);
      if (!hash || LEGACY_HASHES.has(hash)) return;

      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 });
      history.pushState(null, "", `#${hash}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis, pathname]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        autoRaf: true,
      }}
    >
      <ScrollRestoreFix />
      <HashScrollHandler />
      <AnchorClickHandler />
      {children}
    </ReactLenis>
  );
}
