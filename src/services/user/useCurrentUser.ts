import axiosInstance from "@/configs/axios";
import { Admin } from "@/types/user";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getCurrentUserKey = () => ["user", "current"];

export const useCurrentUser = <TData = Admin>(
  options?: UseQueryOptions<Admin, AxiosError, TData>
) => {
  return useQuery({
    queryKey: getCurrentUserKey(),
    queryFn: getCurrentUser,
    ...options,
  });
};

export const useCurrentUserID = () => {
  return useCurrentUser({
    select: (user) => user._id,
  });
};

export const useInvalidateCurrentUser = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: getCurrentUserKey(),
    });
  };
};

const getCurrentUser = async () => {
  const { data } = await axiosInstance.get<Admin>("/admin/current-admin");

  return data;
};
