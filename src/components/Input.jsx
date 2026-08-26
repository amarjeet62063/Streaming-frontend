function Input({
  label = "Input",
  placeholder = "Enter text...",
  type = "text",
  className = "bg-gray-200",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="mb-1 block text-sm font-medium text-gray-700 pl-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-lg  text-black outline-none focus:bg-gray-50 duration-200 border border-gray-400 w-full ${className || ''}`}
        {...props}
      />
    </div>
  );
}

export default Input;
