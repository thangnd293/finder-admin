import axiosInstance from "@/configs/axios";
import { Error } from "@/types/http";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const login = async ({ email, password }: LoginPayload) => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/admin/login",
    {
      email: email,
      password: password,
    }
  );

  return data;
};

export const useLogin = (
  config: UseMutationOptions<
    LoginResponse,
    AxiosError<Error>,
    LoginPayload,
    unknown
  > = {}
) => {
  return useMutation({
    mutationFn: login,
    ...config,
  });
};
