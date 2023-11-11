import { User } from "./user";

export interface Dating {
  _id: string;
  description: string;
  locationDating: string[];
  receiver: User;
  sender: User;
  createdAt: string;
  updatedAt: string;
  reviewDatingStatus: ReviewDatingStatus;
  appointmentDate: string;
  reviews: DatingReview[];
}

export enum ReviewDatingStatus {
  SUCCESS = "Success",
  WAIT_FOR_REVIEW = "Wait for review",
  FAILED = "Failed",
  NOT_JOINING = "Not joining",
  HALFWAY = "Halfway",
}

export enum DatingStatus {
  YES = "Yes",
  NO = "No",
  HALFWAY = "Halfway",
}

export interface DatingReview {
  createdBy: string;
  detail: {
    question: string;
    answer: string;
  }[];
  createdAt: string;
  isJoin: boolean;
  datingStatus: DatingStatus;
}
