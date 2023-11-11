import axiosInstance from "@/configs/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useInvalidateReports } from "./useReports";
import { toast } from "react-toastify";

const blockUser = async (userId: string) => {
  const { data } = await axiosInstance.post(`report/block/${userId}`);
  return data;
};

export const useBlockUser = (
  config: UseMutationOptions<any, unknown, string, unknown> = {}
) => {
  const invalidateReports = useInvalidateReports();

  return useMutation({
    mutationFn: blockUser,
    ...config,
    onSuccess: (...args) => {
      invalidateReports();
      toast.success("Đã chặn người dùng");
      config.onSuccess?.(...args);
    },
  });
};
