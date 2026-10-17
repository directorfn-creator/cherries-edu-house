import React from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT, CHERRIES_BANNER_URL } from "@/lib/cherries-data";
import { Building2, ArrowRight, ArrowLeft } from "lucide-react";

export function SpacesSection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].spaces;
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section id="environment" className="py-16 sm:py-24 bg-card/30 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-foreground">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((space, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 start-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                  {space.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-base text-foreground leading-snug">
                    {space.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {space.desc}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-semibold text-primary">
                  {isAr ? "بيئة واقعية معتمدة" : "Verified Nursery Space"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Official Banner Card */}
        <div className="mt-12 rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 rounded-2xl overflow-hidden border border-border/60 bg-muted">
              <img
                src={CHERRIES_BANNER_URL}
                alt="Cherries Edu House Facebook Banner"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="md:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isAr ? "الهوية البصرية الرسمية" : "Official Visual Identity"}
              </span>
              <h3 className="text-xl font-bold text-foreground">
                {isAr ? "تصميم يعكس قيم الحضانة وطاقتها الهادئة" : "Calm, welcoming botanical harmony"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isAr
                  ? "درجات الأخضر الطبيعي والخلفيات العاجية الدافئة المستوحاة من الشعار الرسمي تعكس بيئة آمنة تمنح الأطفال راحة نفسية وفضولاً للاستكشاف."
                  : "Fresh lime and warm ivory tones derived from the official logo reflect a balanced environment providing emotional safety and natural wonder."}
              </p>
              <a
                href="#tour"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
              >
                <span>{isAr ? "شاهد البيئة بنفسك في الزيارة" : "Experience it in person"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
