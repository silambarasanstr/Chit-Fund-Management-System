const Select = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  valueKey = "value",
  labelKey = "label",
  className = "",
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-gray-900 border outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg ${className}`}
    >
      <option value="" className="text-gray-400">
        {placeholder}
      </option>

      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
};

export default Select;
