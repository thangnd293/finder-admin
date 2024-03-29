import { useState } from "react";
import { Report } from "@/types/report";
import {
  Button,
  Group,
  Image,
  Modal,
  ScrollArea,
  Stack,
  Text,
  clsx,
} from "@mantine/core";
import UserInfo from "@/components/UserInfo";
import ImagesDialog from "@/components/ImagesDialog";

interface ReportDetailDialogProps {
  report: Report;
  isOpen: boolean;
  onClose: () => void;
  openConfirmBlockModalAction: () => void;
}
const ReportDetailDialog = ({
  report,
  isOpen,
  onClose,
  openConfirmBlockModalAction,
}: ReportDetailDialogProps) => {
  const {
    reportBy,
    reportedUser,
    reason,
    description,
    images,
    createdAt,
    isVerified,
  } = report || {};
  const [isOpenImageView, setIsOpenImageView] = useState(false);

  return (
    <>
      <Modal
        className={clsx(isOpenImageView ? "opacity-0" : "opacity-100")}
        title={
          <Text fw="bold" fz="lg">
            Chi tiết báo cáo
          </Text>
        }
        centered
        opened={isOpen}
        onClose={onClose}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {report && (
          <Stack>
            <Group position="apart">
              <div className="space-y-0.5">
                <Text fz="sm" fw="500">
                  Người báo cáo
                </Text>
                <UserInfo
                  avatar={reportBy.images?.[0]?.url}
                  name={reportBy.name}
                  email={reportBy.email}
                />
              </div>

              <div className="space-y-0.5">
                <Text fz="sm" fw="500">
                  Người bị báo cáo
                </Text>
                <UserInfo
                  avatar={reportedUser.images?.[0]?.url}
                  name={reportedUser.name}
                  email={reportedUser.email}
                />
              </div>
            </Group>
            <div>
              <Text fz="sm" fw="500">
                Lý do
              </Text>
              <Text fz="sm">{reason}</Text>
            </div>

            <div>
              <Text fz="sm" fw="500">
                Ngày báo cáo
              </Text>
              <Text fz="sm">{createdAt.prettyFullDate()}</Text>
            </div>

            <div>
              <Text fz="sm" fw="500">
                Chi tiết
              </Text>
              <Text fz="sm">{description}</Text>
            </div>

            <div className="space-y-0.5">
              <Text fz="sm" fw="500">
                Ảnh kèm theo
              </Text>
              {images.length > 0 ? (
                <div
                  className="flex gap-0.5 cursor-pointer"
                  onClick={setIsOpenImageView.bind(null, true)}
                >
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      width={60}
                      height={60}
                      radius="xs"
                      src={image.url}
                      withPlaceholder
                    />
                  ))}
                </div>
              ) : (
                <Text fz="sm">Không có ảnh</Text>
              )}
            </div>

            {!isVerified ? (
              <div className="flex gap-4 w-full">
                <Button onClick={onClose} variant="light" className="w-full">
                  Huỷ
                </Button>
                <Button
                  className="w-full"
                  onClick={openConfirmBlockModalAction}
                >
                  Chặn
                </Button>
              </div>
            ) : (
              <Button disabled={isVerified}>Đã xử lý</Button>
            )}
          </Stack>
        )}
      </Modal>

      <ImagesDialog
        isOpen={isOpenImageView}
        images={images.map((i) => i.url)}
        onClose={setIsOpenImageView.bind(null, false)}
      />
    </>
  );
};

export default ReportDetailDialog;
