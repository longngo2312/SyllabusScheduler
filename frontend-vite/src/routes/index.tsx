import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Auth,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        Component: LoginForm,
      },
      {
        path: "signup",
        Component: RegisterForm,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
