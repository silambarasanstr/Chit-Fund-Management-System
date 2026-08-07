import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = "",
  autoComplete,
  ...props
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-xs font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`
          w-full rounded-lg border
          px-3 py-2
          text-sm
          placeholder:text-gray-400
          outline-none
          transition-all duration-200

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }

          ${
            disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-500"
              : "bg-white"
          }

          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;