import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT } from "@/lib/cherries-data";
import { Compass, Eye, ShieldCheck } from "lucide-react";

export function SpacesSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].spaces;

  return (
    <section id="environment" className="py-16 sm:py-24 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
            <Compass className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.subtitle}</p>
        </div>

        {/* 4 Cards Grid with Real Nursery Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="600"
                  height="375"
                />

                {/* Subtle gradient overlay at bottom of image for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3.5 start-3.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-foreground backdrop-blur-sm shadow-xs border border-white/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    {item.category}
                  </span>
                </div>

                {/* Real photo indicator */}
                <div className="absolute bottom-3 start-3.5 end-3.5 text-white/90 text-xs font-medium flex items-center justify-between">
                  <span className="drop-shadow-xs">{item.title}</span>
                  <a
                    href="#gallery"
                    className="inline-flex items-center gap-1 text-[11px] bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs text-white"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{isAr ? "تكبير" : "View"}</span>
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{isAr ? "كمبوند زايد ريجنسي" : "Zayed Regency Compound"}</span>
                  <a href="#tour" className="text-primary font-bold hover:underline">
                    {isAr ? "طلب معاينة المكان" : "Request a Tour"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
