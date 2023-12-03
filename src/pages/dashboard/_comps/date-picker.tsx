import { Select } from "@mantine/core";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { RangeTime, rangeTimes } from "../_api/common.types";
import dayjs from "dayjs";

export type ValuePiece = Date | null;
export type Value = [ValuePiece, ValuePiece];

type DateProps = {
  setRange: React.Dispatch<React.SetStateAction<RangeTime>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTime: ((value: any) => void) | undefined;
  time: Value;
  range: RangeTime;
};

const snippets: Record<
  string,
  { title: string; type: RangeTime; value: [any, any] }
> = {
  "this-week": {
    title: "Tuần này",
    type: "Day",
    value: [dayjs().startOf("week").add(1, "day").toDate(), dayjs().toDate()],
  },
  "this-month": {
    title: "Tháng này",
    type: "Day",
    value: [dayjs().startOf("month").toDate(), dayjs().endOf("month").toDate()],
  },
  "this-year": {
    title: "Năm nay",
    type: "Month",
    value: [dayjs().startOf("year").toDate(), dayjs().endOf("year").toDate()],
  },

  "last-week": {
    title: "Tuần trước",
    type: "Day",
    value: [
      dayjs().subtract(1, "week").startOf("week").add(1, "day").toDate(),
      dayjs().subtract(1, "week").endOf("week").add(1, "day").toDate(),
    ],
  },
  "last-month": {
    title: "Tháng trước",
    type: "Day",
    value: [
      dayjs().subtract(1, "month").startOf("month").toDate(),
      dayjs().subtract(1, "month").endOf("month").toDate(),
    ],
  },

  "three-months-ago": {
    title: "3 tháng gần đây",
    type: "Week",
    value: [
      dayjs().subtract(3, "month").startOf("month").toDate(),
      dayjs().endOf("month").toDate(),
    ],
  },
};

const objectKeys = <T extends Record<string, unknown>>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

export default function DatePicker({
  range,
  setRange,
  setTime,
  time,
}: DateProps) {
  return (
    <div className="flex items-end flex-col gap-3">
      <p className="font-medium">Chọn khoảng thời gian</p>
      <div className="flex items-end gap-6">
        <Select
          placeholder="Day"
          defaultValue="Month"
          data={rangeTimes}
          value={range}
          onChange={(value: RangeTime) => {
            setRange(value);
          }}
        />
        <DateRangePicker
          locale="vi"
          format="dd/MM/yyyy"
          calendarAriaLabel="Toggle calendar"
          clearAriaLabel="Clear value"
          dayAriaLabel="Day"
          monthAriaLabel="Month"
          nativeInputAriaLabel="Date"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(value: any) => {
            console.log("🚀 ~ file: date-picker.tsx:94 ~ value:", value);

            setTime?.(value);
          }}
          value={time}
          yearAriaLabel="Year"
          clearIcon={null}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {objectKeys(snippets).map((key) => {
          const snippet = snippets[key].value.map((item) =>
            dayjs(item).toDate()
          );

          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                console.log("snippet", snippet);
                setTime?.(snippet as any);
                setRange(snippets[key].type);
              }}
              className="text-[12px] text-neutral-600 hover:text-neutral-500 cursor-pointer bg-neutral-100 rounded-sm p-1 border border-solid"
            >
              {snippets[key].title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
