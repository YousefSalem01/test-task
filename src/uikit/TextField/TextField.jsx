import React from "react";

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  id,
  required = false,
  disabled = false,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = "",
  fullWidth = false,
  size = "md"
}) {
  const uniqueId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Size styles
  const sizeStyles = {
    sm: "h-8 text-xs px-2",
    md: "h-10 text-sm px-3",
    lg: "h-12 text-base px-4"
  };

  // Base input classes
  const baseInputClasses = `
    block bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent *:
    transition-colors w-full disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? "border-red-500 text-red-500 focus:ring-red-500" : "border-gray-300 text-gray-900"}
    ${leftIcon ? "pl-9" : ""}
    ${rightIcon ? "pr-9" : ""}
    ${sizeStyles[size] || sizeStyles.md}
  `;

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label
          htmlFor={uniqueId}
          className={`block text-sm font-medium mb-1 ${error ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">{leftIcon}</div>}

        <input
          id={uniqueId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseInputClasses}
        />

        {rightIcon && (
          <div
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 ${onRightIconClick ? "cursor-pointer" : ""}`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}>{error || helperText}</p>
      )}
    </div>
  );
}
