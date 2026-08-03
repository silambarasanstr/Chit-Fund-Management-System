import React from "react";

const TableLoader = ({
  colSpan = 1,
  message = "Loading...",
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>

          <p className="mt-3 text-sm text-gray-500">
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default TableLoader;