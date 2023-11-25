import { useQuery } from "@tanstack/react-query";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";

import dayjs from "dayjs";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Doughnut, Line } from "react-chartjs-2";

import { RangeTime } from "../_api/common.types";
import { BreakDown, getStatisticRevenue } from "../_api/statistic-revenue";
import { hexToRgba } from "../_utils/colors";
import generateDateObject, {
  toDataArray,
} from "../_utils/generate-date-object";
import DatePicker from "./date-picker";
import "./styles.css";
import Title from "./title";

const getRatioOfRevenue = (breakDown: Record<string, BreakDown>) => {
  const labels: string[] = [];
  const data: number[] = [];
  const colors: string[] = [];
  for (const key in breakDown) {
    if (Object.prototype.hasOwnProperty.call(breakDown, key)) {
      const element = breakDown[key];
      labels.push(element.offering.type);
      data.push(element.ratio);
      colors.push(element.offering.style.primaryColor);
    }
  }
  return { labels, data, colors };
};

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece];

const now = new Date();
const yesterdayBegin = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 7
);
const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export default function StatisticRevenue() {
  const [range, setRange] = useState<RangeTime>("Day");
  const [time, setTime] = useState<Value>([yesterdayBegin, todayEnd]);
  const { data: { breakDown, trendLine } = {} } = useQuery({
    queryKey: ["statistic-revenue", ...time, range],
    queryFn: () => {
      return getStatisticRevenue({
        typeRange: range,
        fromDate: dayjs(time[0]).format("YYYY-MM-DD"),
        toDate: dayjs(time[1]).format("YYYY-MM-DD"),
      });
    },
  });

  const dataObject = generateDateObject(
    dayjs(time[0]).format("YYYY-MM-DD"),
    dayjs(time[1]).format("YYYY-MM-DD"),
    range
  );

  const { labels, data, colors } = getRatioOfRevenue(breakDown || {});

  const dataTrendLine = Object.keys(trendLine || {}).map((key) => {
    const newDateObject = JSON.parse(JSON.stringify(dataObject));
    trendLine?.[key].data.forEach((item) => {
      newDateObject[item.date] = item.totalAmount;
    });

    return {
      title: trendLine![key].offering.type,
      data: toDataArray(newDateObject),
    };
  });

  // const total = breakDown.reduce((a, b) => a + b, 0);

  const total = Object.keys(breakDown || {}).reduce(
    (a, b) => a + breakDown![b].value,
    0
  );

  return (
    <div className="grid gap-10">
      <Title>Thống kê doanh thu</Title>
      <div className="grid grid-cols-[1fr_2fr] gap-10">
        <DatePicker
          range={range}
          setRange={setRange}
          setTime={setTime}
          time={time}
        />

        <div className="grid items-center w-full">
          <div className="flex justify-between h-full">
            {breakDown &&
              Object.keys(breakDown).map((key) => {
                const { offering, value } = breakDown[key];
                return (
                  <div
                    key={key}
                    className="flex justify-center flex-col items-center w-full gap-3 last:border-r-2 border-l-2 border-neutral-300 border-solid h-full"
                  >
                    <div className="gap-3 flex items-center">
                      <img
                        className="h-10 object-cover"
                        src={offering.iconUrl}
                        alt="iconUrl"
                      />
                      <p
                        style={{ color: offering.style.primaryColor }}
                        className="text-2xl font-semibold"
                      >
                        {offering.type}
                      </p>
                    </div>
                    <span className="text-2xl font-medium text-neutral-600">
                      {value / 1000}K
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-10">
        <div className="w-full relative">
          <div className="absolute top-[44%] left-[43%] -translate-x-1/2 -translate-y-1/2 ">
            <div className="text-2xl font-semibold">{total / 1000}K</div>
          </div>
          <Doughnut
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Percentage:",
                  data: data,
                  backgroundColor: colors.map((color) => hexToRgba(color)),
                  borderColor: colors.map((color) => hexToRgba(color, 0.5)),
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom" as const,
                },
              },
            }}
            data={{
              labels: toDataArray(dataObject),
              datasets: dataTrendLine.map((item, index) => ({
                label: item.title,
                data: item.data,
                backgroundColor: hexToRgba(colors[index], 0.5),
                borderColor: hexToRgba(colors[index]),
              })),
            }}
          />
        </div>
      </div>
    </div>
  );
}
