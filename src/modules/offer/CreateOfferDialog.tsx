import { useCreateOffer } from "@/services/offer/useCreateOffer";
import { Modal, ScrollArea } from "@mantine/core";
import { toast } from "react-toastify";
import MutateOfferForm from "./MutateOfferForm";
import useMutationOfferForm, {
  MutationOfferFormValues,
} from "./useMutationOfferForm";

interface CreateOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateOfferDialog = ({ isOpen, onClose }: CreateOfferDialogProps) => {
  const createOffer = useCreateOffer({
    onSuccess: () => toast.success("Tạo gói thành công"),
    onError: () => toast.error("Tạo gói thất bại"),
    onSettled: handleClose,
  });

  const formHandlers = useMutationOfferForm();
  const { reset, onSubmit } = formHandlers;

  const handleSubmit = onSubmit((values: MutationOfferFormValues) => {
    createOffer.mutate(values);
  });

  function handleClose() {
    onClose();
    reset();
  }
  return (
    <Modal
      title="Tạo gói"
      centered
      opened={isOpen || createOffer.isLoading}
      onClose={handleClose}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <MutateOfferForm
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isLoading={createOffer.isLoading}
        {...formHandlers}
      />
    </Modal>
  );
};

export default CreateOfferDialog;
