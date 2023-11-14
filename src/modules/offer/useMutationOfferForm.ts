import { Feature, PackageData } from "@/types/offer";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

export interface MutationOfferFormValues {
  iconUrl: string;
  type: string;
  text: string;
  style: {
    background: string;
    buttonBackground: string;
    buttonColor: string;
    primaryColor: string;
  };
  packages: PackageData[];
  merchandising: Feature[];
}

const useMutationOfferForm = (initialValues?: MutationOfferFormValues) => {
  const formHandlers = useForm<MutationOfferFormValues>({
    initialValues: initialValues ?? {
      iconUrl: "",
      type: "",
      text: "",
      style: {
        background: "",
        buttonBackground: "",
        buttonColor: "",
        primaryColor: "",
      },
      packages: [],
      merchandising: [],
    },
    validate: {
      iconUrl: isNotEmpty("Vui lòng chọn icon"),
      type: isNotEmpty("Vui lòng nhập tên dịch vụ"),
      text: isNotEmpty("Vui lòng nhập mô tả"),
      style: {
        background: isNotEmpty("Vui lòng nhập màu nền"),
        buttonBackground: isNotEmpty("Vui lòng nhập màu nền của nút"),
        buttonColor: isNotEmpty("Vui lòng nhập màu chữ của nút"),
        primaryColor: isNotEmpty("Vui lòng nhập màu chữ"),
      },
      packages: hasLength({ min: 1 }, "Vui lòng chọn ít nhất 1 gói"),
      merchandising: hasLength({ min: 1 }, "Vui lòng chọn ít nhất 1 đặc quyền"),
    },
  });

  useEffect(() => {
    if (initialValues) {
      formHandlers.setValues(initialValues);
    }
  }, [initialValues]);

  return formHandlers;
};

export default useMutationOfferForm;
