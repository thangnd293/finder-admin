import { Avatar, Text, clsx } from "@mantine/core";

interface UserInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  userID: string;
  avatar?: string;
  name: string;
  email?: string;
  clickToSeeDetail?: boolean;
}
const UserInfo = ({
  userID,
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
