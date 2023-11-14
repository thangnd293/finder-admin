import { useTable } from "@/hooks/useTable";
import { useOffers } from "@/services/offer/useOffers";
import { Offer, Package } from "@/types/offer";
import { Badge, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { useMemo, useState } from "react";
import CreateOffer from "./CreateOffer";
import DeleteOffer from "./DeleteOffer";
import OfferDetailDialog from "./OfferDetailDialog";

const OfferTable = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );
  const [isOpenDetailDialog, { open, close }] = useDisclosure(false);

  const { data } = useOffers();

  const columns = useMemo<MRT_ColumnDef<Offer>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Tên",
      },
      {
        accessorKey: "iconUrl",
        header: "Icon",
        Cell: ({ cell }) => (
          <Image width={50} height={50} src={cell.getValue<string>()} />
        ),
      },
      {
        accessorKey: "text",
        header: "Mô tả",
      },
      {
        accessorKey: "isRetail",
        header: "Loại",
        Cell: ({ cell }) =>
          cell.getValue() ? (
            <Badge radius="sm">Bán lẻ</Badge>
          ) : (
            <Badge radius="sm" color="green">
              Theo gói
            </Badge>
          ),
      },
      {
        accessorKey: "packages",
        header: "Gói",
        Cell: ({ cell }) => cell.getValue<Package[]>().length,
      },
    ],
    []
  );

  const tableData = useMemo(() => data?.results || [], [data]);

  const table = useTable({
    columns,
    data: tableData,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedOffer(row.original);
        open();
      },
      sx: { cursor: "pointer" },
    }),
    enableRowActions: true,
    renderTopToolbarCustomActions: () => <CreateOffer />,
    renderRowActionMenuItems: ({ row: { original } }) => (
      <>
        <DeleteOffer
          offerID={original._id}
          name={original.type}
          disabled={original.isRetail}
        />
      </>
    ),
  });

  return (
    <>
      <MantineReactTable table={table} />

      <OfferDetailDialog
        offer={selectedOffer}
        isOpen={isOpenDetailDialog}
        onClose={close}
      />
    </>
  );
};

export default OfferTable;
