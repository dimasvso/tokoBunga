// src/components/FormInput.jsx
import React from "react";

export default function FormInput({
  label,
  name,
  type = "text",
  variant = "default",
  options = [],
  rows = 3,
  className = "",
  ...props
}) {
  {
    const baseClasses =
      "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition";

    const variants = {
      default: "",
      inline: "bg-gray-50 border-gray-200",
      floating: "peer placeholder-transparent",
    };

    const inputClasses = `${baseClasses} ${variants[variant]} ${className}`;

    const renderInput = () => {
      switch (type) {
        case "textarea":
          return (
            <textarea
              name={name}
              rows={rows}
              className={inputClasses}
              {...props}
            />
          );

        case "select":
          return (
            <select name={name} className={inputClasses} {...props}>
              <option value="">Pilih {label}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );

        default:
          return (
            <input
              type={type}
              name={name}
              className={inputClasses}
              {...props}
            />
          );
      }
    };

    if (variant === "floating") {
      return (
        <div className="relative">
          {renderInput()}
          <label
            htmlFor={name}
            className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-rose-500 peer-focus:bg-white peer-focus:px-1"
          >
            {label}
          </label>
        </div>
      );
    }

    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        {renderInput()}
      </div>
    );
  }
}
