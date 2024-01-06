import { Dating } from "@/types/dating";
import { Badge, Divider, Group, Modal, ScrollArea, Text } from "@mantine/core";
import ContentReview from "./ContentReview";

interface DatingReviewDialogProps {
  dating: Dating;
  isOpen: boolean;
  onClose: () => void;
}
const DatingReviewDialog = ({
  dating,
  isOpen,
  onClose,
}: DatingReviewDialogProps) => {
  const { sender, receiver, reviews } = dating;

  const senderReview = reviews.find(
    (review) => review.createdBy === sender._id
  );

  const receiverReview = reviews.find(
    (review) => review.createdBy === receiver._id
  );

  console.log({ senderReview, receiverReview });

  return (
    <Modal
      title="Đánh giá buổi hẹn"
      size="xl"
      centered
      opened={isOpen}
      onClose={onClose}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Group className="h-full items-start" spacing={10}>
        <div className="flex-1 space-y-1">
          <Text size="sm" weight={500}>
            Người gửi
          </Text>
          {senderReview ? (
            <ContentReview reviewer={sender} {...senderReview} />
          ) : (
            <Badge color="red">Chưa có đánh giá</Badge>
          )}
        </div>

        <Divider orientation="vertical" />

        <div className="flex-1 h-full">
          <Text size="sm" weight={500}>
            Người nhận
          </Text>
          {receiverReview ? (
            <ContentReview reviewer={receiver} {...receiverReview} />
          ) : (
            <Badge color="red">Chưa đánh giá</Badge>
          )}
        </div>
      </Group>
    </Modal>
  );
};

export default DatingReviewDialog;
