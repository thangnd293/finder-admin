import axiosInstance from "@/configs/axios";
import { ChartParams } from "@/pages/dashboard/_api/common.types";

export interface Matched {
  _id: ID;
  date: Date;
  count: number;
}

export interface ID {
  date: Date;
}

const typeOptions = {
  passes: "match-request/statistic-passes",
  like: "match-request/statistic-like",
  matched: "conversation/statistic-matched",
  appointment: "schedule/statistic-appointment",
} as const;

export type ActionType = keyof typeof typeOptions;

export const getActionStatistic =
  (type: ActionType) =>
  async (params: ChartParams): Promise<Matched[]> => {
    return await axiosInstance
      .get(`/${typeOptions[type]}`, {
        params,
      })
      .then((res) => res.data);
  };
