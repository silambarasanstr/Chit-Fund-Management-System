import React from "react";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className="p-8 text-center bg-white border rounded-lg">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white border rounded-lg">
        No Data Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-left">#</th>

            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-3 text-sm font-semibold text-left"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">{index + 1}</td>

              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-4 py-3"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}