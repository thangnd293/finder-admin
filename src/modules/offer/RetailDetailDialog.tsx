import { useEditOffer } from "@/services/offer/useEditOffer";
import { Feature, Offer, PackageData } from "@/types/offer";
import {
  Button,
  ColorInput,
  Group,
  Modal,
  ScrollArea,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import IconInput from "./IconInput";
import PackageRetailInput from "./PackageRetailInput";
import { useEffect } from "react";

interface OfferFormValues {
  iconUrl: string;
  type: string;
  text: string;
  style: {
    background: string;
    buttonBackground: string;
    buttonColor: string;
    primaryColor: string;
  };
  packages: PackageData[];
  merchandising: Feature[];
}

interface RetailDetailDialogProps {
  offer?: Offer;
  isOpen: boolean;
  isEditing?: boolean;
  onClose: () => void;
}

const RetailDetailDialog = ({
  offer,
  isOpen,
  isEditing: _isEditing,
  onClose,
}: RetailDetailDialogProps) => {
  const [isEditing, { open }] = useDisclosure(_isEditing ?? false);

  const { onSubmit, reset, getInputProps, setFieldValue, setValues } =
    useForm<OfferFormValues>({
      initialValues: offer,
      validate: {
        iconUrl: isNotEmpty("Vui lòng chọn icon"),
        type: isNotEmpty("Vui lòng nhập tên dịch vụ"),
        text: isNotEmpty("Vui lòng nhập mô tả"),
        style: {
          background: isNotEmpty("Vui lòng nhập màu nền"),
          buttonBackground: isNotEmpty("Vui lòng nhập màu nền của nút"),
          buttonColor: isNotEmpty("Vui lòng nhập màu chữ của nút"),
          primaryColor: isNotEmpty("Vui lòng nhập màu chữ"),
        },
        packages: hasLength({ min: 1 }, "Vui lòng chọn ít nhất 1 gói"),
        merchandising: hasLength(
          { min: 1 },
          "Vui lòng chọn ít nhất 1 đặc quyền"
        ),
      },
    });

  useEffect(() => {
    if (offer) setValues(offer);
  }, [offer]);

  const editOffer = useEditOffer({
    onSuccess: () => toast.success("Chỉnh sửa gói thành công"),
    onError: () => toast.error("Chỉnh sửa gói thất bại"),
    onSettled: handleClose,
  });

  const handleSubmit = (values: OfferFormValues) => {
    editOffer.mutate({ offerID: offer?._id ?? "", ...values });
  };

  function handleClose() {
    onClose();
    reset();
  }
  return (
    <Modal
      title={isEditing ? "Sửa gói bán lẻ" : "Chi tiết gói bán lẻ"}
      centered
      opened={isOpen || editOffer.isLoading}
      onClose={handleClose}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <form className="space-y-3" onSubmit={onSubmit(handleSubmit)}>
        <TextInput
          variant="filled"
          label="Tên gói bán lẻ"
          disabled={!isEditing}
          {...getInputProps("type")}
        />

        <Textarea
          variant="filled"
          label="Mô tả"
          disabled={!isEditing}
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
              disabled={!isEditing}
              {...getInputProps("style.background")}
            />
            <ColorInput
              variant="filled"
              placeholder="Màu chữ"
              disabled={!isEditing}
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
              disabled={!isEditing}
              {...getInputProps("style.buttonBackground")}
            />
            <ColorInput
              variant="filled"
              placeholder="Màu chữ của nút"
              disabled={!isEditing}
              {...getInputProps("style.buttonColor")}
            />
          </Group>
        </div>
        <IconInput
          {...getInputProps("iconUrl")}
          disabled={!isEditing}
          onRemove={() => setFieldValue("iconUrl", "")}
        />
        <PackageRetailInput
          disabled={!isEditing}
          {...getInputProps("packages")}
        />

        <Group position="right">
          <Button type="button" variant="light" onClick={handleClose}>
            Quay lại
          </Button>

          {isEditing && (
            <Button type="submit" loading={editOffer.isLoading}>
              Lưu
            </Button>
          )}

          {!isEditing && (
            <Button type="button" onClick={open}>
              Sửa
            </Button>
          )}
        </Group>
      </form>
    </Modal>
  );
};

export default RetailDetailDialog;
