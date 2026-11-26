import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import MainLayout from "@/layouts/layouts";
import Auth from "@/pages/Auth";
import BusyWeek from "@/pages/BusyWeek";
import Courses from "@/pages/Courses";
import Dashboard from "@/pages/Dashboard";
import UploadedSyllabus from "@/pages/UploadedSyllabus";
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
      {
        path: "forgot-password",
        Component: ForgetPasswordForm,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "courses", Component: Courses },
      { path: "uploaded-syllabus", Component: UploadedSyllabus },
      { path: "busy-week", Component: BusyWeek },
    ],
  },
]);
