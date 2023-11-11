import { useMemo, useState } from "react";

import { useTable } from "@/hooks/useTable";
import { useReports } from "@/services/report/useReports";
import { Report } from "@/types/report";
import { type Image as ImageType } from "@/types/user";
import { Badge, Menu, Text } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import ReportDetail from "./ReportDetailDialog";
import UserInfo from "@/components/UserInfo";
import { useBlockUser } from "@/services/report/useBlockUser";
import { modals } from "@mantine/modals";

const ReportTable = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { data } = useReports();
  const blockUser = useBlockUser();

  const columns = useMemo<MRT_ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: "reportBy.name",
        header: "Người báo cáo",
        accessorFn: ({ reportBy }) => (
          <UserInfo
            userID={reportBy._id}
            avatar={reportBy.images?.[0]?.url}
            name={reportBy.name}
            email={reportBy.email}
          />
        ),
      },
      {
        accessorKey: "reportedUser.name",
        header: "Người bị báo cáo",
        accessorFn: ({ reportedUser }) => (
          <UserInfo
            userID={reportedUser._id}
            avatar={reportedUser.images?.[0]?.url}
            name={reportedUser.name}
            email={reportedUser.email}
          />
        ),
      },
      {
        accessorKey: "reason",
        header: "Lý do",
      },
      {
        accessorKey: "description",
        header: "Mô tả",
      },
      {
        accessorKey: "images",
        header: "Ảnh kèm theo",
        Cell: ({ cell }) => cell.getValue<ImageType[]>().length + " ảnh",
      },
      {
        accessorKey: "createdAt",
        header: "Ngày báo cáo",
        Cell: ({ cell }) => cell.getValue<string>().prettyFullDate(),
      },
      {
        accessorKey: "isVerified",
        header: "Trạng thái",
        Cell: ({ cell }) =>
          cell.getValue<boolean>() ? (
            <Badge radius="xs" color="green">
              Đã block
            </Badge>
          ) : (
            <Badge radius="xs" color="orange">
              Đang xử lý
            </Badge>
          ),
      },
    ],
    []
  );

  const table = useTable({
    columns,
    data: data?.results || [],
    enableRowActions: true,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => setSelectedReport(row.original),
      sx: { cursor: "pointer" },
    }),

    renderRowActionMenuItems: ({
      row: {
        original: { reportedUser },
      },
    }) => (
      <Menu.Item
        icon={<IconLock size={16} />}
        onClick={() =>
          openConfirmBlockModal(reportedUser._id, reportedUser.name)
        }
      >
        Khóa người dùng
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

  return (
    <>
      <MantineReactTable table={table} />
      {selectedReport && (
        <ReportDetail
          isOpen={!!selectedReport}
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

export default ReportTable;
