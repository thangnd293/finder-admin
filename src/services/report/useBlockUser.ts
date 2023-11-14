import axiosInstance from "@/configs/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const blockUser = async (userId: string) => {
  const { data } = await axiosInstance.post(`report/block/${userId}`);
  return data;
};

export const useBlockUser = (
  config: UseMutationOptions<any, unknown, string, unknown> = {}
) => {
  return useMutation({
    mutationFn: blockUser,
    ...config,
    onSuccess: (...args) => {
      toast.success("Đã chặn người dùng");
      config.onSuccess?.(...args);
    },
  });
};
