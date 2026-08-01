import React from "react";
import { FileSearch } from "lucide-react";

const NoDataFound = ({
  colSpan = 1,
  title = "No data found",
  message = "There is no data to display.",
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FileSearch
            size={48}
            className="mb-3 text-gray-300"
            strokeWidth={1.5}
          />

          <p className="text-lg font-medium">
            {title}
          </p>

          <p className="text-sm text-gray-400">
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default NoDataFound;