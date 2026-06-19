import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { MapsSection } from "./MapsSection";
import { SiteNav } from "./SiteNav";
import { SmoothScroll } from "./SmoothScroll";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <SiteNav />
        {children}
        <MapsSection />
        <Footer />
        <CookieBanner />
      </SmoothScroll>
    </LanguageProvider>
  );
}
