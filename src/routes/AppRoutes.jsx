import { createBrowserRouter, RouterProvider } from "react-router";
import DashboardLayout from "../app/layout/DashboardLayout";
import AuthLayout from "../app/layout/AuthLayout";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import PublicRoute from "./protectedRoutes/PublicRoute";
import LoginInPage from "../features/auth/ui/pages/loginPage";
import RegisterPage from "../features/auth/ui/pages/RegisterPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentEmployee } from "../features/auth/state/LoginAction";
import { commonRoutes } from "../routes/commonRoutes";
import RoleBasedRoutes from "./protectedRoutes/RoleBasedRoutes";
import {adminRoutes} from "./adminRoutes";
import {employeeRoutes} from "./employeeRoutes"

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(currentEmployee());
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <LoginInPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            ...commonRoutes,
            {
              element: <RoleBasedRoutes allowedRole={"admin"} />,
              children: adminRoutes,
            },
            {
              element: <RoleBasedRoutes allowedRole={"employee"} />,
              children: employeeRoutes
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
