/**
 * Header
 * Reusable in-page section header: title + optional subtitle + optional action slot
 * (e.g. an "Add Employee" button). Sits at the top of a page's content area,
 * below the global Navbar.
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - actions: ReactNode (optional) — buttons or controls aligned to the right
 */
export default function Header({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}
