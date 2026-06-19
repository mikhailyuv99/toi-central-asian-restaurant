import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { MapsSection } from "./MapsSection";
import { SiteNav } from "./SiteNav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SiteNav />
      {children}
      <MapsSection />
      <Footer />
      <CookieBanner />
    </LanguageProvider>
  );
}
