import UserInfo from "@/components/UserInfo";
import { useTable } from "@/hooks/useTable";
import { useBlockUser } from "@/services/report/useBlockUser";
import { useUnblockUser } from "@/services/report/useUnblockUser";
import { getAllUsers, useInvalidateUsers } from "@/services/user/useUsers";
import { User } from "@/types/user";
import { Badge, Menu, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLock, IconLockOpen } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  MantineReactTable,
} from "mantine-react-table";
import { useMemo, useState } from "react";

const UserTable = () => {
  const invalidateUsers = useInvalidateUsers();

  const blockUser = useBlockUser({
    onSuccess: invalidateUsers,
  });
  const unblockUser = useUnblockUser({ onSuccess: invalidateUsers });

  const [rowCount, setRowCount] = useState(0);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users", pagination, columnFilters, globalFilter, sorting],
    queryFn: () => {
      const sortingData = [];
      console.log({ sorting });
      if (sorting.find((sort) => sort.id === "createdAt")) {
        sortingData.push([
          "createdAt",
          sorting.find((sort) => sort.id === "createdAt")?.desc
            ? "desc"
            : "asc",
        ]);
      }
      if (sorting.find((sort) => sort.id === "name")) {
        sortingData.push([
          "keyword",
          sorting.find((sort) => sort.id === "name")?.desc ? "desc" : "asc",
        ]);
      }
      return getAllUsers({
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        name: globalFilter,
        ...Object.fromEntries(sortingData),
      });
    },
    onSuccess: (data) => {
      setRowCount(data.pagination.totalCount);
    },
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Người dùng",
        enableColumnFilter: false,
        accessorFn: ({ name, images, email }) => (
          <UserInfo avatar={images?.[0]?.url} name={name} email={email} />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tham gia",
        enableColumnFilter: false,
        Cell: ({ cell }) => cell.getValue<string>().prettyDate(),
      },
      {
        accessorKey: "isBlocked",
        header: "Trạng thái",
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
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
    enableRowNumbers: false,
    enableRowActions: true,
    getRowId: (row) => row._id,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    rowCount,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
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
