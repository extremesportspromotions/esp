import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import SportsCarousel from "@/components/SportsCarousel";
import ValueProposition from "@/components/ValueProposition";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="flex-1">
        <Hero />
        <SportsCarousel />
        <ValueProposition />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
