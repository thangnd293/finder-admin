import { Image, User } from "./user";

export interface Report {
  _id: string;
  reportedUser: User;
  reportBy: User;
  reason: string;
  description: string;
  images: Image[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
