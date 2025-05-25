import React from "react";

export function RadioGroup({ name, options, value, onChange, layout = "vertical", className = "" }) {
  const isVertical = layout === "vertical";

  return (
    <div className={`flex ${isVertical ? "flex-col space-y-2" : "flex-row flex-wrap gap-4"} ${className}`}>
      {options.map(option => {
        const id = `${name}-${option.value}`;
        const isChecked = value === option.value;

        return (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 text-[#4361EE] border-gray-300 focus:ring-[#4361EE]"
            />
            <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export function CheckboxGroup({ name, options, values = [], onChange, layout = "vertical", className = "" }) {
  const isVertical = layout === "vertical";

  const handleChange = value => {
    if (values.includes(value)) {
      onChange(values.filter(v => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div className={`flex ${isVertical ? "flex-col space-y-2" : "flex-row flex-wrap gap-4"} ${className}`}>
      {options.map(option => {
        const id = `${name}-${option.value}`;
        const isChecked = values.includes(option.value);

        return (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={id}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              className="h-4 w-4 rounded text-[#4361EE] border-gray-300 focus:ring-[#4361EE]"
            />
            <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-700">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
