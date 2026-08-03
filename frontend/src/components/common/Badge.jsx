const VARIANT_STYLES = {
  success: "bg-emerald-50 text-emerald-700",
  danger: "bg-red-50 text-red-700",
  warning: "bg-amber-50 text-amber-700",
  primary: "bg-indigo-50 text-indigo-700",
  neutral: "bg-slate-100 text-slate-600",
};

const DOT_STYLES = {
  success: "bg-emerald-500",
  danger: "bg-red-500",
  warning: "bg-amber-500",
  primary: "bg-indigo-500",
  neutral: "bg-slate-400",
};

/**
 * Badge
 * Small status pill, e.g. Active / Inactive employee status.
 *
 * Props:
 * - variant: 'success' | 'danger' | 'warning' | 'primary' | 'neutral'
 * - dot: shows a small leading status dot
 */
export default function Badge({ variant = "neutral", dot = true, children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANT_STYLES[variant]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[variant]}`} />}
      {children}
    </span>
  );
}
