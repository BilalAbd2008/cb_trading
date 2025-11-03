import Hero from "@/components/Hero";
import About from "@/components/About";
import MarketCoverage from "@/components/MarketCoverage";
import WhyChooseUs from "@/components/WhyChooseUs";
import MemberBenefits from "@/components/MemberBenefits";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900">
      <Navbar />
      <Hero />
      <About />
      <MarketCoverage />
      <WhyChooseUs />
      <MemberBenefits />
      <Pricing />
      <Stats />
      <Testimonials />
      <Team />
      <FAQ />
      <Footer />
    </main>
  );
}
