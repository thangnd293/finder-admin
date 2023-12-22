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
        path: ROUTE.VIDEO_CALL_FEEDBACK,
        lazy: async () => {
          const { default: Component } = await import(
            "./pages/video-call-feedback"
          );
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
            "./pages/user-management/UserManagementPage"
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
