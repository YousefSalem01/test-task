import React from "react";
import { motion } from "framer-motion";

export function Tabs({ tabs, activeTab, onChange, variant = "underline", className = "" }) {
  // Variant styles
  const variants = {
    underline: {
      container: "flex border-b border-gray-200",
      tab: "px-4 py-2 text-sm font-medium",
      active: "text-blue border-b-2 border-blue", 
      inactive: "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
    },
    pills: {
      container: "flex space-x-1",
      tab: "px-3 py-2 text-sm font-medium rounded-full",
      active: "bg-blue text-white",
      inactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-gray-50"
    },
    boxed: {
      container: "flex",
      tab: "px-4 py-2 text-sm font-medium border-t border-l border-r",
      active: "bg-white text-blue border-gray-200 rounded-t-lg",
      inactive: "bg-gray-50 text-gray-500 hover:text-gray-700 border-transparent"
    }
  };

  const selectedVariant = variants[variant] || variants.underline;

  return (
    <div className={`w-full ${className}`}>
      <nav className={selectedVariant.container}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              ${selectedVariant.tab}
              ${activeTab === tab.id ? selectedVariant.active : selectedVariant.inactive}
              transition-colors duration-200 focus:outline-none
            `}
          >
            <div className="flex items-center">
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </div>

            {variant === "underline" && activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue"
                layoutId="underline"
                initial={false}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function TabPanel({ children, value, activeValue, className = "" }) {
  if (value !== activeValue) return null;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
