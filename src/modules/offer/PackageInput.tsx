import { timeMap } from "@/constants/feature";
import { PackageData } from "@/types/offer";
import { Button, CloseButton, Stack, Text, clsx } from "@mantine/core";
import { modals } from "@mantine/modals";
import PackageAdder from "./PackageAdder";

interface PackageInputProps {
  value: PackageData[];
  error?: string;
  disabled?: boolean;
  onChange: (value: PackageData[]) => void;
}
const PackageInput = ({
  value,
  disabled,
  error,
  onChange,
}: PackageInputProps) => {
  const openModal = () =>
    modals.open({
      modalId: "package-adder",
      title: "Thêm gói",
      centered: true,
      size: "sm",
      children: (
        <PackageAdder
          packages={value}
          onAdd={(pack) => onChange([...value, pack])}
        />
      ),
    });

  const onRemove = (pack: PackageData) => {
    onChange(
      value.filter(
        (p) =>
          p.refreshInterval !== pack.refreshInterval ||
          p.refreshIntervalUnit !== pack.refreshIntervalUnit
      )
    );
  };

  return (
    <div>
      <Text fz="sm" fw="500">
        Gói
      </Text>
      <Stack spacing={10}>
        {value.map((pack) => (
          <PackageItem
            key={Object.values(pack).join("-")}
            {...pack}
            disabled={disabled}
            onRemove={() => onRemove(pack)}
          />
        ))}
        {!disabled && (
          <Button variant="outline" size="xs" fullWidth onClick={openModal}>
            Thêm gói
          </Button>
        )}
      </Stack>
      {error && (
        <Text color="red" size="sm">
          {error}
        </Text>
      )}
    </div>
  );
};

export default PackageInput;

interface PackageItemProps extends PackageData {
  disabled?: boolean;
  onRemove: () => void;
}

const PackageItem = ({
  disabled,
  originalPrice,
  refreshInterval,
  refreshIntervalUnit,
  onRemove,
}: PackageItemProps) => {
  return (
    <div
      className={clsx(
        "flex relative gap-3 items-center justify-between px-3 py-2 text-sm text-gray-600 font-medium bg-gray-50 rounded-md",
        {
          "pr-10": !disabled,
        }
      )}
    >
      <div>
        Đơn vị: <span className="text-gray-500">{refreshInterval}</span>, Tính
        theo:{" "}
        <span className="text-gray-500">{timeMap[refreshIntervalUnit]}</span>
      </div>

      <div>
        Giá:&nbsp;
        <span className="text-gray-500">
          {originalPrice.toString().formatPrice()}
        </span>
      </div>

      {!disabled && (
        <CloseButton
          title="Xóa gói"
          className="absolute right-2"
          onClick={onRemove}
        />
      )}
    </div>
  );
};
