import axiosInstance from "@/configs/axios";
import { User } from "@/types/user";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getCurrentUserKey = () => ["user", "current"];

export const useCurrentUser = <TData = User>(
  options?: UseQueryOptions<User, AxiosError, TData>
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
  const { data } = await axiosInstance.get<User>("/users/current-user");

  return data;
};
