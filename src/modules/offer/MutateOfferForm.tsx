import {
  Button,
  ColorInput,
  Group,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import FeatureInput from "./FeatureInput";
import IconInput from "./IconInput";
import PackageInput from "./PackageInput";
import { MutationOfferFormValues } from "./useMutationOfferForm";

interface MutateOfferFormProps
  extends UseFormReturnType<MutationOfferFormValues> {
  mode?: "create" | "edit";
  isEditing?: boolean;
  isLoading?: boolean;
  handleSubmit: (event?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleClose: () => void;
  onEdit?: () => void;
}
const MutateOfferForm = ({
  mode = "create",
  isEditing = false,
  isLoading,
  handleSubmit,
  handleClose,
  getInputProps,
  setFieldValue,
  onEdit,
}: MutateOfferFormProps) => {
  const disabled = !isEditing && mode === "edit";

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <TextInput
        variant="filled"
        label="Tên gói"
        disabled={disabled}
        {...getInputProps("type")}
      />

      <Textarea
        variant="filled"
        label="Mô tả"
        disabled={disabled}
        {...getInputProps("text")}
      />

      <div>
        <Text fz="sm" fw="500">
          Hiển thị gói
        </Text>
        <Group grow>
          <TextInput
            variant="filled"
            placeholder="Màu nền"
            disabled={disabled}
            {...getInputProps("style.background")}
          />
          <ColorInput
            variant="filled"
            placeholder="Màu chữ"
            disabled={disabled}
            {...getInputProps("style.primaryColor")}
          />
        </Group>
      </div>

      <div>
        <Text fz="sm" fw="500">
          Hiển thị nút
        </Text>
        <Group grow>
          <TextInput
            variant="filled"
            placeholder="Màu nền của nút"
            disabled={disabled}
            {...getInputProps("style.buttonBackground")}
          />
          <ColorInput
            variant="filled"
            placeholder="Màu chữ của nút"
            disabled={disabled}
            {...getInputProps("style.buttonColor")}
          />
        </Group>
      </div>
      <IconInput
        {...getInputProps("iconUrl")}
        disabled={disabled}
        onRemove={() => setFieldValue("iconUrl", "")}
      />
      <PackageInput disabled={disabled} {...getInputProps("packages")} />
      <FeatureInput disabled={disabled} {...getInputProps("merchandising")} />

      {mode === "create" && (
        <Group position="right">
          <Button type="button" variant="light" onClick={handleClose}>
            Huỷ
          </Button>

          <Button type="submit" loading={isLoading}>
            Tạo
          </Button>
        </Group>
      )}
      {mode === "edit" && (
        <Group position="right">
          <Button type="button" variant="light" onClick={handleClose}>
            {isEditing ? "Huỷ" : "Quay lại"}
          </Button>

          {isEditing && (
            <Button type="submit" loading={isLoading}>
              Lưu
            </Button>
          )}

          {!isEditing && (
            <Button type="button" onClick={onEdit}>
              Sửa
            </Button>
          )}
        </Group>
      )}
    </form>
  );
};

export default MutateOfferForm;
