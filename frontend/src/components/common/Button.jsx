import { Link } from "react-router-dom";

const VARIANT_STYLES = {
  primary:
    "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800",
  secondary:
    "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:bg-indigo-200",
  danger:
    "bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:bg-rose-800",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100",
  ghost:
    "text-slate-600 hover:bg-slate-100 hover:text-slate-800 active:bg-slate-200",
};

const SIZE_STYLES = {
  sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
  md: "px-4 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-5 py-3 text-sm gap-2 rounded-xl",
};

/**
 * Button
 * Reusable button with 5 visual variants and 3 sizes. Renders as a React
 * Router <Link> when `to` is provided, otherwise as a native <button>.
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
 * - size: 'sm' | 'md' | 'lg'
 * - icon: icon component (e.g. from react-icons), rendered before children
 * - iconPosition: 'left' | 'right'
 * - fullWidth: boolean
 * - to: if set, renders as a <Link to={to}> instead of a <button>
 * - disabled, type, onClick, className, children: standard button props
 */
export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  to,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  children,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-[0.98] ${
    VARIANT_STYLES[variant]
  } ${SIZE_STYLES[size]} ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="h-4.5 w-4.5" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="h-4.5 w-4.5" />}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}
