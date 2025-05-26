import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, BarChart2, Activity, Database, Workflow } from "lucide-react";
import { Tabs, TabPanel } from "../../uikit/Tabs/Tabs";
import analyticsBg from "../../assets/images/mfU1wWLPqiuIzGvQIpYIatOw.avif";
import dashboardBg from "../../assets/images/5VUhwLllRxiNKV9aWLUxK7Zprgc.avif";

// Custom styles
const customStyles = `
	.tab-active {
		box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
	}
	
	.indicator-active {
		background: linear-gradient(to right, var(--color-blue), var(--color-light-blue)); 
	}
	
	@media (max-width: 640px) {
		.mobile-tabs-container {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			-ms-overflow-style: none;
		}
		
		.mobile-tabs-container::-webkit-scrollbar {
			display: none;
		}
		
		.mobile-showcase {
			height: 300px !important;
		}
		
		.mobile-image {
			object-fit: contain !important;
			object-position: center top !important;
		}
	}
	
	@media (max-width: 480px) {
		.mobile-showcase {
			height: 250px !important;
		}
	}
`;

const tabs = [
  {
    id: "playground",
    label: "Playground",
    icon: <Gamepad2 size={18} />,
    image: dashboardBg
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart2 size={18} />,
    image: analyticsBg
  },
  {
    id: "activity",
    label: "Activity",
    icon: <Activity size={18} />,
    image: dashboardBg
  },
  {
    id: "sources",
    label: "Sources",
    icon: <Database size={18} />,
    image: analyticsBg
  },
  {
    id: "actions",
    label: "Actions",
    icon: <Workflow size={18} />,
    image: dashboardBg
  }
];

export function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState("playground");
  const [autoRotate, setAutoRotate] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const imagesRef = useRef({});
  const tabsContainerRef = useRef(null);

  // Preload all images
  useEffect(() => {
    tabs.forEach(tab => {
      const img = new Image();
      img.src = tab.image;
      img.onload = () => {
        setImagesLoaded(prev => ({
          ...prev,
          [tab.id]: true
        }));
      };
      imagesRef.current[tab.id] = img;
    });
  }, []);

  // Auto-rotate tabs
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab, autoRotate]);

  // Pause auto-rotation when user interacts with tabs
  const handleTabClick = tabId => {
    setActiveTab(tabId);
    setAutoRotate(false);

    // Scroll active tab into view on mobile
    if (tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-tab="${tabId}"]`);
      if (activeTabElement) {
        const containerRect = tabsContainerRef.current.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();
        const scrollLeft = tabRect.left - containerRect.left - (containerRect.width - tabRect.width) / 2;

        tabsContainerRef.current.scrollTo({
          left: scrollLeft + tabsContainerRef.current.scrollLeft,
          behavior: "smooth"
        });
      }
    }

    // Resume auto-rotation after 15 seconds of inactivity
    setTimeout(() => {
      setAutoRotate(true);
    }, 15000);
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-[#0f0f0f]">
      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue/20 via-blue/10 to-light-blue/20 opacity-80"></div> 

      {/* Hidden div to preload images */}
      <div className="hidden">
        {tabs.map(tab => (
          <img key={tab.id} src={tab.image || "/placeholder.svg"} alt="" />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-sm text-white/90 mb-4">
            <span className="mr-2">✨</span>
            <span>Explore</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Discover the <span className="text-blue">armin</span>
            <span className="bg-gradient-to-r from-blue to-light-blue bg-clip-text text-transparent">cx</span>{" "}
            platform
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Our comprehensive platform provides all the tools you need to build, deploy, and optimize your AI agents
          </p>
        </div>

        {/* Tabs - mobile optimized */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div
            ref={tabsContainerRef}
            className="mobile-tabs-container inline-flex bg-black/30 rounded-full p-1.5 max-w-full"
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-blue tab-active" 
                    : "text-white hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image showcase - responsive height and improved mobile display */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-blue/20 shadow-2xl bg-black mobile-showcase">  
          {/* Colored background glow */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/5 via-blue/10 to-light-blue/10 opacity-100"></div> 
            <div className="absolute -inset-10 bg-blue/5 blur-3xl rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Browser window frame */}
          <div className="absolute inset-x-0 top-0 h-6 sm:h-8 md:h-10 bg-[#111]/80 border-b border-white/10 rounded-t-2xl flex items-center px-3 sm:px-4 z-20">
            <div className="flex space-x-1 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-[#FF6B35]/80"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-[#FFBE0B]/80"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-[#1FB7DD]/80"></div>  
            </div>
          </div>

          {/* Images */}
          <AnimatePresence mode="wait">
            {tabs.map(
              tab =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pt-6 sm:pt-8 md:pt-10"
                  >
                    <div className="w-full h-full rounded-b-2xl overflow-hidden bg-gray-900">
                      <img
                        src={tab.image || "/placeholder.svg"}
                        alt={tab.label}
                        className="w-full h-full object-contain sm:object-cover mobile-image"
                        loading="eager"
                      />
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicators - simplified for mobile */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <div className="flex space-x-2 sm:space-x-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`rounded-full transition-all duration-300 h-1.5 sm:h-2 md:h-2.5 ${
                  activeTab === tab.id
                    ? "w-6 sm:w-8 md:w-10 indicator-active"
                    : "w-1.5 sm:w-2 md:w-2.5 bg-white/20 hover:bg-white/30"
                }`}
                aria-label={`Switch to ${tab.label} tab`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
