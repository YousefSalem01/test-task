import { Navbar } from "./components/Navbar";
import { HowItWorks } from "./components/HowItWorks";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ChannelsSection } from "./components/ChannelsSection";
import { CTASection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";
import { PlatformShowcase } from "./components/PlatformShowcase";
import { TestimonialsSection } from "./components/TestimonialsSection";
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
