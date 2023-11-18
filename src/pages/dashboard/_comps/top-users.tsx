import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { RangeTime } from "../_api/common.types";
import { getTopUsers } from "../_api/top-users";
import { randomColor } from "../_utils/colors";
import { default as DatePicker } from "./date-picker";
import Title from "./title";

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece];

const now = new Date();
const yesterdayBegin = new Date(now.getFullYear(), 0, 1);
const todayEnd = new Date(now.getFullYear(), 11, 1);

export default function NewUsers() {
  const [range, setRange] = useState<RangeTime>("Month");
  const [time, setTime] = useState<Value>([yesterdayBegin, todayEnd]);
  const { data = [] } = useQuery({
    queryKey: ["top-users", ...time, range],
    queryFn: () => {
      return getTopUsers({
        typeRange: range,
        fromDate: dayjs(time[0]).format("YYYY-MM-DD"),
        toDate: dayjs(time[1]).format("YYYY-MM-DD"),
      });
    },
  });

  return (
    <div className="grid gap-10">
      <Title>Bảng xếp hạng người dùng</Title>
      <div className="grid gap-2">
        <DatePicker
          range={range}
          setRange={setRange}
          setTime={setTime}
          time={time}
        />
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
                position: "bottom" as const,
              },
              title: {
                display: true,
              },
            },
          }}
          data={{
            labels: data.map((item) => item.userInfo.name),
            datasets: [
              {
                data: data.map((item) => item.totalAmount),
                backgroundColor: randomColor(data.length, "4"),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
