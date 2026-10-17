import React from "react";
import { useLanguage } from "@/lib/language-context";
import {
  CHERRIES_CONTENT,
  CHERRIES_INFO,
  CHERRIES_LOGO_URL,
  REAL_CHERRIES_PHOTOS,
} from "@/lib/cherries-data";
import {
  CalendarCheck,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language];
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-border/50">
      {/* Soft background ambient glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-60">
        <div className="absolute -top-32 start-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -start-40 w-96 h-96 bg-accent/40 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text and CTAs column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{t.hero.tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.12]">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              {t.hero.supporting}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#tour"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:brightness-95 transition-all shadow-md shadow-primary/20 hover:scale-[1.01]"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>{t.hero.bookTourCta}</span>
              </a>

              <a
                href={CHERRIES_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border bg-card text-foreground font-bold text-sm sm:text-base hover:bg-accent hover:border-primary/50 transition-all shadow-2xs"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>{t.hero.chatCta}</span>
              </a>

              <a
                href="#gallery"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{t.hero.exploreCta}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Quick confirmed nursery facts */}
            <div className="pt-6 border-t border-border/80 grid grid-cols-3 gap-3">
              {t.hero.quickFacts.map((fact, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="block text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {fact.label}
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real Nursery Photograph in Hero */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-3 bg-card border border-border shadow-xl shadow-primary/5">
              {/* Main Real Photo: Children laughing and seated in Cherries classroom */}
              <div className="overflow-hidden rounded-2xl aspect-4/3 relative bg-muted">
                <img
                  src={REAL_CHERRIES_PHOTOS.classroomActivity}
                  alt={
                    isAr
                      ? "أطفال حضانة تشيريز في الفصل الدراسي"
                      : "Real classroom moment at Cherries Edu House"
                  }
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  width="800"
                  height="600"
                />

                {/* Subtle soft gradient overlay on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Real Cherries Verified Badge */}
                <div className="absolute top-3.5 start-3.5 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-md border border-white/60 flex items-center gap-2.5">
                  <img
                    src={CHERRIES_LOGO_URL}
                    alt="Cherries Edu House Logo"
                    className="w-9 h-9 object-contain"
                  />
                  <div className="pe-2">
                    <span className="block text-xs font-bold text-foreground leading-tight">
                      Cherries Edu House
                    </span>
                    <span className="block text-[10px] text-muted-foreground">
                      {isAr ? "الشيخ زايد • زايد ريجنسي" : "Sheikh Zayed • Zayed Regency"}
                    </span>
                  </div>
                </div>

                {/* Bottom caption with real context */}
                <div className="absolute bottom-3.5 start-3.5 end-3.5 text-white">
                  <p className="text-xs font-medium text-white/95 drop-shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{t.hero.heroImageCaption}</span>
                  </p>
                </div>
              </div>

              {/* Real outdoor play snippet card below */}
              <div className="mt-3 p-3 rounded-2xl bg-secondary/80 border border-border flex items-center gap-3">
                <img
                  src={REAL_CHERRIES_PHOTOS.outdoorPlay}
                  alt={
                    isAr ? "لعب خارجي للأطفال في حديقة الحضانة" : "Outdoor garden play at Cherries"
                  }
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-border"
                  loading="lazy"
                  width="56"
                  height="56"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">
                      {isAr ? "حديقة خضراء آمنة وزيارات خاصة" : "Private garden & confirmed visits"}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {isAr ? "كمبوند زايد ريجنسي المغلق" : "Quiet, gated Zayed Regency Compound"}
                  </p>
                </div>
                <a
                  href="#tour"
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:brightness-95 transition-all shadow-2xs"
                >
                  {isAr ? "احجز" : "Tour"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
