import React from "react";
import { Filter } from "lucide-react";

const StatusFilter = ({
  value,
  onChange,
  options = [],
  label = "Status",
  className = "",
}) => {
  return (
    <div
  className={`flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm ${className}`}
>
  <span className="text-sm font-medium text-gray-600">
    {label}
  </span>

  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="min-w-[120px] rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  >
    <option value="">All</option>

    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>
  );
};

export default StatusFilter;