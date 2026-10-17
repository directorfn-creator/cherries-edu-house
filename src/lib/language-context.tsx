import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  dir: "ltr",
  isAr: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Check saved preference or URL param if available in browser
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cherries_lang") as Language | null;
      if (saved === "en" || saved === "ar") {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("cherries_lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", lang);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir: language === "ar" ? "rtl" : "ltr",
        isAr: language === "ar",
      }}
    >
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
