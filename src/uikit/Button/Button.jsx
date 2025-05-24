import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

// Base button styles that apply to all buttons
const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

// Style variants
const variantStyles = {
  default: "bg-[#4361EE] text-white hover:bg-[#4361EE]/90",
  destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
  outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
  ghost: "hover:bg-slate-100 hover:text-slate-900",
  link: "text-slate-900 underline-offset-4 hover:underline",
};

// Size variants
const sizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef(({ 
  className = "", 
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  // Use Slot component if asChild is true, otherwise use a standard button
  const Comp = asChild ? Slot : "button";
  
  // Combine all class names
  const combinedClasses = [
    baseStyles,
    variantStyles[variant] || variantStyles.default,
    sizeStyles[size] || sizeStyles.default,
    className
  ].filter(Boolean).join(" ");
  
  return <Comp className={combinedClasses} ref={ref} {...props} />;
});

Button.displayName = "Button";

export { Button };
