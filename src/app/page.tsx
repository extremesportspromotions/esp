import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import SportsCarousel from "@/components/SportsCarousel";
import ClubsMapSection from "@/components/ClubsMapSection";
import ValueProposition from "@/components/ValueProposition";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div id="top" />
      <TopBar />
      <main className="flex-1">
        <SportsCarousel />
        <Hero />
        <ClubsMapSection />
        <ValueProposition />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
