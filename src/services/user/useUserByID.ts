import axiosInstance from "@/configs/axios";
import { User } from "@/types/user";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const getUserByID = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);

  return data;
};

export const useUserByID = (
  id: string,
  config: UseQueryOptions<User, unknown, User, string[]> = {}
) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByID(id),
    ...config,
  });
};
