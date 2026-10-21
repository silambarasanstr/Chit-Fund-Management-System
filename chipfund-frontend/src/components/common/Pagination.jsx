import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col gap-4 pt-4 border-gray-200 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Info */}
      <p className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-gray-900">{totalPages}</span>
      </p>

      {/* Pagination */}
      <div className="flex items-center p-1 bg-white border border-gray-200 shadow-sm rounded-xl">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center text-gray-600 transition rounded-lg h-9 w-9 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pages */}
        <div className="flex items-center gap-1 px-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-all duration-200
                ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center text-gray-600 transition rounded-lg h-9 w-9 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
