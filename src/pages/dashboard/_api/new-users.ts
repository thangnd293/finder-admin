import axiosInstance from "@/configs/axios";
import { ChartParams } from "./common.types";

export interface NewUser {
  _id: ID;
  date: Date;
  count: number;
}

export interface ID {
  date: Date;
}

export const getNewUsers = async (params: ChartParams): Promise<NewUser[]> => {
  return axiosInstance
    .get("/admin/users/statistic-user", {
      params,
    })
    .then((res) => res.data);
};
