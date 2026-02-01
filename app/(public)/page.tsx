import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
       <FAQSection />
      <ContactSection />
    </main>
  );
}
