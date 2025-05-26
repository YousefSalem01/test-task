import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown } from "lucide-react";
import IconButton from "../../uikit/IconButton/IconButton";
import videoSrc from "../../assets/videos/hero.webm";

// Custom styles for better mobile scrolling
const customStyles = `
  .mobile-scroll-section {
    overflow-x: hidden;
  }
  
  .scroll-mt-demo {
    scroll-margin-top: 80px;
  }
  
  .mobile-highlight {
    position: relative;
  }
  
  .mobile-highlight::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-light-blue)); 
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
  }
  
  @media (max-width: 1023px) {
    .order-1 {
      order: 1;
    }
    
    .order-2 {
      order: 2;
      margin-top: 8px;
    }
  }
`;

const steps = [
  {
    id: 1,
    number: "01",
    title: "All-in-One Software",
    description: "armincx is the only E-Commerce-first Customer Experience Suite that unites all channels in one tool."
  },
  {
    id: 2,
    number: "02",
    title: "Centralized CRM",
    description: "Manage all customer interactions from all channels in one central system without data loss."
  },
  {
    id: 3,
    number: "03",
    title: "Omnichannel Inbox",
    description: "Process all customer inquiries in a unified inbox. Never switch between 3 different apps again."
  },
  {
    id: 4,
    number: "04",
    title: "Superior Artificial Intelligence",
    description:
      "Train a central AI that uses your knowledge across platforms and can perfectly answer any product question through integration with your tech stack."
  },
  {
    id: 5,
    number: "05",
    title: "Automations",
    description: "Create cross-channel automations for seamless customer experiences across all platforms."
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const demoCardRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Function to scroll to demo card when a step is clicked on mobile
  const handleStepClick = stepId => {
    setActiveStep(stepId);

    // On mobile, scroll to the demo card
    if (isMobile && demoCardRef.current) {
      setTimeout(() => {
        demoCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  // Function to toggle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-16 bg-white mobile-scroll-section">
      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#313131]">Say Goodbye to Gorgias, Zendesk and Others</h2>
          <p className="mt-4 text-lg text-[#6e7687] max-w-2xl mx-auto">
            armincx completely replaces your old ticketing tool.
          </p>
        </div>

        {/* Mobile and Desktop layout wrapper */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
          {/* Steps section - Same for both layouts */}
          <div className="space-y-4 order-1">
            {steps.map(step => (
              <motion.div
                key={step.id}
                className={`rounded-xl p-6 cursor-pointer transition-all ${
                  activeStep === step.id
                    ? `bg-white shadow-md border border-gray-100 ${isMobile ? "mobile-highlight" : ""}`
                    : "bg-gray-50 hover:bg-gray-100/80"
                }`}
                onClick={() => handleStepClick(step.id)}
                whileHover={{ scale: activeStep === step.id ? 1 : 1.02 }}
              >
                <div className="flex items-start gap-4">
                    <div className={`text-lg font-medium ${activeStep === step.id ? "text-blue" : "text-gray-400"}`}> 
                    {step.number}.
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-medium ${activeStep === step.id ? "text-black" : "text-gray-400"}`} 
                    >
                      {step.title}
                    </h3>
                    <div className="h-auto overflow-hidden">
                      <AnimatePresence initial={false}>
                        {activeStep === step.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 text-gray" 
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Indicate that clicking will show more on mobile */}
                  <div className="lg:hidden">
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${activeStep === step.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Mobile scroll indicator */}
            <div className="flex justify-center lg:hidden mt-4">
              <motion.div
                className="flex items-center text-blue text-sm" 
                initial={{ y: 0 }}
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => demoCardRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                <ChevronDown size={16} className="mr-1" />
                <span>View demo</span>
              </motion.div>
            </div>
          </div>

          {/* Demo/Video card - Same for both layouts but positioned differently */}
          <div
            ref={demoCardRef}
            className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue to-light-blue h-[500px] order-2 scroll-mt-demo" 
          >
            {/* Video background */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay={isPlaying}
              muted
              loop
              playsInline
              src={videoSrc}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue/20 to-light-blue/30"></div>

            {/* Video controls */}
            <div className="absolute bottom-4 left-4">
              <IconButton
                icon={isPlaying ? <Pause size={20} /> : <Play size={20} />}
                onClick={togglePlay}
                variant="ghost"
                size="lg"
                rounded
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                ariaLabel={isPlaying ? "Pause video" : "Play video"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
