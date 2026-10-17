import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT } from "@/lib/cherries-data";
import { Users, ArrowRight, ArrowLeft } from "lucide-react";

export function ClassesSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].classes;
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="classes" className="py-16 sm:py-24 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
            <Users className="w-3.5 h-3.5 text-primary" />
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
          {t.items.map((cls, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card p-7 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                    {cls.badge}
                  </span>
                  <span className="text-xs font-bold text-primary">
                    {cls.teacher}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-foreground">
                  {cls.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cls.description}
                </p>

                <div className="pt-2 space-y-2">
                  <span className="block text-xs font-bold uppercase text-foreground/80 tracking-wider">
                    {isAr ? "محاور التركيز الرئيسية" : "Developmental Focus"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {cls.focus.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-border/60 mt-6">
                <a
                  href="#tour"
                  className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl border border-border text-xs font-bold text-foreground bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  <span>{isAr ? `طلب زيارة لفصل ${cls.name}` : `Inquire for ${cls.name}`}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
