import UserInfo from "@/components/UserInfo";
import { DatingReview, DatingStatus } from "@/types/dating";
import { User } from "@/types/user";
import { Badge, Stack, Text } from "@mantine/core";

interface ContentReviewProps extends DatingReview {
  reviewer: User;
}

const ContentReview = ({
  reviewer,
  isJoin,
  detail,
  datingStatus,
}: ContentReviewProps) => {
  const questions = detail.map((item) => (
    <div key={item.question}>
      <Text fz="sm" fw="500">
        {item.question}
      </Text>
      <Text fz="sm" c="gray.7">
        {item.answer || "Không có câu trả lời"}
      </Text>
    </div>
  ));

  return (
    <Stack spacing={10}>
      <UserInfo
        name={reviewer.name}
        email={reviewer.email}
        avatar={reviewer.images?.[0]?.url}
      />
      {isJoin ? (
        <>
          {questions}

          <div>
            <Text fz="sm" fw="500">
              Kết quả
            </Text>
            <DatingStatusBadge status={datingStatus} />
          </div>
        </>
      ) : (
        <Badge color="red">Không tham gia</Badge>
      )}
    </Stack>
  );
};

export default ContentReview;

const DatingStatusBadge = ({ status }: { status: DatingStatus }) => {
  switch (status) {
    case DatingStatus.HALFWAY:
      return (
        <Badge radius="xs" color="orange">
          Còn phân vân
        </Badge>
      );
    case DatingStatus.YES:
      return (
        <Badge radius="xs" color="green">
          Bật đèn xanh
        </Badge>
      );
    case DatingStatus.NO:
      return (
        <Badge radius="xs" color="red">
          Không muốn tiến tới
        </Badge>
      );
  }
};
