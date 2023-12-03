import axiosInstance from "@/configs/axios";

export interface UserStatistic {
  ageGroup: Group[];
  genderGroup: {
    male: {
      count: number;
      percentage: number;
    };
    female: {
      count: number;
      percentage: number;
    };
  };
  totalCount: number;
}

export interface Group {
  _id: string;
  count: number;
  percentage: number;
}

export const getUserStatistic = async (): Promise<UserStatistic> => {
  const { ageGroup, totalCount, genderGroup } = await axiosInstance
    .get<{
      ageGroup: Group[];
      genderGroup: Group[];
      totalCount: number;
    }>(`/users/distribution`)
    .then((res) => res.data);

  return {
    ageGroup,
    totalCount,
    genderGroup: {
      female: genderGroup.find((item) => item._id === "female") as any,
      male: genderGroup.find((item) => item._id === "male") as any,
    },
  };
};
