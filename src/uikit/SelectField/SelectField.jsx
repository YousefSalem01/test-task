import React from "react";
import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  options,
  value,
  onChange,
  multiple = false,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  className = ""
}) {
  const uniqueId = `select-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = event => {
    if (multiple) {
      // For multiple selection, get all selected options
      const selectedValues = Array.from(event.target.selectedOptions).map(option => option.value);
      onChange(selectedValues);
    } else {
      // For single selection, get the selected value
      onChange(event.target.value);
    }
  };

  return (
    <div className={className}>
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
        <select
          id={uniqueId}
          value={value}
          onChange={handleChange}
          multiple={multiple}
          disabled={disabled}
          className={`
            block w-full px-3 py-2 bg-white border rounded-lg appearance-none
            focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent *:
            transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500 text-red-500 focus:ring-red-500" : "border-gray-300 text-gray-900"}
            ${multiple ? "h-auto min-h-[80px]" : "h-10"}
          `}
        >
          {placeholder && !multiple && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {!multiple && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDown size={18} />
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p className={`mt-1 text-xs ${error ? "text-red-500" : "text-gray-500"}`}>{error || helperText}</p>
      )}
    </div>
  );
}
