import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TourBookingForm } from "@/components/TourBookingForm";
import { HeroSection } from "@/components/sections/HeroSection";
import { StrengthsSection } from "@/components/sections/StrengthsSection";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { SpacesSection } from "@/components/sections/SpacesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Cherries Edu House | Zayed Regency Nursery & Preschool",
      },
      {
        name: "description",
        content:
          "Cherries Edu House in Zayed Regency Compound, Sheikh Zayed, Egypt. Little Discoveries. Meaningful Beginnings. Book a nursery tour today.",
      },
      {
        property: "og:title",
        content: "Cherries Edu House | Zayed Regency Nursery & Preschool",
      },
      {
        property: "og:description",
        content:
          "Little Discoveries. Meaningful Beginnings. Explore our peaceful Zayed Regency nursery, meet our teachers, and book a tour.",
      },
      {
        property: "og:image",
        content:
          "https://vibe.filesafe.space/1792242112629771035/attachments/5e470fec-87ac-405d-abb6-7fefb66bc99a.png",
      },
      {
        name: "twitter:image",
        content:
          "https://vibe.filesafe.space/1792242112629771035/attachments/5e470fec-87ac-405d-abb6-7fefb66bc99a.png",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CherriesEduHousePage,
});

function CherriesEduHousePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors selection:bg-primary/30 selection:text-foreground">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <StrengthsSection />
        <ClassesSection />
        <SpacesSection />
        <GallerySection />
        <ApproachSection />
        <TeamSection />

        <section className="py-16 sm:py-24 border-b border-border/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <TourBookingForm />
          </div>
        </section>

        <FaqSection />
        <LocationSection />
      </main>

      <Footer />
    </div>
  );
}
