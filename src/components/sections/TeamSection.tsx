import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT, REAL_CHERRIES_PHOTOS } from "@/lib/cherries-data";
import { Users, Sparkles, MapPin } from "lucide-react";

export function TeamSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].team;

  return (
    <section id="team" className="py-16 sm:py-24 bg-card/30 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-foreground">
            <Users className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.subtitle}</p>
          <p className="text-xs text-muted-foreground/80 italic">{t.note}</p>
        </div>

        {/* Real Team Garden Photo Banner */}
        <div className="mb-14 rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Real photo frame */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden aspect-16/10 relative bg-muted border border-border/50">
              <img
                src={REAL_CHERRIES_PHOTOS.teamGathering}
                alt={
                  isAr
                    ? "معلمات وفريق عمل Cherries Edu House في الحديقة"
                    : "Cherries Edu House team together in outdoor garden"
                }
                className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-500"
                loading="lazy"
                width="700"
                height="440"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 start-3 text-white text-xs font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>
                  {isAr
                    ? "حديقة حضانة تشيريز • كمبوند زايد ريجنسي"
                    : "Cherries Edu House Garden • Zayed Regency"}
                </span>
              </div>
            </div>

            {/* Explanatory text */}
            <div className="lg:col-span-5 space-y-3.5 p-2 sm:p-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground border border-border">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>{isAr ? "صورة الفريق المعتمدة" : "Verified Team Photograph"}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
                {t.teamPhotoTitle}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">{t.teamPhotoDesc}</p>

              <div className="pt-2">
                <a
                  href="#tour"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:brightness-95 transition-all shadow-2xs"
                >
                  <span>{isAr ? "قابل فريقنا خلال جولة الحضانة" : "Meet Our Team in Person"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmed Teaching Team cards (Names & roles preserved without composite inventions) */}
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
                <h3 className="font-extrabold text-lg text-foreground">{member.name}</h3>
                <p className="text-xs font-bold text-primary">{member.role}</p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
