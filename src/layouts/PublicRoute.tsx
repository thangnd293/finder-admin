import { ROUTE } from "@/constants/route";
import { getCookie } from "@/utils/cookie";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = getCookie("accessToken");

  if (accessToken) return <Navigate to={ROUTE.HOME} replace={true} />;

  return <Outlet />;
};

export default PublicRoute;
