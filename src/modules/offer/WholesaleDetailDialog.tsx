import { useEditOffer } from "@/services/offer/useEditOffer";
import { Offer } from "@/types/offer";
import { Modal, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import MutateOfferForm from "./MutateOfferForm";
import useMutationOfferForm, {
  MutationOfferFormValues,
} from "./useMutationOfferForm";

interface WholesaleDetailDialogProps {
  offer?: Offer;
  isOpen: boolean;
  isEditing?: boolean;
  onClose: () => void;
}
const WholesaleDetailDialog = ({
  offer,
  isOpen,
  isEditing: _isEditing,
  onClose,
}: WholesaleDetailDialogProps) => {
  const [isEditing, { open }] = useDisclosure(_isEditing ?? false);

  const formHandlers = useMutationOfferForm(offer);

  const { onSubmit, reset } = formHandlers;

  const editOffer = useEditOffer({
    onSuccess: () => toast.success("Chỉnh sửa gói thành công"),
    onError: () => toast.error("Chỉnh sửa gói thất bại"),
    onSettled: handleClose,
  });

  const handleSubmit = onSubmit((values: MutationOfferFormValues) => {
    editOffer.mutate({ offerID: offer?._id ?? "", ...values });
  });

  function handleClose() {
    onClose();
    reset();
  }

  return (
    <Modal
      title={isEditing ? "Sửa gói" : "Chi tiết gói"}
      centered
      opened={isOpen || editOffer.isLoading}
      onClose={handleClose}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <MutateOfferForm
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        mode="edit"
        isEditing={isEditing}
        onEdit={open}
        isLoading={editOffer.isLoading}
        {...formHandlers}
      />
    </Modal>
  );
};

export default WholesaleDetailDialog;
