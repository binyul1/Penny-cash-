import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/hook/auth-hook";

export default function AdminLayout() {
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);
  return (
    <section className="w-full min-h-screen flex bg-slate-100">
      <aside className="w-1/4 max-w-[320px] bg-white border-r border-slate-200 px-6 py-8 flex flex-col ">
        <div className="flex flex-col items-center gap-4 pb-8 border-b border-slate-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/10">
            P
          </div>
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">
              PettyCash Pro
            </p>
            <p className="mt-2 text-xs text-slate-500">Enterprise Finance</p>
          </div>
        </div>

        <nav className="mt-8">
          <ul className="space-y-3 ">
            <li>
              <NavLink
                end
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  D
                </span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/admin/expense"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  E
                </span>
                Expense
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/admin/add-expense"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  A
                </span>
                Add Expense
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/admin/report"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  R
                </span>
                Report
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/admin/approvals"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  P
                </span>
                Approvals
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="/admin/cash-management"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  C
                </span>
                Cash Management
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto space-y-3 pt-6">
          <button className="w-full rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-700">
            + New Request
          </button>
          <NavLink
            to="/help-center"
            className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Help Center
          </NavLink>
          <NavLink
            to="/admin/logout"
            className="block rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="w-full bg-white px-6 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-slate-500 shadow-sm">
              <span className="text-base">🔍</span>
              <input
                type="search"
                placeholder="Search transactions"
                className="min-w-55 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-slate-100 p-3 text-slate-600">
                ⚙️
              </div>
              <div className="rounded-full bg-slate-100 p-3 text-slate-600">
                🔔
              </div>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">
                {loggedInUser?.image ? (
                  <img
                    src={loggedInUser.image}
                    alt={loggedInUser?.name}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                    {loggedInUser?.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {loggedInUser?.name}
                  </p>
                  <p className="text-xs text-slate-500">{loggedInUser?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative flex-1 overflow-y-auto p-6">
          <Outlet />
        </section>
      </main>
    </section>
  );
}
