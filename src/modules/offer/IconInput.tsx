import { useCldUpload } from "@/configs/cloudinary";
import { CloseButton, Group, Image, Text, Tooltip } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { toast } from "react-toastify";

interface IconInputProps {
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}
const IconInput = ({
  value,
  error,
  disabled = true,
  onChange,
  onRemove,
}: IconInputProps) => {
  const cldUpload = useCldUpload({
    onSuccess: (res) => {
      if (disabled) return;
      onChange(res.url as string);
    },
  });

  return (
    <div>
      <Text fz="sm" fw="500">
        Icon
      </Text>
      {value ? (
        <div className="relative w-fit border border-solid border-border">
          <Image radius="sm" width={140} height={140} src={value} />
          <Tooltip label="Xóa ảnh">
            <CloseButton
              className="absolute -top-2 -right-2 z-10"
              disabled={disabled}
              radius="xl"
              variant="filled"
              onClick={onRemove}
            />
          </Tooltip>
        </div>
      ) : (
        <div>
          <Dropzone
            onDrop={(files) => {
              cldUpload.mutate(files[0]);
            }}
            onReject={() => toast.error("File không hợp lệ")}
            maxSize={3 * 1024 ** 2}
            maxFiles={1}
            accept={IMAGE_MIME_TYPE}
            disabled={disabled}
            loading={cldUpload.isLoading}
          >
            <Group position="center" c="gray">
              <Dropzone.Accept>
                <IconUpload size="2.2rem" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="2.2rem" stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="2.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="sm" align="center">
                  Chọn ảnh bạn muốn sử dụng làm Icon của dịch vụ (Kích thước tối
                  đa 3MB)
                </Text>
              </div>
            </Group>
          </Dropzone>
          {error && (
            <Text fz="sm" color="red">
              {error}
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default IconInput;
