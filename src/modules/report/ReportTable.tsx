import { useMemo, useState } from "react";

import { useTable } from "@/hooks/useTable";
import { useInvalidateReports, useReports } from "@/services/report/useReports";
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
  const invalidateReports = useInvalidateReports();

  const blockUser = useBlockUser({
    onSuccess: invalidateReports,
  });

  const columns = useMemo<MRT_ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: "reportBy.name",
        header: "Người báo cáo",
        accessorFn: ({ reportBy }) => (
          <UserInfo
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
              Đã xử lý
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
    enableFilterMatchHighlighting: false,
    filterFns: {
      myCustomFilterFn: (row, id, filterValue) => {
        const value = row.getValue(id);
        console.log(filterValue.removeVietnameseTones().toLowerCase());
        if (typeof value !== "string") return false;
        return value
          .removeVietnameseTones()
          .toLowerCase()
          .includes(filterValue.removeVietnameseTones().toLowerCase());
      },
    },
    globalFilterFn: "myCustomFilterFn", //set the global filter function to myCustomFilterFn
    renderRowActionMenuItems: ({
      row: {
        original: { reportedUser, isVerified },
      },
    }) => (
      <Menu.Item
        icon={<IconLock size={16} />}
        disabled={isVerified}
        onClick={() =>
          openConfirmBlockModal(reportedUser._id, reportedUser.name)
        }
      >
        Chặn người dùng
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

  const openConfirmBlockModalAction =
    (userID: string, userName: string) => () => {
      openConfirmBlockModal(userID, userName);
      setSelectedReport(null);
      invalidateReports();
    };

  return (
    <>
      <MantineReactTable table={table} />
      {selectedReport && (
        <ReportDetail
          isOpen={!!selectedReport}
          report={selectedReport}
          openConfirmBlockModalAction={openConfirmBlockModalAction(
            selectedReport.reportedUser._id,
            selectedReport.reportedUser.name
          )}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

export default ReportTable;
