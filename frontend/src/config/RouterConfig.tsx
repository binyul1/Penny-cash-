import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Register from "../pages/register";
import NotFound from "../pages/errors/NotFound";
import AdminLayout from "../pages/layouts/AdminLayout";
import NotFoundInner from "../pages/errors/NotFoundInner";
import CheckLogin from "../components/auth/CheckLogin";
import Logout from "../pages/auth/Logout";
import CashManagementPage from "../pages/Deposit";
import AddExpensePage from "../pages/expense/AddExpensePage";
import ApprovalsPage from "../pages/expense/ApprovalsPage";
import ExpenseLedgerPage from "../pages/expense/ExpenseLedgerPage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
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
      { path: "expense", element: <ExpenseLedgerPage /> },
      { path: "add-expense", element: <AddExpensePage /> },
      { path: "report", element: <div>Admin Report</div> },
      { path: "approvals", element: <ApprovalsPage /> },
      { path: "cash-management", element: <CashManagementPage /> },
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
      { path: "expense", element: <ExpenseLedgerPage /> },
      { path: "add-expense", element: <AddExpensePage /> },
      { path: "report", element: <div>Admin Report</div> },
      { path: "approvals", element: <ApprovalsPage /> },
      { path: "cash-management", element: <CashManagementPage /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <NotFoundInner /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default function RouterConfig() {
  return <RouterProvider router={router} />;
}
