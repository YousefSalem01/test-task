import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Globe, Instagram, Facebook, Phone, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";

const defaultChannels = [
  { name: "Email", icon: <Mail className="h-full w-full" />, color: "var(--color-blue)" },
  { name: "Web", icon: <Globe className="h-full w-full" />, color: "#4169e1" },
  { name: "WhatsApp", icon: <FaWhatsapp className="h-full w-full" />, color: "#25D366" },
  { name: "Instagram", icon: <Instagram className="h-full w-full" />, color: "#E1306C" },
  { name: "Facebook", icon: <Facebook className="h-full w-full" />, color: "#1877F2" },
  { name: "TikTok", icon: <FaTiktok className="h-full w-full" />, color: "#000000" },
  { name: "Voice", icon: <Phone className="h-full w-full" />, color: "#7C3AED" },
  { name: "SMS", icon: <MessageSquare className="h-full w-full" />, color: "#10B981" }
];

/**
 * A reusable component that displays channels in an orbit around a center logo
 *
 * @param {Object} props
 * @param {Array} [props.channels] - Custom channels array (optional)
 * @param {number} [props.activeIndex] - Active channel index (optional)
 * @param {Function} [props.setActiveIndex] - Function to set active index (optional)
 * @param {number} [props.orbitSize=300] - Size of the orbit in pixels
 * @param {number} [props.channelSize=56] - Size of each channel icon in pixels
 * @param {number} [props.centerSize=80] - Size of the center logo in pixels
 * @param {boolean} [props.autoRotate=true] - Whether to auto-rotate the active channel
 * @param {number} [props.rotationInterval=3000] - Milliseconds between auto-rotation
 * @param {ReactNode} [props.centerContent] - Custom content for the center (optional)
 * @param {boolean} [props.showBorder=true] - Whether to show the dashed border
 */
export function ChannelOrbit({
  channels = defaultChannels,
  activeIndex: externalActiveIndex,
  setActiveIndex: externalSetActiveIndex,
  orbitSize = 300,
  channelSize = 56,
  centerSize = 80,
  autoRotate = true,
  rotationInterval = 3000,
  centerContent,
  showBorder = true,
  className = ""
}) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Use either external or internal state
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;
  const setActiveIndex = externalSetActiveIndex || setInternalActiveIndex;

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % channels.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, channels.length, rotationInterval, setActiveIndex]);

  // Track viewport width for responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive size calculations
  const getResponsiveSize = defaultSize => {
    if (viewportWidth < 640) {
      // sm breakpoint
      return defaultSize * 0.7; // 70% size on mobile
    } else if (viewportWidth < 768) {
      // md breakpoint
      return defaultSize * 0.85; // 85% size on tablet
    }
    return defaultSize;
  };

  const responsiveOrbitSize = getResponsiveSize(orbitSize);
  const responsiveChannelSize = getResponsiveSize(channelSize);
  const responsiveCenterSize = getResponsiveSize(centerSize);

  // Orbit radius is half the orbit size
  const radius = responsiveOrbitSize / 2;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ height: `${responsiveOrbitSize}px`, width: `${responsiveOrbitSize}px` }}
    >
      {showBorder && (
        <div
          className="absolute border-2 border-dashed border-gray-200 rounded-full animate-spin-slow"
          style={{ width: `${responsiveOrbitSize}px`, height: `${responsiveOrbitSize}px` }}
        ></div>
      )}

      {channels.map((channel, index) => {
        const angle = (index * (360 / channels.length) * Math.PI) / 180;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={channel.name}
            className="absolute rounded-full flex items-center justify-center cursor-pointer"
            style={{
              x: x,
              y: y,
              backgroundColor: channel.color,
              color: "white",
              width: `${responsiveChannelSize}px`,
              height: `${responsiveChannelSize}px`,
              zIndex: activeIndex === index ? 10 : 5
            }}
            animate={{
              scale: activeIndex === index ? 1.2 : 1,
              boxShadow: activeIndex === index ? "0 0 20px rgba(0, 0, 0, 0.2)" : "0 0 0 rgba(0, 0, 0, 0)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6">{channel.icon}</div>
          </motion.div>
        );
      })}

      <div
        className="absolute rounded-full bg-blue flex items-center justify-center text-white z-20"
        style={{
          width: `${responsiveCenterSize}px`,
          height: `${responsiveCenterSize}px`
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-full h-full flex items-center justify-center"
        ></motion.div>
        {centerContent || (
          <div className="absolute flex items-center justify-center">
            <span className="text-sm sm:text-base font-bold text-white">armin</span>
            <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-white to-light-blue bg-clip-text text-transparent"> 
              cx
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
