import React from "react";

export default function IconButton({
  icon,
  onClick,
  variant = "default",
  size = "md",
  rounded = false,
  label,
  ariaLabel,
  disabled = false,
  className = ""
}) {
  // Variant styles
  const variantStyles = {
    default: "bg-[#4361EE] text-white hover:bg-[#4361EE]/90",
    primary: "bg-[#4361EE] text-white hover:bg-[#4361EE]/90",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
  };

  // Size styles
  const sizeStyles = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11"
  };

  // Shape styles
  const shapeStyles = {
    standard: "rounded-md",
    rounded: "rounded-full"
  };

  // Combined classes
  const buttonClasses = `
    inline-flex items-center justify-center
    focus:outline-none
    transition-colors duration-200
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant] || variantStyles.default}
    ${sizeStyles[size] || sizeStyles.md}
    ${rounded ? shapeStyles.rounded : shapeStyles.standard}
    ${className}
  `;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel || label || "Icon button"}
      title={label}
    >
      {icon}
    </button>
  );
}
