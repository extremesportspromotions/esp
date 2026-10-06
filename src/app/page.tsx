import TopBar from "@/components/TopBar";
import SportsCarousel from "@/components/SportsCarousel";
import { BrandLogo, BrandPickLine } from "@/components/BrandTitle";
import ClubsMapSection from "@/components/ClubsMapSection";
import ValueProposition from "@/components/ValueProposition";
import HowItWorks from "@/components/HowItWorks";
import LatestGuides from "@/components/LatestGuides";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="flex-1">
        <BrandLogo />
        <SportsCarousel />
        <BrandPickLine />
        <ClubsMapSection />
        <LatestGuides />
        <ValueProposition />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
