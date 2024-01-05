import axiosInstance from "@/configs/axios";
import { List } from "@/types/http";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const userKey = ["users"];

export type GetAllUsersPayload = {
  page: number;
  size: number;
  isBlocked?: string;
  gender?: string;
  name?: string;
  isDeleted?: string;
  createdAt?: "asc" | "desc";
  keyword?: "asc" | "desc";
};
export const getAllUsers = async (payload: GetAllUsersPayload) => {
  const { data } = await axiosInstance.get<
    Omit<List<User>, "pagination"> & {
      pagination: {
        // currentPage: number;
        // currentSize: number;
        totalCount: number;
        // totalPage: number;
      };
    }
  >("/users", {
    params: payload,
  });
  return data;
};

// export const useUsers = () => {
//   return useQuery({
//     queryKey: userKey,
//     queryFn: getAllUsers,
//   });
// };

export const useInvalidateUsers = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: userKey,
    });
  }, [queryClient]);
};
