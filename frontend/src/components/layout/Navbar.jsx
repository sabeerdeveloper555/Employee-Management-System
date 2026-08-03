import { useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineBell, HiOutlineSearch } from "react-icons/hi";

const pageTitles = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/employees/add": "Add Employee",
  "/employees/edit": "Edit Employee",
};

function Navbar({ setIsOpen }) {
  const location = useLocation();
  const pathname = location.pathname.startsWith("/employees/edit")
    ? "/employees/edit"
    : location.pathname;
  const title = pageTitles[pathname] || "Overview";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open sidebar"
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 lg:hidden"
          >
            <HiOutlineMenu size={22} />
          </button>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-indigo-600">
              Employee portal
            </p>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <label className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
            <HiOutlineSearch size={18} />
            <input
              type="text"
              aria-label="Search"
              placeholder="Search"
              className="w-36 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
          >
            <HiOutlineBell size={20} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              SA
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Sabeer Alam</p>
              <p className="text-xs text-slate-500">HR Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;