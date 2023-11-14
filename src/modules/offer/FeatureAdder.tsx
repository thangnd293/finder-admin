import { FEATURES, TIME_OPTIONS } from "@/constants/feature";
import { Feature, LimitType } from "@/types/offer";
import { Button, Group, NumberInput, Select, SelectItem } from "@mantine/core";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useMemo } from "react";

interface FeatureAdderFormValues {
  feature: string;
  refreshInterval?: number;
  refreshIntervalUnit?: string;
  amount?: number;
}
interface FeatureAdderProps {
  featureOptions: SelectItem[];
  onAdd: (feature: Feature) => void;
}
const FeatureAdder = ({ featureOptions, onAdd }: FeatureAdderProps) => {
  const { onSubmit, values, getInputProps } = useForm<FeatureAdderFormValues>({
    initialValues: {
      feature: "",
    },
    validate: {
      feature: isNotEmpty("Vui lòng chọn đặc quyền"),
      refreshIntervalUnit: (value, values) => {
        const selectedFeature = FEATURES.find((f) => f.name === values.feature);

        if (selectedFeature && selectedFeature.type === LimitType.RENEWABLE) {
          return isNotEmpty("Vui lòng chọn thời gian làm mới")(value);
        }
      },
      amount: (value, values) => {
        const selectedFeature = FEATURES.find((f) => f.name === values.feature);

        if (!selectedFeature || selectedFeature.type !== LimitType.RENEWABLE)
          return;

        return (
          isNotEmpty("Vui lòng nhập số lượng")(value) ||
          isInRange(
            {
              min: 1,
              max: 100,
            },
            "Số lượng phải nằm trong khoảng từ 1 đến 100"
          )(value)
        );
      },
    },
  });

  const selectedFeature = useMemo(
    () => FEATURES.find((f) => f.name === values.feature),
    [values.feature]
  );

  const handleSubmit = (values: FeatureAdderFormValues) => {
    if (!selectedFeature) return;
    const feature = {
      ...selectedFeature,
      ...values,
    };

    if (feature.type === LimitType.RENEWABLE) feature.refreshInterval = 1;

    onAdd(feature as Feature);
    onClose();
  };

  const onClose = () => modals.close("feature-adder");

  return (
    <form className="space-y-2" onSubmit={onSubmit(handleSubmit)}>
      <Select
        variant="filled"
        data={featureOptions}
        label="Đặc quyền"
        withinPortal
        {...getInputProps("feature")}
      />

      {selectedFeature?.type === LimitType.RENEWABLE && (
        <>
          <NumberInput
            className="flex-1"
            variant="filled"
            label="Số lượng"
            {...getInputProps("amount")}
          />
          <Select
            className="flex-1"
            variant="filled"
            data={TIME_OPTIONS}
            label="Thời gian làm mới"
            withinPortal
            {...getInputProps("refreshIntervalUnit")}
          />
        </>
      )}
      <Group position="right">
        <Button variant="light" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Thêm</Button>
      </Group>
    </form>
  );
};

export default FeatureAdder;
