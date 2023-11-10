import { useMemo, useState } from "react";

import { useTable } from "@/hooks/useTable";
import { useReports } from "@/services/report/useReports";
import { Report } from "@/types/report";
import { type Image as ImageType } from "@/types/user";
import { Menu } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import ReportDetail from "./ReportDetailDialog";
import UserInfo from "@/components/UserInfo";

const ReportTable = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { data } = useReports();

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
    ],
    []
  );

  const table = useTable({
    columns,
    data: data?.results || [],
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => setSelectedReport(row.original),
      sx: { cursor: "pointer" },
    }),

    renderRowActionMenuItems: ({ row }) => (
      <Menu.Item
        icon={<IconLock size={16} />}
        onClick={() => console.info("Khóa người dùng", row.original._id)}
      >
        Khóa người dùng
      </Menu.Item>
    ),
  });

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
