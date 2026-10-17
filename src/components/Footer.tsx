import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_LOGO_URL, CHERRIES_INFO, CHERRIES_CONTENT } from "@/lib/cherries-data";
import { MapPin, Phone, MessageCircle, Mail, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language];

  return (
    <footer className="border-t border-border bg-card/60 pt-16 pb-12 text-foreground transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border/70">
          
          {/* Logo & Tagline column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-2xl p-1 bg-white shadow-xs border border-border/60 flex items-center justify-center overflow-hidden">
                <img
                  src={CHERRIES_LOGO_URL}
                  alt="Cherries Edu House"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-foreground tracking-tight">
                  Cherries Edu House
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  {isAr ? "حضانة زايد ريجنسي • بيئة تعليمية واعية" : "Zayed Regency • Nursery"}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md pt-2">
              {t.footer.tagline}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                {isAr ? "موقع آمن داخل كمبوند مغلق" : "Gated Compound Setting"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground border border-border">
                <Heart className="w-3.5 h-3.5 text-primary" />
                {isAr ? "رعاية فردية متخصصة" : "Child-Centered Philosophy"}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {isAr ? "روابط سريعة" : "Explore"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#classes" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.classes}
                </a>
              </li>
              <li>
                <a href="#environment" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.environment}
                </a>
              </li>
              <li>
                <a href="#approach" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.approach}
                </a>
              </li>
              <li>
                <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.team}
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.faqs}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {t.location.tag}
            </h4>

            <div className="space-y-2.5 text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{isAr ? CHERRIES_INFO.addressAr : CHERRIES_INFO.addressEn}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={CHERRIES_INFO.phoneCall} className="hover:text-foreground font-semibold" dir="ltr">
                  {CHERRIES_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={CHERRIES_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground font-semibold"
                >
                  WhatsApp: {CHERRIES_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="font-mono text-xs">{CHERRIES_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CHERRIES_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                <span>{t.location.directionsBtn}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Cherries Edu House. {t.footer.rights}</p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
