export default function InputSelect({
  defaultValue = "",
  label = null,
  handleChange = null,
  options = [],
  name = "",
  id = "",
  placeholder = null,
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-gray-700 text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        defaultValue={defaultValue}
        name={name}
        id={id}
        onChange={(e) => {
          handleChange ? handleChange(e) : null;
        }}
        className={`relative w-full py-3 px-4 border mt-2 bg-white rounded focus:outline-none select appearance-none`}
      >
        {placeholder && <option value={""}>{placeholder}</option>}
        {options.map((option, i) => (
          <option key={i} value={option.attributes?.iso_name}>
            {option.attributes?.name}
          </option>
        ))}
      </select>
    </div>
  );
}
