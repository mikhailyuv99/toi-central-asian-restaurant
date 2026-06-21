"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

const CREDIT_URL = "https://www.instagram.com/mikhailyuv/";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="habibi-footer">
      <div className="habibi-footer__inner">
        <p className="habibi-footer__legal">{t.footer.copyright(year)}</p>
        <p className="habibi-footer__legal">{t.footer.disclaimer}</p>
        <p className="habibi-footer__legal">{t.footer.legalCookies}</p>
        <p className="habibi-footer__credit">
          {t.footer.credit}{" "}
          <a href={CREDIT_URL} target="_blank" rel="noopener noreferrer">
            @mikhailyuv
          </a>
        </p>
      </div>
    </footer>
  );
}
