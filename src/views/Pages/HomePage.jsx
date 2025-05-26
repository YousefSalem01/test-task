import { ChannelsSection } from "../../components/ChannelsSection/ChannelsSection";
import { ChatWidget } from "../../components/ChatWidget/ChatWidget";
import { CTASection } from "../../components/CtaSection/CtaSection";
import { FeaturesSection } from "../../components/FeaturesSection/FeaturesSection";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { HowItWorks } from "../../components/HowItWorks/HowItWorks";
import { Navbar } from "../../components/Navbar/Navbar";
import { PlatformShowcase } from "../../components/PlatformShowcase/PlatformShowcase";
import { TestimonialsSection } from "../../components/TestimonialsSection/TestimonialsSection";

export function HomePage() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <HeroSection />
          <HowItWorks />
          <ChannelsSection/>
          <PlatformShowcase/>
          <FeaturesSection/>
          <TestimonialsSection/>
          <CTASection/>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }