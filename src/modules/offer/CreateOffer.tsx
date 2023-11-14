import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateOfferDialog from "./CreateOfferDialog";

const CreateOffer = () => {
  const [isOpen, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} variant="filled">
        Tạo gói
      </Button>
      <CreateOfferDialog isOpen={isOpen} onClose={close} />
    </>
  );
};

export default CreateOffer;
