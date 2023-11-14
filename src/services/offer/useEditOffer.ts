import axiosInstance from "@/configs/axios";
import { MutateOfferPayload } from "@/types/offer";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useInvalidateOffers } from "./useOffers";

interface EditOfferPayload extends MutateOfferPayload {
  offerID: string;
}
const editOffer = async ({ offerID, ...payload }: EditOfferPayload) => {
  const { data } = await axiosInstance.patch(`/offering/${offerID}`, payload);
  return data;
};

export const useEditOffer = (
  config: UseMutationOptions<any, unknown, EditOfferPayload, unknown> = {}
) => {
  const invalidateOffers = useInvalidateOffers();

  return useMutation({
    mutationFn: editOffer,
    ...config,
    onSuccess: (...args) => {
      config.onSuccess?.(...args);
      invalidateOffers();
    },
  });
};
