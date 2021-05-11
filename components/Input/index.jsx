const Input = ({
                   label = null,
                   id = "",
                   placehoder = "",
                   type = "text",
                   textarea = false,
                   handleChange,
                   name,
                   required = false,
                   className = "",
                   onBlur = null,
                   error = null,
                   withoutError = true,
                   value = ""
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
                    required={required}
                    name={name}
                    onChange={handleChange}
                    type={type}
                    id={id}
                    value={value || ""}
                    placeholder={placehoder}
                    className={`p-3 w-full rounded bg-white border ${className} ${
                        label && "mt-2"
                    }`}
                />
            )}
            {
                withoutError && <p className="text-red-500 h-4 text-sm mt-2">{error}</p>
            }
            {textarea && (
                <textarea
                    required={required}
                    name={name}
                    onChange={handleChange}
                    id={id}
                    rows={8}
                    className="p-3 w-full mt-2 rounded bg-white border resize-none"
                    placeholder={placehoder}
                />
            )}
        </div>
    );
};

export default Input;
