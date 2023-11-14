import axiosInstance from "@/configs/axios";
import { List } from "@/types/http";
import { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const userKey = ["users"];

const getAllUsers = async () => {
  const { data } = await axiosInstance.get<List<User>>(
    "/users?page=1&size=100"
  );
  return data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: userKey,
    queryFn: getAllUsers,
  });
};

export const useInvalidateUsers = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: userKey,
    });
  }, [queryClient]);
};
