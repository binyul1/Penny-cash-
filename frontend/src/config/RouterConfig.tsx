import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layouts/AdminLayout";
import NotFoundInner from "../pages/errors/NotFoundInner";
import CheckLogin from "../components/auth/CheckLogin";
import Logout from "../pages/auth/Logout";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },

  {
    path: "/admin",
    element: (
      <CheckLogin allowed={"admin"}>
        <AdminLayout />
      </CheckLogin>
    ),
    children: [
      { index: true, element: <div>Admin Dashboard</div> },
      { path: "expense", element: <div>Admin Expense</div> },
      { path: "add-expense", element: <div>Admin Add Expense</div> },
      { path: "report", element: <div>Admin Report</div> },
      { path: "approvals", element: <div>Admin Approvals</div> },
      { path: "cash-management", element: <div>Admin Cash Management</div> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <NotFoundInner /> },
    ],
  },

  {
    path: "/user",
    element: (
      <CheckLogin allowed={"user"}>
        <AdminLayout />
      </CheckLogin>
    ),
    children: [
      { index: true, element: <div>Admin Dashboard</div> },
      { path: "expense", element: <div>Admin Expense</div> },
      { path: "add-expense", element: <div>Admin Add Expense</div> },
      { path: "report", element: <div>Admin Report</div> },
      { path: "approvals", element: <div>Admin Approvals</div> },
      { path: "cash-management", element: <div>Admin Cash Management</div> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <NotFoundInner /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default function RouterConfig() {
  return <RouterProvider router={router} />;
}
