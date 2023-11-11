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
        accessorFn: ({ sender }) => (
          <UserInfo
            userID={sender._id}
            avatar={sender.images?.[0]?.url}
            name={sender.name}
            email={sender.email}
          />
        ),
      },
      {
        accessorKey: "receiver.name",
        header: "Người nhận",
        accessorFn: ({ receiver }) => (
          <UserInfo
            userID={receiver._id}
            avatar={receiver.images?.[0]?.url}
            name={receiver.name}
            email={receiver.email}
          />
        ),
      },
      {
        accessorKey: "appointmentDate",
        header: "Ngày hẹn",
        Cell: ({ cell }) => cell.getValue<string>().prettyFullDate(),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        Cell: ({ cell }) => cell.getValue<string>().prettyFullDate(),
      },
      {
        accessorKey: "reviewDatingStatus",
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
    data: data?.results || [],
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => setSelectedDating(row.original),
      sx: { cursor: "pointer" },
    }),
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
