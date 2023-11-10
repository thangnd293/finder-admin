import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import "dayjs/locale/vi";

declare global {
  interface String {
    capitalizeFirstLetter(): string;
    fromNow(): string;
    prettyDate(): string;
    prettyFullDate(): string;
    truncate(length: number): string;
  }
}

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.prettyDate = function () {
  const date = dayjs(this.toString());
  return date.locale("vi").format("DD MMMM YYYY");
};

String.prototype.prettyFullDate = function () {
  const date = dayjs(this.toString());
  return date.locale("vi").format("HH:mm DD MMMM YYYY");
};

String.prototype.fromNow = function () {
  return dayjs(String(this)).locale("vi").fromNow();
};

String.prototype.truncate = function (length: number) {
  return this.length > length
    ? this.substring(0, length) + "..."
    : this.toString();
};

export {};
