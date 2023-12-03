import {
  ActionType,
  getActionStatistic,
} from "@/pages/dashboard/_api/action-statistic";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { RangeTime } from "../_api/common.types";
import generateDateObject, {
  toDataArray,
  toKeyArray,
} from "../_utils/generate-date-object";
import DatePicker from "./date-picker";
import Title from "./title";

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece];

const now = new Date();
const yesterdayBegin = new Date(now.getFullYear(), now.getMonth(), 1);
const todayEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

function ActionStatisticChart({
  title,
  type,
}: {
  title: string;
  type: ActionType;
}) {
  const [range, setRange] = useState<RangeTime>("Day");
  const [time, setTime] = useState<Value>([yesterdayBegin, todayEnd]);

  const { data = [] } = useQuery({
    queryKey: ["action-statistic", type, ...time, range],
    queryFn: () => {
      return getActionStatistic(type)({
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

  const dataArray = (() => {
    const newDataArray = JSON.parse(
      JSON.stringify(dataObject)
    ) as typeof dataObject;
    data?.forEach((item) => {
      const day = item.date.toString();
      newDataArray[day] = item.count;
    });

    return toDataArray(newDataArray);
  })();

  return (
    <div className="flex flex-col gap-10 h-full">
      <Title>{title}</Title>
      <div className="flex flex-col gap-2 grow">
        <DatePicker
          range={range}
          setRange={setRange}
          setTime={setTime}
          time={time}
        />
        <div className="flex grow items-end">
          <Line
            options={{
              plugins: {
                legend: {
                  position: "bottom" as const,
                },
              },
            }}
            data={{
              labels: toKeyArray(dataObject),
              datasets: [
                {
                  data: dataArray,
                  backgroundColor: "#3B82F6",
                  borderColor: "#a3c6ff",
                  label: title,
                  tension: 0.4,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
// #3B82F6
const list = [
  {
    type: "appointment",
    title: "Số lượt hẹn",
  },
  {
    type: "like",
    title: "Số lượt thích",
  },
  {
    type: "matched",
    title: "Số lượt ghép đôi",
  },
  {
    type: "passes",
    title: "Số lượt bỏ qua",
  },
] satisfies Array<{ type: ActionType; title: string }>;

export default function ActionStatistic() {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(500px,_1fr))]">
      {list.map((item) => (
        <div className="bg-white p-6 rounded-md" key={item.type}>
          <ActionStatisticChart title={item.title} type={item.type} />
        </div>
      ))}
    </div>
  );
}
