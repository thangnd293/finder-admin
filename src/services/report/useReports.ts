import axiosInstance from "@/configs/axios";
import { List } from "@/types/http";
import { Report } from "@/types/report";
import { useQuery } from "@tanstack/react-query";

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
