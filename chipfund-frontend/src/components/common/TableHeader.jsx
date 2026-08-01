export default function TableHeader({ columns }) {
  return (
    <thead className="sticky top-0 z-10 border-b bg-slate-100 border-slate-200">
      <tr className="text-left text-gray-700">
        {columns.map((column, index) => (
          <th
            key={index}
            className={`px-4 py-2.5 whitespace-nowrap ${
              column === "Actions" ? "text-center" : "text-left"
            }`}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}
