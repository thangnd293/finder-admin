import { Offer } from "@/types/offer";
import WholesaleDetailDialog from "./WholesaleDetailDialog";
import RetailDetailDialog from "./RetailDetailDialog";

interface CreateOfferDialogProps {
  offer?: Offer;
  isOpen: boolean;
  isEditing?: boolean;
  onClose: () => void;
}
const OfferDetailDialog = (props: CreateOfferDialogProps) => {
  const Dialog = props.offer?.isRetail
    ? RetailDetailDialog
    : WholesaleDetailDialog;

  return <Dialog {...props} />;
};

export default OfferDetailDialog;
