import axiosInstance from "@/configs/axios";
import { ChartParams } from "./common.types";

export interface StatisticRevenueResponse {
  trendLine: { [key: string]: TrendLine };
  breakDown: { [key: string]: BreakDown };
}

export interface BreakDown {
  ratio: number;
  value: number;
  offering: Offering;
}

export interface Offering {
  _id: string;
  iconUrl: string;
  type: string;
  text: string;
  style: Style;
}

export interface Style {
  buttonColor: string;
  buttonBackground: string;
  background: string;
  primaryColor: string;
  chartColor: string;
}

export interface TrendLine {
  data: Datum[];
  offering: Offering;
}

export interface Datum {
  date: string;
  totalAmount: number;
}

export const getStatisticRevenue = async (
  params: ChartParams
): Promise<StatisticRevenueResponse> => {
  return axiosInstance
    .get("/admin/billing/statistic-revenue", {
      params,
    })
    .then((res) => res.data);
};
