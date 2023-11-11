import { User } from "./user";

export interface Dating {
  _id: string;
  description: string;
  locationDating: string[];
  receiver: User;
  sender: User;
  createdAt: string;
  updatedAt: string;
  reviewDatingStatus: DatingStatus;
  appointmentDate: string;
}

export enum DatingStatus {
  SUCCESS = "Success",
  WAIT_FOR_REVIEW = "Wait for review",
  FAILED = "Failed",
  NOT_JOINING = "Not joining",
  HALFWAY = "Halfway",
}
