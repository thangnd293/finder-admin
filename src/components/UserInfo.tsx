import { Avatar, Text, clsx } from "@mantine/core";
import { ReactNode } from "react";

interface UserInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  avatar?: string;
  name: ReactNode;
  email?: ReactNode;
  clickToSeeDetail?: boolean;
}
const UserInfo = ({
  avatar,
  name,
  email,
  className,
  ...others
}: UserInfoProps) => {
  return (
    <div className={clsx("space-x-2 flex items-center", className)} {...others}>
      <Avatar src={avatar} size="md" radius="xl" />
      <div className="overflow-hidden">
        <Text truncate fz="sm">
          {name}
        </Text>
        {email && (
          <Text truncate fz="xs">
            {email}
          </Text>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
