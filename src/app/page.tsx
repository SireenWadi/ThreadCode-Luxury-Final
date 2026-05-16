import { HeroSection } from "@/components/features/HeroSection";
import { FeaturedProducts } from "@/components/features/FeaturedProducts";
import { BeforeAfterSection } from "@/components/features/BeforeAfterSection";
import { OccasionGrid } from "@/components/features/OccasionGrid";
import { CinematicVideoSection } from "@/components/features/CinematicVideoSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OccasionGrid />
      <CinematicVideoSection />
      <FeaturedProducts />
      <BeforeAfterSection />
    </>
  );
}
