import { getUserStatistic } from "@/pages/user-management/_api/user-statistic";
import { Tooltip } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

export default function GenderChart() {
  const { data: { ageGroup } = {} } = useQuery({
    queryKey: ["user-statistic"],
    queryFn: getUserStatistic,
  });

  return (
    <div>
      <p className="font-medium">Phân bổ tuổi</p>
      <div className="flex justify-evenly gap-4 h-full items-end pb-16">
        {ageGroup?.map((item, index) => (
          <div key={index} className="h-full flex flex-col justify-end gap-2">
            <p className="text-center text-neutral-700">{item.percentage}%</p>
            <Tooltip.Floating label={`${item.count} người dùng`} key={item._id}>
              <div
                style={{
                  maxHeight: `${item.percentage}%`,
                  opacity: `${item.percentage + 20}%`,
                }}
                className={clsx("bg-blue-500 w-16 rounded-md grow")}
              />
            </Tooltip.Floating>
            <p className="text-center font-semibold text-sm text-neutral-500  00">
              {item._id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
