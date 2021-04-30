const Input = ({
  label = "",
  id = "",
  placehoder = "",
  type = "text",
  textarea = false,
  handleChange,
  name,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label className="text-gray-700 text-sm" htmlFor={id}>
        {label}
      </label>
      {!textarea && (
        <input
          required={required}
          name={name}
          onChange={handleChange}
          type={type}
          id={id}
          placeholder={placehoder}
          className="p-3 w-full mt-2 rounded bg-white border"
        />
      )}
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
