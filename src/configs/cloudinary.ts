import { Cloudinary } from "@cloudinary/url-gen";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
});

const cldUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ""
  );
  const res = await fetch(
    `${import.meta.env.VITE_CLOUDINARY_API_BASE_URL}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data;
};

export const useCldUpload = (
  config: UseMutationOptions<any, unknown, File, unknown> = {}
) => {
  return useMutation(cldUpload, config);
};
