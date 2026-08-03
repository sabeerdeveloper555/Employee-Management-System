import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineSparkles,
} from "react-icons/hi";

const menuItems = [
  {
    title: "Dashboard",
    icon: <HiOutlineHome size={20} />,
    path: "/",
  },
  {
    title: "Employees",
    icon: <HiOutlineUsers size={20} />,
    path: "/employees",
  },
  {
    title: "Add Employee",
    icon: <HiOutlineUserAdd size={20} />,
    path: "/employees/add",
  },
];

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        aria-label="Sidebar navigation"
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white/90 px-4 py-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.24)] backdrop-blur transition-transform duration-300 lg:sticky lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-3 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <HiOutlineSparkles size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-600">
              PeopleHub
            </p>
            <h1 className="text-lg font-semibold text-slate-900">HR Studio</h1>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                }`
              }
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/60 text-current">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Premium workspace</p>
          <p className="mt-1 text-sm text-slate-500">
            Manage people, roles, and growth with clarity.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;