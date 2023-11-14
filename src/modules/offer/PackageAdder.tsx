import { TIME_OPTIONS } from "@/constants/feature";
import { PackageData } from "@/types/offer";
import { Button, Group, NumberInput, Select } from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

interface PackageAdderProps {
  packages: PackageData[];
  onAdd: (pack: PackageData) => void;
}
const PackageAdder = ({ packages, onAdd }: PackageAdderProps) => {
  const { onSubmit, getInputProps } = useForm<PackageData>({
    validate: {
      originalPrice: (value) =>
        isNotEmpty("Vui lòng nhập giá gói")(value) ||
        isInRange(
          {
            min: 1000,
            max: 1000000000,
          },
          "Giá gói phải nằm trong khoảng từ 1000 đến 1000000000"
        )(value),
      refreshInterval: (value, values) => {
        const isDuplicate = packages.some(
          (pack) =>
            pack.refreshInterval === value &&
            pack.refreshIntervalUnit === values.refreshIntervalUnit
        );

        if (isDuplicate) return "Gói này đã tồn tại trong danh sách gói";
        return isNotEmpty("Vui lòng nhập thời gian làm mới")(value);
      },
      refreshIntervalUnit: isNotEmpty("Vui lòng chọn đơn vị thời gian làm mới"),
    },
  });

  const onClose = () => {
    modals.close("package-adder");
  };

  const handleSubmit = (values: PackageData) => {
    onAdd(values);
    onClose();
  };

  return (
    <form className="space-y-2" onSubmit={onSubmit(handleSubmit)}>
      <Select
        label="Đơn vị thời gian"
        data={TIME_OPTIONS}
        withinPortal
        {...getInputProps("refreshIntervalUnit")}
      />
      <NumberInput
        label="Thời gian hiệu lực"
        {...getInputProps("refreshInterval")}
      />

      <NumberInput
        label="Giá gói"
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value)) ? `${value}`.formatPrice() : ""
        }
        {...getInputProps("originalPrice")}
      />

      <Group position="right">
        <Button variant="light" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Thêm</Button>
      </Group>
    </form>
  );
};

export default PackageAdder;
