import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({
  trigger,
  items,
  position = "bottom-right",
  isOpen: externalIsOpen,
  onToggle,
  onSelect,
  width = "auto",
  className = ""
}) {
  // Use internal state if no external control is provided
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onToggle) {
          onToggle(false);
        } else {
          setInternalIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Toggle dropdown
  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isOpen);
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  // Handle item selection
  const handleSelect = item => {
    if (onSelect) {
      onSelect(item);
    }

    // Close dropdown after selection unless explicitly controlled
    if (onToggle) {
      onToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  // Position styles
  const positionStyles = {
    "top-left": "bottom-full left-0 mb-1",
    "top-right": "bottom-full right-0 mb-1",
    "bottom-left": "top-full left-0 mt-1",
    "bottom-right": "top-full right-0 mt-1",
    "left-top": "right-full top-0 mr-1",
    "left-bottom": "right-full bottom-0 mr-1",
    "right-top": "left-full top-0 ml-1",
    "right-bottom": "left-full bottom-0 ml-1"
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Dropdown trigger */}
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute z-50 ${positionStyles[position] || positionStyles["bottom-right"]}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            style={{ width: width !== "auto" ? width : "auto" }}
          >
            <div className="bg-white rounded-md shadow-lg overflow-hidden border border-gray-200 min-w-[180px]">
              <div className="py-1">
                {items.map((item, index) => (
                  <button
                    key={item.id || index}
                    onClick={() => handleSelect(item)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    disabled={item.disabled}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
