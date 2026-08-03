/**
 * Card
 * Base surface for grouped content — stat cards, tables, forms, etc.
 */
export default function Card({
  hover = false,
  padded = true,
  className = "",
  children,
  ...rest
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-200 ${
        hover ? "hover:-translate-y-1 hover:shadow-lg" : ""
      } ${padded ? "p-5 sm:p-6" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
