/**
 * Footer
 * Minimal, unobtrusive footer for the dashboard content area.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-5 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-text-secondary sm:flex-row">
        <p>&copy; {year} EMS — Employee Management System. All rights reserved.</p>
        <p>
          Crafted with <span className="text-primary">care</span> for modern HR
          teams.
        </p>
      </div>
    </footer>
  );
}
