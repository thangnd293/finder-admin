import UserInfo from "@/components/UserInfo";
import { useTable } from "@/hooks/useTable";
import { useBlockUser } from "@/services/report/useBlockUser";
import { useUnblockUser } from "@/services/report/useUnblockUser";
import { useInvalidateUsers, useUsers } from "@/services/user/useUsers";
import { User } from "@/types/user";
import { Badge, Menu, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMemo } from "react";

const UserTable = () => {
  const { data } = useUsers();
  const invalidateUsers = useInvalidateUsers();

  const blockUser = useBlockUser({
    onSuccess: invalidateUsers,
  });
  const unblockUser = useUnblockUser({ onSuccess: invalidateUsers });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Người dùng",
        accessorFn: ({ name, images, email }) => (
          <UserInfo avatar={images?.[0]?.url} name={name} email={email} />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tham gia",
        Cell: ({ cell }) => cell.getValue<string>().prettyDate(),
      },
      {
        accessorKey: "isBlocked",
        header: "Trạng thái",
        Cell: ({ cell, row: { original } }) => {
          const isBlocked = cell.getValue<boolean>();
          return isBlocked ? (
            <Tooltip label={original.blockedAt?.prettyFullDate()}>
              <Badge color="red" radius="xs">
                Đã chặn
              </Badge>
            </Tooltip>
          ) : (
            <Badge color="green" radius="xs">
              Hoạt động bình thường
            </Badge>
          );
        },
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data: data?.results || [],
    enableRowActions: true,
    renderRowActionMenuItems: ({
      row: {
        original: { _id, name, isBlocked },
      },
    }) =>
      isBlocked ? (
        <Menu.Item
          icon={<IconLockOpen size={16} />}
          onClick={() => openConfirmUnblockModal(_id, name)}
        >
          Bỏ chặn
        </Menu.Item>
      ) : (
        <Menu.Item
          icon={<IconLock size={16} />}
          onClick={() => openConfirmBlockModal(_id, name)}
        >
          Chặn
        </Menu.Item>
      ),
  });

  function openConfirmBlockModal(userID: string, userName: string) {
    return modals.openConfirmModal({
      title: `Chặn ${userName}`,
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc chắn muốn chặn người dùng này không? Người dùng này sẽ
          không thể đăng nhập vào hệ thống nữa.
        </Text>
      ),
      labels: {
        confirm: `Chặn ${userName}`,
        cancel: "Bỏ qua",
      },
      confirmProps: { color: "red", loading: blockUser.isLoading },
      onConfirm: () => blockUser.mutate(userID),
    });
  }

  function openConfirmUnblockModal(userID: string, userName: string) {
    return modals.openConfirmModal({
      title: `Bỏ chặn ${userName}`,
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc chắn muốn bỏ chặn người dùng này không? Người dùng này sẽ
          có thể đăng nhập vào hệ thống.
        </Text>
      ),
      labels: {
        confirm: `Bỏ chặn ${userName}`,
        cancel: "Bỏ qua",
      },
      confirmProps: { color: "red", loading: unblockUser.isLoading },
      onConfirm: () => unblockUser.mutate(userID),
    });
  }

  return <MantineReactTable table={table} />;
};

export default UserTable;
