const Input = ({
  label = null,
  id = "",
  placehoder = "",
  type = "text",
  textarea = false,
  handleChange,
  name,
  required = false,
  defaultValue = "",
  className = "",
  onBlur = null,
  error = null,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-gray-700 text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      {!textarea && (
        <input
          onBlur={(e) => {
            onBlur ? onBlur(e) : null;
          }}
          defaultValue={defaultValue || ""}
          required={required}
          name={name}
          onChange={handleChange}
          type={type}
          id={id}
          placeholder={placehoder}
          className={`p-3 w-full rounded bg-white border ${className} ${
            label && "mt-2"
          }`}
        />
      )}
      {/* <div className="h-2">{error && error()}</div> */}
      <p className="text-red-500 h-4 text-sm mt-2">{error}</p>
      {textarea && (
        <textarea
          required={required}
          name={name}
          onChange={handleChange}
          id={id}
          rows={8}
          className="p-3 w-full mt-2 rounded bg-white border resize-none"
          placeholder={placehoder}
        ></textarea>
      )}
    </div>
  );
};

export default Input;
