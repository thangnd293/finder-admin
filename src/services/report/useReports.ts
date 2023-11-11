import axiosInstance from "@/configs/axios";
import { List } from "@/types/http";
import { Report } from "@/types/report";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const getAllReport = async () => {
  const { data } = await axiosInstance.get<List<Report>>(
    "/report?page=1&size=100"
  );
  return data;
};

export const useReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getAllReport,
  });
};

export const useInvalidateReports = () => {
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["reports"],
    });
  }, [queryClient]);
};
