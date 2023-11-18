export const rangeTimes = [
  { value: "Day", label: "Day" },
  { value: "Week", label: "Week" },
  { value: "Month", label: "Month" },
  { value: "Year", label: "Year" },
] as const;

export type RangeTime = (typeof rangeTimes)[number]["value"];
export type ChartParams = {
  typeRange: RangeTime;
  fromDate: string;
  toDate: string;
};
