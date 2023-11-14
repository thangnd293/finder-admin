import axiosInstance from "@/configs/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useInvalidateReports } from "./useReports";
import { toast } from "react-toastify";

const unblockUser = async (userId: string) => {
  const { data } = await axiosInstance.post(`report/unblock/${userId}`);
  return data;
};

export const useUnblockUser = (
  config: UseMutationOptions<any, unknown, string, unknown> = {}
) => {
  const invalidateReports = useInvalidateReports();

  return useMutation({
    mutationFn: unblockUser,
    ...config,
    onSuccess: (...args) => {
      invalidateReports();
      toast.success("Đã mở khoá người dùng");
      config.onSuccess?.(...args);
    },
  });
};
