import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import { ROUTE } from "./constants/route";
import ReportPage from "./pages/ReportPage";
import PublicRoute from "./layouts/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: ROUTE.REPORT,
        element: <ReportPage />,
      },
    ],
  },
  {
    path: ROUTE.LOGIN,
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
