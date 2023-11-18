import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Chart as ChartJS } from "chart.js";
import dayjs from "dayjs";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { getNewUsers } from "../_api/new-users";
import generateDateObject from "../_utils/generate-date-object";
import Title from "./title";

ChartJS.register();

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece];

const now = new Date();
const yesterdayBegin = new Date(now.getFullYear(), 0, 1);
const todayEnd = new Date(now.getFullYear(), 11, 1);

const rangeTimes = [
  { value: "Day", label: "Day" },
  { value: "Week", label: "Week" },
  { value: "Month", label: "Month" },
  { value: "Year", label: "Year" },
] as const;

type RangeTimeValue = (typeof rangeTimes)[number]["value"];

export default function NewUsers() {
  const [range, setRange] = useState<"Day" | "Week" | "Month" | "Year">(
    "Month"
  );
  const [time, setTime] = useState<Value>([yesterdayBegin, todayEnd]);
  const { data = [] } = useQuery({
    queryKey: ["new-users", ...time, range],
    queryFn: () => {
      return getNewUsers({
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

  console.log(dataObject);

  const dataNewUsers = (() => {
    const newDateObject = { ...dataObject };
    data?.forEach((item) => {
      const day = item.date.toString();
      newDateObject.data[day] = item.count;
    });

    return newDateObject.toDataArray();
  })();

  return (
    <div className="grid gap-10">
      <Title>Số người đăng ký mới</Title>
      <div className="grid gap-10">
        <div className="flex items-end flex-col">
          <p className="font-medium">Chọn khoảng thời gian</p>
          <div className="flex items-end gap-4">
            <Select
              placeholder="Day"
              defaultValue="Month"
              data={rangeTimes}
              onChange={(value: RangeTimeValue) => {
                setRange(value);
              }}
            />
            <DateRangePicker
              calendarAriaLabel="Toggle calendar"
              clearAriaLabel="Clear value"
              dayAriaLabel="Day"
              monthAriaLabel="Month"
              nativeInputAriaLabel="Date"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={setTime as unknown as any}
              value={time}
              yearAriaLabel="Year"
              clearIcon={null}
            />
          </div>
        </div>
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
              },
            },
          }}
          data={{
            labels: dataObject.toKeyArray(),
            datasets: [
              {
                label: "Số người đăng ký mới",
                data: dataNewUsers,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
        ;
      </div>
    </div>
  );
}
