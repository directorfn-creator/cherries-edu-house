import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT } from "@/lib/cherries-data";
import { Compass, Sparkles, Heart } from "lucide-react";

export function ApproachSection() {
  const { language } = useLanguage();
  const t = CHERRIES_CONTENT[language].approach;

  return (
    <section id="approach" className="py-16 sm:py-24 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
            <Compass className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.points.map((pt, idx) => {
            const title = "title" in pt ? pt.title : "";
            const description = "description" in pt ? pt.description : (pt as { desc?: string }).desc || "";
            return (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-card p-8 shadow-xs hover:border-primary/40 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary">
                  {idx === 0 && <Sparkles className="w-6 h-6" />}
                  {idx === 1 && <Heart className="w-6 h-6" />}
                  {idx === 2 && <Compass className="w-6 h-6" />}
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
