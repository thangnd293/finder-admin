import { AppShell, Center, Loader } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useCurrentUser } from "@/services/user/useCurrentUser";
import { eraseCookie, getCookie } from "@/utils/cookie";
import { ROUTE } from "@/constants/route";

function MainLayout() {
  const { isLoading, isError } = useCurrentUser();

  const accessToken = getCookie("accessToken");

  if (!accessToken || isError) {
    eraseCookie("accessToken");

    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  if (isLoading)
    return (
      <Center w="100%" h="100vh">
        <Loader size="lg" variant="bars" />
      </Center>
    );

  return (
    <AppShell
      padding={0}
      layout="alt"
      navbar={<Navbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}

export default MainLayout;
