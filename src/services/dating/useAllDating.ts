import axiosInstance from "@/configs/axios";
import { Dating } from "@/types/dating";
import { List } from "@/types/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const getAllDating = async () => {
  const { data } = await axiosInstance.get<List<Dating>>(
    "/schedule?page=1&size=100"
  );
  return data;
};

export const useAllDating = () => {
  return useQuery({
    queryKey: ["dating", "all"],
    queryFn: getAllDating,
  });
};

export const ussInvalidateAllDating = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(["dating", "all"]);
  }, [queryClient]);
};
