import dayjs from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
// eslint-disable-next-line @typescript-eslint/ban-types
export default function generateDateObject(
  startTime: string,
  endTime: string,
  range: "Day" | "Month" | "Year" | "Week"
) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const dateObject: Record<string, number> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyData = 0;
  switch (range) {
    case "Day":
      for (
        let current = start;
        current.isBefore(end) || current.isSame(end);
        current = current.add(1, "day")
      ) {
        dateObject[current.format("YYYY-MM-DD")] = anyData;
      }
      break;
    case "Month":
      for (
        let current = start;
        current.isBefore(end) || current.isSame(end);
        current = current.add(1, "month")
      ) {
        dateObject[current.format("YYYY-MM")] = anyData;
      }
      break;
    case "Year":
      for (
        let current = start;
        current.isBefore(end) || current.isSame(end);
        current = current.add(1, "year")
      ) {
        dateObject[current.format("YYYY")] = anyData;
      }
      break;
    case "Week":
      for (
        let current = start;
        current.isBefore(end) || current.isSame(end);
        current = current.add(1, "week")
      ) {
        console.log(current);
        dateObject[current.format("gggg-WW")] = anyData;
      }
      break;
    default:
      throw new Error(
        "Invalid range. Please provide 'Day', 'Month', 'Year', or 'Week'"
      );
  }

  return Object.assign(
    {},
    {
      data: dateObject,
      toDataArray: () => {
        return Object.keys(dateObject).map((key) => dateObject[key]);
      },
      toKeyArray: () => {
        return Object.keys(dateObject).map((key) => key);
      },
    }
  );
}
