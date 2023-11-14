import { FEATURES, timeMap } from "@/constants/feature";
import { Feature, LimitType } from "@/types/offer";
import {
  Badge,
  Button,
  CloseButton,
  Image,
  Stack,
  Text,
  clsx,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import FeatureAdder from "./FeatureAdder";

interface FeatureInputProps {
  value: Feature[];
  error?: string;
  disabled?: boolean;
  onChange: (value: Feature[]) => void;
}
const FeatureInput = ({
  value,
  disabled,
  error,
  onChange,
}: FeatureInputProps) => {
  const featureOptions = FEATURES.filter(
    (feature) => !value.some((f) => f.name === feature.name)
  ).map((feature) => ({ value: feature.name, label: feature.name }));

  const openModal = () =>
    modals.open({
      modalId: "feature-adder",
      title: "Thêm đặc quyền",
      centered: true,
      size: "sm",
      children: (
        <FeatureAdder
          featureOptions={featureOptions}
          onAdd={(feature) => onChange([...value, feature])}
        />
      ),
    });

  return (
    <div>
      <Text fz="sm" fw="500">
        Đặc quyền
      </Text>
      <Stack spacing={10}>
        {value.map((feature) => (
          <FeatureItem
            key={feature.name}
            {...feature}
            disabled={disabled}
            onRemove={() =>
              onChange(value.filter((f) => f.name !== feature.name))
            }
          />
        ))}
        {!disabled && (
          <Button variant="outline" size="xs" fullWidth onClick={openModal}>
            Thêm đặc quyền
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

export default FeatureInput;

type FeatureItemProps = Feature & {
  disabled?: boolean;
  onRemove: () => void;
};

const FeatureItem = ({
  name,
  type,
  amount,
  iconUrl,
  refreshIntervalUnit,
  disabled,
  onRemove,
}: FeatureItemProps) => {
  const content =
    type === LimitType.UNLIMITED ? (
      <Badge color="orange">Dùng không giới hạn</Badge>
    ) : (
      <div>
        <Badge color="orange">{amount} lượt</Badge>
        <Badge>
          Làm mới theo {timeMap[refreshIntervalUnit]?.toLowerCase()}
        </Badge>
      </div>
    );
  return (
    <div
      className={clsx(
        "flex relative gap-3 items-center justify-between px-3 py-2 text-sm text-gray-600 font-medium bg-gray-50 rounded-md",
        {
          "pr-10": !disabled,
        }
      )}
    >
      <div className="flex items-center gap-1.5">
        <Image src={iconUrl} width={26} height={26} />
        <span>{name}</span>
      </div>
      {content}
      {!disabled && (
        <CloseButton
          title="Xóa đặc quyền"
          className="absolute right-2"
          onClick={onRemove}
        />
      )}
    </div>
  );
};
