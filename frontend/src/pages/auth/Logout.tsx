import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hook/auth-hook";

export default function Logout() {
  const { logout, loggedInUser } = useAuth();
  const navigate = useNavigate();

  const rolePrefix = loggedInUser?.role ? `/${loggedInUser.role}` : "/admin";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCancel = () => {
    navigate(rolePrefix);
  };

  const buttonClass = useMemo(
    () =>
      "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150",
    [],
  );

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 shadow-2xl shadow-slate-900/15">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Confirm Logout
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to log out? Click Logout to end your session or
          Cancel to return to the dashboard.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className={`${buttonClass} bg-slate-100 text-slate-700 hover:bg-slate-200`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className={`${buttonClass} bg-rose-600 text-white hover:bg-rose-700`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
