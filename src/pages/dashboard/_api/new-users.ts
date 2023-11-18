import axiosInstance from "@/configs/axios";
import { ChartParams } from "./common.types";

export interface NewUsers {
  _id: ID;
  date: Date;
  count: number;
}

export interface ID {
  date: Date;
}

export const getNewUsers = async (params: ChartParams): Promise<NewUsers[]> => {
  return axiosInstance
    .get("/admin/users/statistic-user", {
      params,
    })
    .then((res) => res.data);
};
