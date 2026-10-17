import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_LOGO_URL, CHERRIES_INFO, CHERRIES_CONTENT } from "@/lib/cherries-data";
import { Phone, MessageCircle, MapPin, Globe, Menu, X, Calendar } from "lucide-react";

export function Header() {
  const { language, setLanguage, isAr } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = CHERRIES_CONTENT[language];

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#classes", label: t.nav.classes },
    { href: "#environment", label: t.nav.environment },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#approach", label: t.nav.approach },
    { href: "#team", label: t.nav.team },
    { href: "#faqs", label: t.nav.faqs },
    { href: "#location", label: t.nav.location },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-secondary/70 border-b border-border/40 py-1.5 px-4 text-xs font-medium text-muted-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-foreground/80 font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {isAr ? "زايد ريجنسي، الشيخ زايد" : "Zayed Regency, Sheikh Zayed"}
            </span>
            <span className="hidden sm:inline text-muted-foreground/60">•</span>
            <a
              href={CHERRIES_INFO.phoneCall}
              className="hidden sm:flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span dir="ltr">{CHERRIES_INFO.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 ms-auto">
            <a
              href={CHERRIES_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              <span>WhatsApp</span>
            </a>
            <span className="text-muted-foreground/40">|</span>
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-card hover:bg-accent text-foreground text-xs font-bold transition-all shadow-2xs"
              aria-label="Change language"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official Cherries Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-hidden">
          <div className="relative h-14 w-14 rounded-2xl p-1 bg-white shadow-xs border border-border/50 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <img
              src={CHERRIES_LOGO_URL}
              alt="Cherries Edu House Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground leading-tight">
              Cherries Edu House
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              {isAr ? "كمبوند زايد ريجنسي" : "Zayed Regency • Nursery"}
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors hover:underline decoration-primary decoration-2 underline-offset-8"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={CHERRIES_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-border bg-card text-foreground hover:bg-accent hover:border-primary/40 transition-all shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            <span>{t.nav.chatWithUs}</span>
          </a>

          <a
            href="#tour"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:brightness-95 transition-all shadow-xs hover:shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.nav.bookTour}</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-border">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href="#tour"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-primary text-primary-foreground shadow-xs text-center"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookTour}</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={CHERRIES_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border text-xs font-semibold text-foreground bg-background"
              >
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                <span>{t.nav.chatWithUs}</span>
              </a>
              <a
                href={CHERRIES_INFO.phoneCall}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border text-xs font-semibold text-foreground bg-background"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>{t.nav.callUs}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setLanguage(language === "en" ? "ar" : "en");
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border text-xs font-bold text-foreground bg-secondary/50"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{language === "en" ? "تبديل إلى العربية (RTL)" : "Switch to English"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
