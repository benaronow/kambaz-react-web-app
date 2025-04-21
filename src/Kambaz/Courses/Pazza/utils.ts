import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const getTimeAgo = (date: Date) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

export const getDaysAgo = (date: Date) => {
  const today = new Date();
  const targetDate = new Date(date);
  const timeDifference = today.getTime() - targetDate.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

export const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const ANON_IDS = [
  "098",
  "109",
  "210",
  "321",
  "432",
  "543",
  "654",
  "765",
  "876",
  "987",
];
