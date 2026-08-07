const RowsPerPage = ({
  value,
  onChange,
  options = [5, 10, 20, 50, 100],
}) => {
  return (
    <div className="flex items-center gap-3 pt-4">
      <span className="text-sm font-medium text-gray-600">
        Rows
      </span>

      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 min-w-[80px] rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RowsPerPage;