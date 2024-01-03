import { getUserStatistic } from "@/pages/user-management/_api/user-statistic";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { FaUser } from "react-icons/fa";

const withRemainder = (percent: number) => percent % 1;
const withRound = (percent: number) => percent - withRemainder(percent);
export default function AgeChart() {
  const { data: { genderGroup } = {} } = useQuery({
    queryKey: ["user-statistic"],
    queryFn: getUserStatistic,
  });

  return (
    <div className="grid gap-4 items-start">
      <div className="grid gap-2">
        <p className="font-medium">Phân bổ giới tính</p>
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(10%,_1fr))] gap-y-2 justify-items-center">
            {Array.from({ length: 100 }).map((_, index) => {
              return (
                <FaUser
                  className={clsx(
                    index < (genderGroup?.male.percentage || 0)
                      ? "text-sky-500"
                      : "text-cyan-500",
                    {
                      "fill-[url(#grad)]":
                        index === withRound(genderGroup?.male.percentage || 0),
                    }
                  )}
                  size={24}
                  key={index}
                />
              );
            })}
          </div>
          <svg
            className="opacity-0 invisible absolute z-[-1]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <linearGradient
              id="grad"
              x1="0%"
              y1="0%"
              x2={`${withRemainder(genderGroup?.male.percentage || 0) * 100}%`}
              y2="0%"
            >
              <stop
                offset="100%"
                style={{ stopColor: "rgb(14 165 233)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(6 182 212)", stopOpacity: 1 }}
              />
            </linearGradient>
          </svg>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sky-500"></span>
          <div>
            <span className="font-semibold text-sm text-neutral-600">Nam</span>
            <p className="text-lg">{genderGroup?.male.percentage}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
          <div>
            <span className="font-semibold text-sm text-neutral-600">Nữ</span>
            <p className="text-lg">{genderGroup?.female.percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
