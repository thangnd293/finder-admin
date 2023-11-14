import { useDeleteOffer } from "@/services/offer/useDeleteOffer";
import { Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";

interface DeleteOfferProps {
  disabled?: boolean;
  offerID: string;
  name: string;
}
const DeleteOffer = ({ disabled, offerID, name }: DeleteOfferProps) => {
  const deleteOffer = useDeleteOffer({
    onSuccess: () => toast.success("Xóa dịch vụ thành công"),
    onError: () => toast.error("Xóa dịch vụ thất bại"),
  });

  const openConfirmDeleteModal = (offerID: string, name: string) =>
    modals.openConfirmModal({
      title: `Xóa dịch vụ ${name}`,
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc chắn muốn xóa dịch vụ này không? Dịch vụ này sẽ không thể
          khôi phục.
        </Text>
      ),
      labels: {
        confirm: "Xóa",
        cancel: "Bỏ qua",
      },
      confirmProps: { color: "red", loading: deleteOffer.isLoading },
      onConfirm: () => deleteOffer.mutate(offerID),
    });

  return (
    <Menu.Item
      icon={<IconTrash size={16} />}
      disabled={disabled}
      color="red"
      onClick={() => openConfirmDeleteModal(offerID, name)}
    >
      Xóa dich vụ
    </Menu.Item>
  );
};

export default DeleteOffer;
