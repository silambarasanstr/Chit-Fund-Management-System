import React from "react";
import { Search, X } from "lucide-react";

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  showClear = true,
}) => {
  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      {/* Search Icon */}
      <Search
        size={15}
        className="absolute -translate-y-1/2 pointer-events-none left-3 top-1/2"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-10 text-sm text-gray-700 transition-all duration-200 bg-white border border-gray-200 shadow-sm outline-none placeholder:text-gray-400 rounded-xl hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      {/* Clear Button */}
      {showClear && value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute flex items-center justify-center w-6 h-6 text-gray-400 transition-all -translate-y-1/2 rounded-full right-3 top-1/2 hover:bg-red-50 hover:text-red-500"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;