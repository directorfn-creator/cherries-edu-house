import React, { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT } from "@/lib/cherries-data";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export function GallerySection() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].gallery;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = t.items.filter((item) => {
    if (selectedCategory === "All" || selectedCategory === "الكل") return true;
    if (selectedCategory === "Classrooms" || selectedCategory === "الفصول الدراسية") {
      return item.category === "Classrooms" || item.category === "الفصول الدراسية";
    }
    if (selectedCategory === "Outdoor Play" || selectedCategory === "اللعب الخارجي") {
      return item.category === "Outdoor Play" || item.category === "اللعب الخارجي";
    }
    if (selectedCategory === "Team" || selectedCategory === "فريق العمل") {
      return item.category === "Team" || item.category === "فريق العمل";
    }
    return true;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 border-b border-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {t.categories.map((cat, idx) => {
            const isActive =
              selectedCategory === cat ||
              (idx === 0 && (selectedCategory === "All" || selectedCategory === "الكل"));

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Real Photographs Grid with varied natural proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer rounded-3xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="500"
                  height="375"
                />

                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-3 rounded-full bg-white/90 text-foreground shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 start-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/90 text-foreground backdrop-blur-sm border border-white/60 shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    {isAr ? "كمبوند زايد ريجنسي" : "Zayed Regency"}
                  </span>
                  <span className="text-primary font-semibold">{isAr ? "تكبير" : "Enlarge"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Helpful reassurance bar */}
        <div className="mt-10 p-4 rounded-2xl bg-secondary/50 border border-border text-center text-xs text-muted-foreground">
          <span>{t.clickToEnlarge}</span>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-card rounded-3xl border border-border overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Controls */}
            <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  {filteredItems[lightboxIndex]?.category}
                </span>
                <h3 className="text-lg font-extrabold text-foreground">
                  {filteredItems[lightboxIndex]?.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-secondary text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image display */}
            <div className="relative bg-black/90 flex items-center justify-center max-h-[65vh] overflow-hidden">
              <img
                src={filteredItems[lightboxIndex]?.image}
                alt={filteredItems[lightboxIndex]?.alt}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              {/* Prev / Next controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute start-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-lg transition-transform hover:scale-110"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-black shadow-lg transition-transform hover:scale-110"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer with verified caption */}
            <div className="p-4 sm:p-5 bg-card border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-muted-foreground text-center sm:text-start leading-relaxed">
                {filteredItems[lightboxIndex]?.caption}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-muted-foreground">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <a
                  href="#tour"
                  onClick={closeLightbox}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-95 transition-all shadow-2xs"
                >
                  {isAr ? "احجز زيارة" : "Book a Tour"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
