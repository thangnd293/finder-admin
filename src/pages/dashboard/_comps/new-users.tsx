import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { RangeTime } from "../_api/common.types";
import { getNewUsers } from "../_api/new-users";
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

export default function NewUsers() {
  const [range, setRange] = useState<RangeTime>("Day");
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

  const dataNewUsers = (() => {
    const newDateObject = JSON.parse(
      JSON.stringify(dataObject)
    ) as typeof dataObject;
    data?.forEach((item) => {
      const day = item.date.toString();
      newDateObject[day] = item.count;
    });

    return toDataArray(newDateObject);
  })();

  return (
    <div className="flex flex-col gap-10 h-full">
      <Title>Số người đăng ký mới</Title>
      <div className="flex flex-col gap-2 grow">
        <DatePicker
          range={range}
          setRange={setRange}
          setTime={setTime}
          time={time}
        />
        <div className="flex grow items-end">
          <Bar
            options={{
              responsive: true,

              plugins: {
                legend: {
                  position: "top" as const,
                  display: false,
                },
                title: {
                  display: true,
                },
              },
            }}
            data={{
              labels: toKeyArray(dataObject),
              datasets: [
                {
                  label: "Số người đăng ký mới",
                  data: dataNewUsers,
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
