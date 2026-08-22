import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../features/dashboard/ui/pages/Home";
import DashboardLayout from "../app/layout/DashboardLayout";
import AuthLayout from "../app/layout/AuthLayout";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import PublicRoute from "./protectedRoutes/PublicRoute";
import LoginInPage from "../features/auth/ui/pages/loginPage"
import RegisterPage from "../features/auth/ui/pages/RegisterPage"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentEmployee } from "../features/auth/state/LoginAction";

const AppRoutes = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    (() =>{
      dispatch(currentEmployee())
    })()
  } , [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [{
        path : "",
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
      }]
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
