import axiosInstance from "@/configs/axios";
import PageLayout from "@/layouts/PageLayout";
import { Button, Pagination, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
dayjs.extend(utc);

type Feedback = {
  results: Result[];
  pagination: Pagination;
};

type MessageCall = {
  totalCount: number;
  avgDuration: number;
  maxDurationCall: number;
};

const messageCallMap = {
  totalCount: {
    title: "Tổng số cuộc gọi",
    prefix: "",
  },
  avgDuration: {
    title: "Thời gian trung bình",
    prefix: "phút",
  },
  maxDurationCall: {
    title: "Thời gian gọi dài nhất",
    prefix: "phút",
  },
} as const;

type Pagination = {
  currentPage: number;
  currentSize: number;
  totalCount: number;
  totalPage: number;
  prevPage: null;
  nextPage: null;
};

type Result = {
  messageId: string;
  rating: number;
  content: string;
  createdBy: CreatedBy;
  createdAt?: Date;
};

type CreatedBy = {
  id: string;
  name: string;
  images: Image[];
};

type Image = {
  url: string;
  blur: string;
};

type MessageRating = {
  avgRating: number;
  totalRating: number;
} & {
  [key: `totalRating${number}`]: number;
};

const objectKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as Array<keyof T>;

const RatingPercent = ({
  value,
  size = 24,
  isPercent,
}: {
  value: number;
  size?: number;
  isPercent?: boolean;
}) => {
  // phần dư
  const remainder = value % 1;
  // phần nguyên
  const round = value - remainder;

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          className={clsx([
            index < round ? "text-yellow-400" : "text-gray-300",
            {
              "fill-[url(#grad)]": index === round && isPercent,
            },
          ])}
          size={size}
          key={index}
        />
      ))}
      {isPercent && (
        <svg
          className="opacity-0 invisible absolute z-[-1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <linearGradient
            id="grad"
            x1="0%"
            y1="0%"
            x2={`${remainder * 100}%`}
            y2="0%"
          >
            <stop
              offset="100%"
              style={{ stopColor: "rgb(250 204 21)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(209 213 219)", stopOpacity: 1 }}
            />
          </linearGradient>
        </svg>
      )}
    </div>
  );
};

export default function Page() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("Recent");
  const [rating, setRating] = useState<string>("0");

  const { data: messageRating } = useQuery({
    queryKey: ["message/rating"],
    initialData: {} as MessageRating,
    queryFn: async () => {
      return await axiosInstance
        .get<MessageRating>("/message/rating")
        .then((res) => res.data);
    },
  });

  const { data: feedback, isLoading } = useQuery({
    queryKey: ["message/reviews", page, sort, rating],
    initialData: {
      pagination: {},
      results: [],
    } as unknown as Feedback,
    queryFn: async () => {
      return await axiosInstance
        .get<Feedback>("/message/reviews", {
          params: {
            page: page,
            size: 6,
            ...(sort && { sort: sort }),
            ...(rating !== "0" && { rating: rating }),
          },
        })
        .then((res) => res.data);
    },
  });

  const { data: messageCall } = useQuery({
    queryKey: ["message/call"],
    initialData: {} as MessageCall,
    queryFn: async () => {
      return await axiosInstance
        .get<MessageCall>("/message/call")
        .then((res) => res.data);
    },
  });

  return (
    <PageLayout isContainer={false} header="Phản hồi về chất lượng cuộc gọi">
      <div className="grid gap-6">
        <div className="grid grid-cols-3 justify-center gap-14">
          {objectKeys(messageCall).map((key) => (
            <div
              key={key}
              className="grid gap-3 bg-white px-6 py-4 rounded-md shadow-sm border-border border border-solid"
            >
              <p className="text-xl font-semibold">
                {messageCallMap[key].title}
              </p>
              <p className="text-4xl font-semibold">
                {Math.round(messageCall[key] * 100) / 100}{" "}
                {messageCallMap[key].prefix}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-10 container mx-auto px-8 py-5 shadow-sm bg-white border-border border border-solid rounded-md">
          <div className="flex gap-28 items-center">
            <div className="grid gap-5">
              <p className="">
                <span className="font-semibold text-6xl">
                  {Math.round(messageRating.avgRating * 100) / 100}
                </span>
                <span></span>
                <span className="text-4xl text-gray-600 font-medium">/5</span>
              </p>
              <div className="grid gap-2">
                <RatingPercent isPercent value={messageRating.avgRating} />
                <span className="text-md font-medium text-gray-500">
                  {messageRating.totalRating} đánh giá
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              {Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-6 items-center">
                        <RatingPercent value={5 - index} size={20} />
                        <div className="flex gap-3 items-center">
                          <div
                            style={
                              {
                                "--width": `${
                                  (messageRating[`totalRating${5 - index}`] /
                                    messageRating.totalRating) *
                                  100
                                }%`,
                              } as any
                            }
                            className={clsx([
                              "w-[200px] h-[16px] bg-gray-200",
                              "relative text-sm font-medium",
                              "before:content-[''] before:absolute before:left-0  before:w-[--width] before:h-[16px] before:bg-yellow-400",
                            ])}
                          ></div>
                          <span className="text-sm font-medium text-gray-600">
                            {messageRating[`totalRating${5 - index}`]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="flex items-end justify-between pb-4 border-b border-gray-300 border-solid">
              <h3 className="text-2xl font-semibold">Feedback</h3>
              <div className="flex gap-4">
                <Select
                  className="w-[140px]"
                  label="Sắp xếp"
                  defaultValue={"0"}
                  data={[
                    { label: "Gần đây", value: "Recent" },
                    { label: "Cao đến thấp", value: "High to low" },
                    { label: "Thấp đến cao", value: "Low to high" },
                  ]}
                  value={sort}
                  onChange={(value) => value && setSort(value)}
                  withinPortal
                />
                <Select
                  className="w-[100px]"
                  label="Số sao"
                  defaultValue={"0"}
                  data={[
                    { label: "Tất cả", value: "0" },
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                  ]}
                  value={rating}
                  onChange={(value) => value && setRating(value)}
                  withinPortal
                />
              </div>
            </div>
            <div className="grid gap-3">
              {feedback.results.map((item, index) => (
                <div
                  className="grid gap-3 border-b border-solid border-gray-200 pb-3"
                  key={item.createdBy.name + item.messageId + index}
                >
                  <div className="flex justify-between items-center">
                    <RatingPercent size={20} value={item.rating} />
                    <span className="text-gray-600">
                      {dayjs(item.createdAt).locale("vi").from(dayjs())}
                    </span>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.createdBy.images[0].url}
                        alt=""
                      />
                      <p className="text-lg font-semibold">
                        {item.createdBy.name}
                      </p>
                    </div>
                    <p
                      className={clsx([
                        item.content
                          ? "text-gray-600 font-medium"
                          : "text-gray-400",
                      ])}
                    >
                      {item.content || "Không có nhận xét"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {feedback.results.length === 0 && (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-400 text-2xl">Không có dữ liệu</p>
              </div>
            )}

            {isLoading && (
              <div className="h-[300px] flex items-center justify-center">
                <Button loading variant="white" size="xl" />
              </div>
            )}

            {!isLoading && (
              <div className="mx-auto">
                <Pagination
                  total={feedback.pagination.totalPage}
                  value={page}
                  onChange={setPage}
                  mt="sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
