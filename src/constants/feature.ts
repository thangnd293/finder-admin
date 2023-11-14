import { Feature, LimitType, RefreshIntervalUnit } from "@/types/offer";
import { SelectItem } from "@mantine/core";

export const FEATURES: Pick<Feature, "name" | "type" | "iconUrl" | "text">[] = [
  {
    name: "Hide ads",
    type: LimitType.UNLIMITED,
    iconUrl:
      "https://res.cloudinary.com/giangnguyen/image/upload/v1698466386/svgviewer-png-output_1_eizfgz.png",
    text: "string",
  },
  {
    name: "UnBlur",
    type: LimitType.UNLIMITED,
    iconUrl:
      "https://res.cloudinary.com/giangnguyen/image/upload/v1698466386/svgviewer-png-output_1_eizfgz.png",
    text: "string",
  },
  {
    name: "Like",
    type: LimitType.UNLIMITED,
    iconUrl:
      "https://res.cloudinary.com/giangnguyen/image/upload/v1698466386/svgviewer-png-output_1_eizfgz.png",
    text: "string",
  },
  {
    name: "Boosts",
    type: LimitType.RENEWABLE,
    iconUrl:
      "https://res.cloudinary.com/giangnguyen/image/upload/v1698466386/svgviewer-png-output_1_eizfgz.png",
    text: "string",
  },
  {
    name: "Super like",
    type: LimitType.RENEWABLE,
    iconUrl:
      "https://res.cloudinary.com/giangnguyen/image/upload/v1698466386/svgviewer-png-output_1_eizfgz.png",
    text: "string",
  },
  {
    name: "Rewind",
    type: LimitType.UNLIMITED,
    iconUrl:
      "https://res.cloudinary.com/giangnguyen/image/upload/v1698466386/svgviewer-png-output_1_eizfgz.png",
    text: "string",
  },
];

export const timeMap: Record<RefreshIntervalUnit, string> = {
  Minutes: "Phút",
  Hours: "Giờ",
  Day: "Ngày",
  Week: "Tuần",
  Month: "Tháng",
  Year: "Năm",
};

export const TIME_OPTIONS: SelectItem[] = [
  {
    value: "Minutes",
    label: "Phút",
  },
  {
    value: "Hours",
    label: "Giờ",
  },
  {
    value: "Day",
    label: "Ngày",
  },
  {
    value: "Week",
    label: "Tuần",
  },
  {
    value: "Month",
    label: "Tháng",
  },
  {
    value: "Year",
    label: "Năm",
  },
];
