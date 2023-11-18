import axiosInstance from "@/configs/axios";
import { ChartParams } from "./common.types";

export interface TopUser {
  _id: ID;
  types: Type[];
  userInfo: UserInfo;
  totalAmount: number;
  totalOtherAmount: number;
  totalOtherCount: number;
}

export interface ID {
  createdBy: string;
}

export interface Type {
  type: string;
  totalAmount: number;
  count: number;
  isMonitoring: boolean;
}

export interface UserInfo {
  _id: string;
  name: string;
  images: Image[];
}

export interface Image {
  url: string;
  blur: string;
}

export const getTopUsers = async (params: ChartParams): Promise<TopUser[]> => {
  return axiosInstance
    .get("/admin/billing/top-user", {
      params,
    })
    .then((res) => res.data);
};
