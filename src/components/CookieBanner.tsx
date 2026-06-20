"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const KEY = "toi-cookie-ok";

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-[200] flex flex-wrap items-center justify-center gap-3 border-t border-black/10 bg-[var(--dark)] px-4 py-3 text-[var(--surface)]"
    >
      <p className="text-xs">{t.cookie.text}</p>
      <button
        type="button"
        onClick={() => {
          localStorage.setItem(KEY, "1");
          setVisible(false);
        }}
        className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--dark)]"
      >
        {t.cookie.ok}
      </button>
    </div>
  );
}
