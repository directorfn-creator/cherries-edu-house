import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT, CHERRIES_INFO } from "@/lib/cherries-data";
import { MapPin, MessageCircle, Phone, ExternalLink } from "lucide-react";

export function LocationSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].location;

  return (
    <section id="location" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {t.tag}
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.subtitle}
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {t.addressLabel}
                </span>
                <p className="text-sm font-semibold text-foreground">
                  {isAr ? CHERRIES_INFO.addressAr : CHERRIES_INFO.addressEn}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {t.phoneLabel}
                  </span>
                  <p className="text-sm font-bold text-foreground" dir="ltr">
                    {CHERRIES_INFO.phoneDisplay}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    {t.emailLabel}
                  </span>
                  <p className="text-xs font-medium text-foreground truncate">
                    {CHERRIES_INFO.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={CHERRIES_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-95 transition-all shadow-xs"
              >
                <MapPin className="w-4 h-4" />
                <span>{t.directionsBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={CHERRIES_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-bold text-sm hover:bg-accent hover:border-primary/40 transition-all shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>{t.chatBtn}</span>
              </a>

              <a
                href={CHERRIES_INFO.phoneCall}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-accent transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{t.callBtn}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-4">
              <div className="rounded-2xl bg-secondary/80 border border-border p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  Zayed Regency Compound
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {isAr
                    ? "كمبوند زايد ريجنسي، الشيخ زايد الثانية، محافظة الجيزة، مصر."
                    : "Zayed Regency Compound, Second Al Sheikh Zayed, Giza Governorate, Egypt."}
                </p>
                <a
                  href={CHERRIES_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:brightness-95 transition-all shadow-xs"
                >
                  <span>{t.directionsBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-accent/40 border border-border text-xs text-muted-foreground flex items-center justify-between">
                <span>{isAr ? "للاستفسارات والزيارات:" : "Inquiries & Visits:"}</span>
                <a
                  href={CHERRIES_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>012 77604444</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
