import { cn } from "../lib/utils";

function Button({
  children = "Submit",
  type = "button",
  className = "",

  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "bg-linear-to-r from-emerald-400 via-cyan-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgba(20,184,166,0.30)] hover:scale-[1.02] cursor-pointer transition-all duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
