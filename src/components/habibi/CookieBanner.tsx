"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const KEY = "habibi-cookie-ok";

export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function accept() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  return (
    <div className="habibi-cookie" role="dialog" aria-label="Cookie notice">
      <p className="habibi-cookie__text">{t.cookie.text}</p>
      <button type="button" className="habibi-cookie__btn" onClick={accept}>
        {t.cookie.ok}
      </button>
    </div>
  );
}
