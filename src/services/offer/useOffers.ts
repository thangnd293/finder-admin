import axiosInstance from "@/configs/axios";
import { OfferResponse } from "@/types/offer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const getOffers = async () => {
  const { data } = await axiosInstance.get<OfferResponse>(
    "/offering?page=1&size=100&isDeleted=false"
  );

  return data;
};

export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
  });
};

export const useInvalidateOffers = () => {
  const queryClient = useQueryClient();

  return useCallback(() => queryClient.invalidateQueries(["offers"]), []);
};
