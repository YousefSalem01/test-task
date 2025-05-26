import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Globe, Instagram, Facebook, Phone, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { ChannelOrbit } from "../../uikit/ChannelOrbit/ChannelOrbit";

// Define the channels for the right side info panel, matching the icons from defaultChannels
const channels = [
  { name: "Email", icon: <Mail className="h-full w-full" />, color: "var(--color-blue)" },
  { name: "Web", icon: <Globe className="h-full w-full" />, color: "#4169e1" },
  { name: "WhatsApp", icon: <FaWhatsapp className="h-full w-full" />, color: "#25D366" },
  { name: "Instagram", icon: <Instagram className="h-full w-full" />, color: "#E1306C" },
  { name: "Facebook", icon: <Facebook className="h-full w-full" />, color: "#1877F2" },
  { name: "TikTok", icon: <FaTiktok className="h-full w-full" />, color: "#000000" },
  { name: "Voice", icon: <Phone className="h-full w-full" />, color: "#7C3AED" },
  { name: "SMS", icon: <MessageSquare className="h-full w-full" />, color: "#10B981" }
];

export function ChannelsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#313131]">Omnichannel Support</h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-[#6e7687] max-w-2xl mx-auto">
            Handle customer support tickets across 8 different channels with AI-powered assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Animated channels */}
          <div className="relative h-[280px] sm:h-[320px] md:h-[400px] flex items-center justify-center">
            <ChannelOrbit
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              orbitSize={300}
              channelSize={56}
              centerSize={80}
            />
          </div>

          {/* Right side - Active channel info */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div
                  className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-full flex items-center justify-center mb-3 md:mb-4"
                  style={{ backgroundColor: channels[activeIndex].color }}
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 text-white">{channels[activeIndex].icon}</div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{channels[activeIndex].name}</h3>
                <p className="text-sm md:text-base text-[#6e7687]">
                  Connect with your customers on {channels[activeIndex].name} and provide seamless AI-powered support.
                </p>
                <div className="mt-4 md:mt-6 flex justify-center">
                  <div className="flex space-x-2">
                    {channels.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300"
                        animate={{
                          backgroundColor: idx === activeIndex ? channels[activeIndex].color : "#D1D5DB"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
