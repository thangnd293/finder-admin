import axiosInstance from "@/configs/axios";
import { MutateOfferPayload } from "@/types/offer";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useInvalidateOffers } from "./useOffers";

const createOffer = async (payload: MutateOfferPayload) => {
  const { data } = await axiosInstance.post("/offering", payload);
  return data;
};

export const useCreateOffer = (
  config: UseMutationOptions<any, unknown, MutateOfferPayload, unknown> = {}
) => {
  const invalidateOffers = useInvalidateOffers();

  return useMutation({
    mutationFn: createOffer,
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      invalidateOffers();
    },
  });
};
