import { Navbar } from "./components/Navbar/Navbar";
import { HowItWorks } from "./components/HowItWorks/HowItWorks";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection/FeaturesSection";
import { ChannelsSection } from "./components/ChannelsSection/ChannelsSection";
import { CTASection } from "./components/CtaSection/CtaSection";
import { Footer } from "./components/Footer/Footer";
import { ChatWidget } from "./components/ChatWidget/ChatWidget";
import { PlatformShowcase } from "./components/PlatformShowcase/PlatformShowcase";
import { TestimonialsSection } from "./components/TestimonialsSection/TestimonialsSection";
import AppRoutes from "./routes/AppRoutes";

export function HomePage() {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar />
			<main className='flex-1 pt-16'>
				<HeroSection />
				<HowItWorks />
				<ChannelsSection />
				<PlatformShowcase />
				<FeaturesSection />
				<TestimonialsSection />
				<CTASection />
			</main>
			<Footer />
			<ChatWidget />
		</div>
	);
}

function App() {
	return <AppRoutes />;
}

export default App;
