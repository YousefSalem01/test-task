import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../uikit/Button/Button";
import IconButton from "../../uikit/IconButton/IconButton";
import Dropdown from "../../uikit/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import arminCxLogo from "../../assets/logos/armin-cx-logo-blue.0885e649.svg";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Mobile menu items
  const menuItems = [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "social", label: "Social Media" },
    { id: "features", label: "Features" }
  ];

  const handleMenuSelect = item => {
    // Handle menu item selection
    console.log(`Selected: ${item.label}`);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-3 px-4 ${isMenuOpen ? "bg-white/90 backdrop-blur-md" : ""}`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div
        className={`relative z-10 container max-w-4xl mx-auto flex items-center justify-between bg-white/90 backdrop-blur-xs rounded-full shadow-md px-4 sm:px-5 py-2 border border-white/70 transition-all duration-200`}
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
            <Button className="rounded-full text-sm">Book a Demo</Button>
          </div>
          <div className="hidden md:block">
            <Link to="/signin" className="text-[#6e7687] hover:text-[#313131] text-sm font-medium">
              Sign In
            </Link>
          </div>

          {/* Mobile menu toggle using IconButton */}
          <div className="md:hidden">
            <IconButton
              icon={isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              className="text-blue hover:bg-blue/10"
              ariaLabel={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu using Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl z-40 py-4 px-6 md:hidden mt-2 mx-4 border border-gray-100"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-3 mb-6">
              {menuItems.map(item => (
                <a
                  key={item.id}
                  href="#"
                  className="text-gray hover:text-blue text-sm font-medium py-2 transition-colors pl-2 border-l-2 border-transparent hover:border-blue/30"
                  onClick={() => handleMenuSelect(item)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col space-y-4">
              <Button className="rounded-full w-full">Book a Demo</Button>
              <Link
                to="/signin"
                className="text-gray hover:text-blue text-sm font-medium text-center py-2 transition-colors"
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
