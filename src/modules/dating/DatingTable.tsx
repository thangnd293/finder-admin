import UserInfo from "@/components/UserInfo";
import { useTable } from "@/hooks/useTable";
import { useAllDating } from "@/services/dating/useAllDating";
import { Dating, ReviewDatingStatus } from "@/types/dating";
import { Badge } from "@mantine/core";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMemo, useState } from "react";
import DatingReviewDialog from "./DatingReviewDialog";

const DatingTable = () => {
  const [selectedDating, setSelectedDating] = useState<Dating | null>(null);
  const { data } = useAllDating();

  const columns = useMemo<MRT_ColumnDef<Dating>[]>(
    () => [
      {
        accessorKey: "sender.name",
        header: "Người gửi",
        Cell: ({ row, renderedCellValue }) => (
          <UserInfo
            avatar={row.original.sender.images?.[0]?.url}
            name={renderedCellValue}
            email={row.original.sender.email}
          />
        ),
      },
      {
        accessorKey: "receiver.name",
        header: "Người nhận",
        Cell: ({ row, renderedCellValue }) => (
          <UserInfo
            avatar={row.original.receiver.images?.[0]?.url}
            name={renderedCellValue}
            email={row.original.receiver.email}
          />
        ),
      },
      {
        accessorKey: "appointmentDate",
        sortingFn: (a, b) => {
          return (
            new Date(a.original.appointmentDate).getTime() -
            new Date(b.original.appointmentDate).getTime()
          );
        },
        header: "Ngày hẹn",
        Cell: ({ cell }) => cell.getValue<string>().prettyFullDate(),
      },
      {
        accessorKey: "createdAt",
        sortingFn: (a, b) => {
          return (
            new Date(a.original.createdAt).getTime() -
            new Date(b.original.createdAt).getTime()
          );
        },
        header: "Ngày tạo",
        Cell: ({ cell }) => cell.getValue<string>().prettyFullDate(),
      },
      {
        accessorKey: "reviewDatingStatus",
        sortingFn: (a, b) => {
          const aString = a.original.reviewDatingStatus.toString();
          const bString = b.original.reviewDatingStatus.toString();
          return aString.localeCompare(bString);
        },
        header: "Trạng thái",
        Cell: ({ cell }) => (
          <DatingStatusBadge
            status={cell.getValue<Dating["reviewDatingStatus"]>()}
          />
        ),
      },
    ],
    []
  );

  const table = useTable({
    columns,
    enableFilterMatchHighlighting: false,
    data: data?.results || [],
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => setSelectedDating(row.original),
      sx: { cursor: "pointer" },
    }),
    enableMultiSort: true,

    filterFns: {
      myCustomFilterFn: (row, id, filterValue) => {
        const value = row.getValue(id);

        if (typeof value !== "string") return false;
        return value
          .removeVietnameseTones()
          .toLowerCase()
          .includes(filterValue.removeVietnameseTones().toLowerCase());
      },
    },
    globalFilterFn: "myCustomFilterFn", //set the global filter function to myCustomFilterFn
  });

  return (
    <>
      <MantineReactTable table={table} />
      {selectedDating && (
        <DatingReviewDialog
          dating={selectedDating}
          isOpen={!!selectedDating}
          onClose={() => setSelectedDating(null)}
        />
      )}
    </>
  );
};

export default DatingTable;

const DatingStatusBadge = ({
  status,
}: {
  status: Dating["reviewDatingStatus"];
}) => {
  switch (status) {
    case ReviewDatingStatus.WAIT_FOR_REVIEW:
      return (
        <Badge radius="xs" color="orange">
          Đang chờ
        </Badge>
      );
    case ReviewDatingStatus.SUCCESS:
      return (
        <Badge radius="xs" color="green">
          Thành công
        </Badge>
      );
    case ReviewDatingStatus.NOT_JOINING:
      return (
        <Badge radius="xs" color="gray">
          Không tham gia
        </Badge>
      );
    case ReviewDatingStatus.FAILED:
    case ReviewDatingStatus.HALFWAY:
      return (
        <Badge radius="xs" color="red">
          Thất bại
        </Badge>
      );
    default:
      return null;
  }
};
