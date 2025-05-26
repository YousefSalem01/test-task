import React from "react";

export default function Badge({ content, variant = "primary", size = "md", dot = false, className = "" }) {
  // Variant styles (colors)
  const variantStyles = {
    primary: "bg-blue text-white", 
    secondary: "bg-gray-200 text-gray-800",
    success: "bg-green-500 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-400 text-white"
  };

  // Size styles
  const sizeStyles = {
    sm: dot ? "w-2 h-2" : "text-xs px-1.5 py-0.5 min-w-[1.25rem]",
    md: dot ? "w-2.5 h-2.5" : "text-xs px-2 py-0.5 min-w-[1.5rem]",
    lg: dot ? "w-3 h-3" : "text-sm px-2.5 py-1 min-w-[1.75rem]"
  };

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-full
    ${variantStyles[variant] || variantStyles.primary}
    ${sizeStyles[size] || sizeStyles.md}
    ${className}
  `;

  // Dot badge (no content)
  if (dot) {
    return <span className={baseClasses} aria-hidden="true"></span>;
  }

  // Content badge
  return <span className={baseClasses}>{content}</span>;
}
