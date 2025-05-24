import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/Hero-section"
import { HowItWorks } from "./components/How-it-works"
import { FeaturesSection } from "./components/Features-section"
import { ChannelsSection } from "./components/Channels-section"
import { CTASection } from "./components/Cta-section"
import { Footer } from "./components/Footer"
import { ChatWidget } from "./components/Chat-widget"
import { SignInPage } from "./pages/Signin-page"
import { OnboardingPage } from "./pages/Onboarding-page"
import { PlatformShowcase } from "./components/Platform-showcase"

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <HeroSection />
        <HowItWorks />
        <ChannelsSection />
        <PlatformShowcase />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </Router>
  )
}

export default App
