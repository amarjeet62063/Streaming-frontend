import { cn } from "../lib/utils";

function Input({
  label = "Input",
  placeholder = "Enter text...",
  type = "text",
  className = "bg-gray-200",
  htmlFor = " ",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium  pl-2">
        {label}
      </label>
      <input
        autoComplete="on"
        autoSave="string"
        type={type}
        placeholder={placeholder}
        className={cn(
          "px-3 py-2 rounded-lg   outline-none  duration-200 border border-gray-400 w-full ",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export default Input;
