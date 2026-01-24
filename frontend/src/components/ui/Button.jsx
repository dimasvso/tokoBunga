/* src/components/Button.jsx */
import clsx from "clsx";   
export default function Button ({
  children,
  variant = "primary",   
  size = "md",         
  className,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-rose-500 text-white hover:bg-rose-600",
    outline: "border border-rose-500 text-rose-500 hover:bg-rose-50",
    ghost: "text-rose-500 hover:bg-rose-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};