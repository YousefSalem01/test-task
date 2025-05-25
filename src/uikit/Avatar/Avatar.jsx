import React from "react";

export default function Avatar({
  src,
  alt,
  initials,
  icon,
  size = "md",
  color = "#4361EE",
  shape = "circle",
  className = ""
}) {
  // Size styles
  const sizeStyles = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl"
  };

  // Shape styles
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-md"
  };

  // Combined classes
  const classes = `
    flex items-center justify-center
    ${sizeStyles[size] || sizeStyles.md}
    ${shapeStyles[shape] || shapeStyles.circle}
    ${className}
  `;

  // Render avatar based on provided props with priority: src > icon > initials
  if (src) {
    return (
      <div className={classes} style={{ backgroundColor: color }}>
        <img
          src={src}
          alt={alt || "Avatar"}
          className={`w-full h-full object-cover ${shapeStyles[shape] || shapeStyles.circle}`}
        />
      </div>
    );
  }

  if (icon) {
    return (
      <div className={classes} style={{ backgroundColor: color }}>
        {icon}
      </div>
    );
  }

  // Default to initials
  return (
    <div className={`${classes} font-medium`} style={{ backgroundColor: color }}>
      {initials ? initials.slice(0, 2).toUpperCase() : ""}
    </div>
  );
}
