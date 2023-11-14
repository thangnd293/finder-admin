import { PackageRetailData } from "@/types/offer";
import { ActionIcon, CloseButton, Group, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import PackageRetailAdder from "./PackageRetailAdder";

interface PackageRetailInputProps {
  value: PackageRetailData[];
  error?: string;
  disabled?: boolean;
  onChange: (value: PackageRetailData[]) => void;
}
const PackageRetailInput = ({
  value,
  disabled,
  error,
  onChange,
}: PackageRetailInputProps) => {
  const openModal = () =>
    modals.open({
      modalId: "package-retail-adder",
      title: "Thêm gói",
      centered: true,
      size: "sm",
      children: (
        <PackageRetailAdder
          packages={value}
          onAdd={(pack) => onChange([...value, pack])}
        />
      ),
    });

  return (
    <div>
      <Text fz="sm" fw="500">
        Gói
      </Text>
      <Group spacing={10}>
        {value.map((pack) => (
          <PackageRetailItem
            key={Object.values(pack).join("-")}
            {...pack}
            disabled={disabled}
            onRemove={() =>
              onChange(
                value.filter(
                  (p) =>
                    p.amount !== pack.amount ||
                    p.originalPrice !== pack.originalPrice
                )
              )
            }
          />
        ))}
        {!disabled && (
          <Tooltip label="Thêm gói">
            <ActionIcon variant="light" onClick={openModal}>
              <IconPlus size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      {error && (
        <Text color="red" size="sm">
          {error}
        </Text>
      )}
    </div>
  );
};

export default PackageRetailInput;

interface PackageRetailItemProps extends PackageRetailData {
  disabled?: boolean;
  onRemove: () => void;
}

const PackageRetailItem = ({
  disabled,
  originalPrice,
  amount,
  onRemove,
}: PackageRetailItemProps) => {
  return (
    <div className="flex gap-3 items-center px-2 py-1 text-sm text-gray-600 font-medium bg-gray-50 rounded-sm">
      {amount} lượt - {originalPrice.toString().formatPrice()}
      {!disabled && <CloseButton onClick={onRemove} />}
    </div>
  );
};
