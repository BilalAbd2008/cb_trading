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
import LeadMagnet from "@/components/LeadMagnet";
import Newsletter from "@/components/Newsletter";
import StickyJoinButton from "@/components/StickyJoinButton";
import Blog from "@/components/Blog";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900">
      <Navbar />
      <Hero />
      <About />
      <MarketCoverage />
      <WhyChooseUs />
      <MemberBenefits />
      <Stats />
      <Pricing />
      <Testimonials />
      <Team />
      <Blog />
      <LeadMagnet />
      <div id="newsletter">
        <Newsletter />
      </div>
      <FAQ />
      <Footer />
      <StickyJoinButton />
    </main>
  );
}
