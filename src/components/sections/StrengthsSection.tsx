import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT } from "@/lib/cherries-data";
import { Sparkles, CheckCircle } from "lucide-react";

export function StrengthsSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].strengths;

  return (
    <section id="about" className="py-16 sm:py-20 bg-card/40 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 border-t border-border/40 mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isAr ? "ميزة موثقة" : "Verified Strength"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
