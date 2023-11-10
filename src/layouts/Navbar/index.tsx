import { ROUTE } from "@/constants/route";
import { useCurrentUser } from "@/services/user/useCurrentUser";
import { eraseCookie } from "@/utils/cookie";
import {
  Avatar,
  Navbar as MantineNavbar,
  ScrollArea,
  Text,
  clsx,
} from "@mantine/core";
import {
  IconBrandZoom,
  IconBuildingStore,
  IconDeviceDesktopAnalytics,
  IconFlag,
  IconLogout,
  IconPhotoHeart,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const { data: currentUser } = useCurrentUser();

  const logout = () => {
    eraseCookie("accessToken");
    navigate(ROUTE.LOGIN);
    queryClient.clear();
  };

  const links = data.map((item) => (
    <Link key={item.label} to={item.link}>
      <div
        className={clsx(
          "flex items-center gap-2 p-4 text-gray-400 hover:text-white text-sm cursor-pointer font-medium hover:bg-white/10 rounded-md",
          {
            "text-white !bg-blue-500": location.pathname === item.link,
          }
        )}
      >
        <item.icon size={16} stroke={1.5} />
        {item.label}
      </div>
    </Link>
  ));

  return (
    <MantineNavbar
      className="bg-background-accent"
      height="100vh"
      width={{ base: 260 }}
    >
      <MantineNavbar.Section>
        <div className="h-header flex items-center justify-center border-b border-solid border-0 border-border-accent text-white">
          Finder
        </div>
      </MantineNavbar.Section>

      <MantineNavbar.Section>
        <div className="space-x-2 flex items-center px-5 py-4 border-b border-solid border-0 border-border-accent">
          <Avatar src={currentUser?.images?.[0].url} size={50} radius="md" />
          <div className="overflow-hidden">
            <Text truncate fz="sm" c="white">
              {currentUser?.name}
            </Text>
            {currentUser?.email && (
              <Text truncate fz="xs" c="gray">
                {currentUser?.email}
              </Text>
            )}
          </div>
        </div>
      </MantineNavbar.Section>
      <MantineNavbar.Section
        className="border-b border-0 border-solid border-border-accent"
        grow
        component={ScrollArea}
        px="xs"
      >
        {links}
      </MantineNavbar.Section>

      <MantineNavbar.Section>
        <button
          className="flex items-center gap-2 p-4 text-gray-400 bg-transparent hover:text-white text-sm cursor-pointer w-full font-medium hover:bg-white/10 border-none justify-center"
          onClick={logout}
        >
          Đăng xuất
          <IconLogout size={16} />
        </button>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

const data = [
  {
    link: ROUTE.DASHBOARD,
    label: "Dashboard",
    icon: IconDeviceDesktopAnalytics,
  },
  { link: ROUTE.REPORT, label: "Report", icon: IconFlag },
  { link: ROUTE.OFFER, label: "Offer", icon: IconBuildingStore },
  {
    link: ROUTE.DATING_FEEDBACK,
    label: "Dating feedback",
    icon: IconPhotoHeart,
  },
  {
    link: ROUTE.VIDEO_CALL_FEEDBACK,
    label: "Video call feedback",
    icon: IconBrandZoom,
  },
];
