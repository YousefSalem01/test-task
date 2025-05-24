import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../uikit/Button/Button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import arminCxLogo from "../../assets/logos/armin-cx-logo-blue.0885e649.svg";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, height: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-3 px-4 ${isMenuOpen ? "bg-white/90 backdrop-blur-md" : ""}`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div
        className={`relative z-10 container max-w-4xl mx-auto flex items-center justify-between bg-white/90 backdrop-blur-xs rounded-full shadow-md px-4 sm:px-5 py-2 border border-white/70 transition-all duration-200 ${
          scrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={arminCxLogo || "/placeholder.svg"} alt="ArminCX Logo" className="h-6 sm:h-8 w-auto" />
          </a>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            WhatsApp
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Email
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Phone
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Social Media
          </a>
          <a href="#" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
            Features
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden md:block">
            <Button className="rounded-full text-sm ">Book a Demo</Button>
          </div>
          <div className="hidden md:block">
            <Link to="/signin" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
              Sign In
            </Link>
          </div>

          {/* Mobile menu toggle - more interactive */}
          <button
            className="flex md:hidden text-[#4361EE] p-1 rounded-full hover:bg-[#4361EE]/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              initial="rest"
              animate={isMenuOpen ? "open" : "rest"}
              variants={{
                rest: { rotate: 0 },
                open: { rotate: 180 }
              }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu - animated */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl z-40 py-4 px-6 md:hidden mt-2 mx-4 border border-gray-100"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col space-y-3 mb-6">
              <a
                href="#"
                className="text-[#6e7687] hover:text-[#4361EE] text-sm font-medium py-2 transition-colors pl-2 border-l-2 border-transparent hover:border-[#4361EE]/30"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="text-[#6e7687] hover:text-[#4361EE] text-sm font-medium py-2 transition-colors pl-2 border-l-2 border-transparent hover:border-[#4361EE]/30"
              >
                Email
              </a>
              <a
                href="#"
                className="text-[#6e7687] hover:text-[#4361EE] text-sm font-medium py-2 transition-colors pl-2 border-l-2 border-transparent hover:border-[#4361EE]/30"
              >
                Phone
              </a>
              <a
                href="#"
                className="text-[#6e7687] hover:text-[#4361EE] text-sm font-medium py-2 transition-colors pl-2 border-l-2 border-transparent hover:border-[#4361EE]/30"
              >
                Social Media
              </a>
              <a
                href="#"
                className="text-[#6e7687] hover:text-[#4361EE] text-sm font-medium py-2 transition-colors pl-2 border-l-2 border-transparent hover:border-[#4361EE]/30"
              >
                Features
              </a>
            </nav>
            <div className="flex flex-col space-y-4">
              <Button className="rounded-full w-full">Book a Demo</Button>
              <Link
                to="/signin"
                className="text-[#6e7687] hover:text-[#4361EE] text-sm font-medium text-center py-2 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
