import { Tag } from "./tag";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum LookingFor {
  Male = "Male",
  Female = "Female",
  All = "All",
}

export enum ModeGoal {
  Date = "Date",
  BFF = "Bff",
}

export interface Discovery {
  minAge: number;
  maxAge: number;
  distance: number;
  onlyShowAgeThisRange: boolean;
  onlyShowDistanceThisRange: boolean;
  lookingFor: LookingFor;
  recentlyActive: boolean;
  modeGoal: ModeGoal;
}

export interface HiddenProfile {
  inFinder: boolean;
  weight: boolean;
  height: boolean;
}

export interface Image {
  url: string;
  blur?: string;
}

interface SpotifyArtist {
  artist: string;
  image: Image;
}

interface Address {
  country: string;
  district: string;
  fullAddress: string;
  province: string;
  route: string;
}

export interface User {
  _id: string;
  name: string;
  images: Image[];
  insImages?: Image[];
  spotifyInfo?: SpotifyArtist[];
  bio?: string;
  stepStarted: number;
  gender: Gender;
  age: number;
  homeTown: {
    province: string;
  };
  liveAt: {
    province: string;
  };
  birthDate: string;
  setting: {
    discovery: Discovery;
    hiddenProfile: HiddenProfile;
  };
  tags: Tag[];
  phoneNumber?: string;
  email?: string;
  height?: number;
  weight?: number;
  address?: Address;
  blurAvatar: string;
  school?: string;
  totalFinishProfile: number;
  geoLocation: {
    coordinates: number[];
    type: string;
  };
  boostsSession: {
    amount: number;
    expiredDate: string;
    refreshInterval: number;
  };
  isVerifiedFace: boolean;
  calcDistance?: number;
  featureAccess: {
    name: string;
    unlimited: boolean;
    amount: 0;
    expiredDate: string;
  }[];
}
