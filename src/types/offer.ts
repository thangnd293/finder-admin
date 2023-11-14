import { List } from "@/types/http";

export interface Offer {
  _id: string;
  iconUrl: string;
  text: string;
  type: string;
  packages: Package[];
  merchandising: Feature[];
  isRetail?: boolean;
  style: {
    buttonColor: string;
    buttonBackground: string;
    background: string;
    primaryColor: string;
  };
  isDeleted?: boolean;
}

export interface Package {
  amount: number;
  price: number;
  originalPrice: number;
  refreshInterval: number;
  refreshIntervalUnit: RefreshIntervalUnit;
  currency: string;
  discount: number;
  _id: string;
}

type RenewableFeature = {
  type: LimitType.RENEWABLE;
  amount: number;
  refreshInterval: number;
  refreshIntervalUnit: RefreshIntervalUnit;
};

type UnlimitedFeature = {
  type: LimitType.UNLIMITED;
  amount?: never;
  refreshInterval?: never;
  refreshIntervalUnit?: never;
};
export type Feature = {
  name: string;
  type: LimitType;
  iconUrl: string;
  text: string;
} & (RenewableFeature | UnlimitedFeature);

interface OfferMetadata {
  metadata: {
    featureGroup: Offer["merchandising"];
  };
}

export type OfferResponse = List<Offer> & OfferMetadata;

export enum MerchandisingType {
  HIDE_ADS = "Hide ads",
  LIKE = "Like",
  REWIND = "Rewind",
  SUPER_LIKE = "Super like",
  UN_BLUR = "UnBlur",
  BOOSTS = "Boosts",
}

export enum LimitType {
  UNLIMITED = "Unlimited",
  RENEWABLE = "Renewable",
}

export enum RefreshIntervalUnit {
  MINUTES = "Minutes",
  HOURS = "Hours",
  DAY = "Day",
  WEEK = "Week",
  MONTH = "Month",
  YEAR = "Year",
}

export interface PackageData
  extends Pick<
    Package,
    "originalPrice" | "refreshInterval" | "refreshIntervalUnit"
  > {}

export interface PackageRetailData
  extends Pick<Package, "originalPrice" | "amount"> {}

export interface MutateOfferPayload {
  iconUrl: string;
  text: string;
  type: string;
  packages: PackageData[];
  merchandising: Feature[];
  style: {
    background: string;
    buttonBackground: string;
    buttonColor: string;
    primaryColor: string;
  };
}
