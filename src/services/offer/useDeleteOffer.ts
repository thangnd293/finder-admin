import axiosInstance from "@/configs/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useInvalidateOffers } from "./useOffers";

const deleteOffer = async (id: string) => {
  const { data } = await axiosInstance.delete(`/offering/${id}`);
  return data;
};

export const useDeleteOffer = (
  config: UseMutationOptions<any, unknown, string, unknown> = {}
) => {
  const invalidateOffers = useInvalidateOffers();

  return useMutation({
    mutationFn: deleteOffer,
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      invalidateOffers();
    },
  });
};
