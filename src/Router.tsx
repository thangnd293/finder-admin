import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE } from "./constants/route";
import PublicRoute from "./layouts/PublicRoute";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: Component } = await import("./layouts/MainLayout");
      return { Component };
    },
    errorElement: <ErrorPage />,

    children: [
      {
        path: "",
        lazy: async () => {
          const { default: Component } = await import(
            "./pages/dashboard/DashboardPage"
          );
          return { Component };
        },
      },
      {
        path: ROUTE.REPORT,
        lazy: async () => {
          const { default: Component } = await import("./pages/ReportPage");
          return { Component };
        },
      },
      {
        path: ROUTE.DATING,
        lazy: async () => {
          const { default: Component } = await import("./pages/DatingPage");
          return { Component };
        },
      },
      {
        path: ROUTE.OFFER,
        lazy: async () => {
          const { default: Component } = await import("./pages/OfferPage");
          return { Component };
        },
      },
      {
        path: ROUTE.USER_MANAGEMENT,
        lazy: async () => {
          const { default: Component } = await import(
            "./pages/UserManagementPage"
          );
          return { Component };
        },
      },
    ],
  },
  {
    path: ROUTE.LOGIN,
    element: <PublicRoute />,
    children: [
      {
        path: "",
        lazy: async () => {
          const { default: Component } = await import("./pages/LoginPage");
          return { Component };
        },
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
