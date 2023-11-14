import { PackageRetailData } from "@/types/offer";
import { Button, Group, NumberInput } from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";

interface PackageRetailAdderProps {
  packages: PackageRetailData[];
  onAdd: (pack: PackageRetailData) => void;
}
const PackageRetailAdder = ({ packages, onAdd }: PackageRetailAdderProps) => {
  const { onSubmit, getInputProps } = useForm<PackageRetailData>({
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
      amount: (value) => {
        const isDuplicate = packages.some((pack) => pack.amount === value);

        if (isDuplicate) return "Gói này đã tồn tại trong danh sách gói";

        return (
          isNotEmpty("Vui lòng nhập số lượng")(value) ||
          isInRange(
            {
              min: 1,
            },
            "Giá trị nhỏ nhất là 1"
          )(value)
        );
      },
    },
  });

  const onClose = () => {
    modals.close("package-retail-adder");
  };

  const handleSubmit = (values: PackageRetailData) => {
    onAdd(values);
    onClose();
  };

  return (
    <form className="space-y-2" onSubmit={onSubmit(handleSubmit)}>
      <NumberInput label="Số lượng" {...getInputProps("amount")} />

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

export default PackageRetailAdder;
