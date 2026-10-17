import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT } from "@/lib/cherries-data";
import { Users } from "lucide-react";

export function TeamSection() {
  const { language } = useLanguage();
  const t = CHERRIES_CONTENT[language].team;

  return (
    <section id="team" className="py-16 sm:py-24 bg-card/30 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-foreground">
            <Users className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-xs text-muted-foreground/80 italic">
            {t.note}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.members.map((member, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-primary/50 transition-all flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-secondary border-2 border-primary/40 flex items-center justify-center text-primary font-black text-xl shadow-xs">
                {member.initials}
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-lg text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-primary">
                  {member.role}
                </p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
