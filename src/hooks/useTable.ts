import { MRT_TableOptions, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi";

interface TableOptions<TData extends Record<string, any>>
  extends Omit<
    MRT_TableOptions<TData>,
    | "layoutMode"
    | "enableFullScreenToggle"
    | "enableDensityToggle"
    | "enableDensityToggle"
    | "enableHiding"
    | "mantinePaperProps"
    | "mantineTableBodyCellProps"
    | "paginationDisplayMode"
    | "enableRowNumbers"
    | "positionActionsColumn"
    | "localization"
  > {}

export const useTable = <TData extends Record<string, any> = {}>(
  tableOptions: TableOptions<TData>
) => {
  return useMantineReactTable({
    layoutMode: "grid",
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    mantinePaperProps: {
      style: {
        border: "none",
        boxShadow: "none",
      },
    },
    mantineTableBodyCellProps: {
      className: "border-gray-100 border-solid border-0 border-b",
    },
    paginationDisplayMode: "pages",
    enableRowNumbers: true,
    positionActionsColumn: "last",
    localization: MRT_Localization_VI,
    ...tableOptions,
  });
};
