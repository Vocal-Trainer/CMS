import firebase from "firebase/compat/app";
import moment from "moment";
import { DeepMap, FieldError } from "react-hook-form";
import {
  BannerDisplayableSegment,
  NotificationTopics,
  RemoteNotificationRecordType,
  RoleTypes,
  UserSegmantType,
} from ".";
import { theme } from "../components/theme/util/theme";
import { validationError } from "./consts";

type languageType = {
  priority: number;
  shortName: string;
  displayName: string;
};

export const getLanguages = () => {
  const english: languageType = {
    priority: 1,
    shortName: "sv",
    displayName: "Swedish",
  };
  const swedish: languageType = {
    priority: 2,
    shortName: "en",
    displayName: "English",
  };
  const languages: languageType[] = [swedish, english];
  return languages;
};

export const getRemoteNotificationTopics = () => {
  const topicOptions = [
    {
      key: NotificationTopics.Pregnancy,
      value: NotificationTopics.Pregnancy,
      display: NotificationTopics.Pregnancy,
    },
    {
      key: NotificationTopics.Children,
      value: NotificationTopics.Children,
      display: NotificationTopics.Children,
    },
    {
      key: NotificationTopics.Offer,
      value: NotificationTopics.Offer,
      display: NotificationTopics.Offer,
    },
    {
      key: NotificationTopics.Partner,
      value: NotificationTopics.Partner,
      display: NotificationTopics.Partner,
    },
    {
      key: NotificationTopics.Reminder,
      value: NotificationTopics.Reminder,
      display: NotificationTopics.Reminder,
    },
    {
      key: NotificationTopics.Update,
      value: NotificationTopics.Update,
      display: NotificationTopics.Update,
    },
  ];
  return topicOptions;
};

export const getUserSegments = () => {
  const topicOptions = [
    {
      key: UserSegmantType.childrenInMonthsBetween,
      value: UserSegmantType.childrenInMonthsBetween,
      display: "Users with children in months between",
    },
    {
      key: UserSegmantType.childrenInOddMonths,
      value: UserSegmantType.childrenInOddMonths,
      display: "Users with children in odd months",
    },
    {
      key: UserSegmantType.childrenInEvenMonths,
      value: UserSegmantType.childrenInEvenMonths,
      display: "Users with children in even months",
    },
    {
      key: UserSegmantType.pregnanciesInOrAboveWeekNumber,
      value: UserSegmantType.pregnanciesInOrAboveWeekNumber,
      display: "Users with pregnancies in weeks between",
    },
    {
      key: UserSegmantType.usersWithPartners,
      value: UserSegmantType.usersWithPartners,
      display: "Has a partner",
    },
    {
      key: UserSegmantType.usersWithSelectedTown,
      value: UserSegmantType.usersWithSelectedTown,
      display: "Has set their home town to ",
    },
    {
      key: UserSegmantType.usersWithCategorySpecified,
      value: UserSegmantType.usersWithCategorySpecified,
      display: "Has specified interest",
    },
  ];
  return topicOptions;
};

export const getMobileBannerSegments = () => {
  const topicOptions = [
    {
      key: BannerDisplayableSegment.childrenWithInMonthsRange,
      value: BannerDisplayableSegment.childrenWithInMonthsRange,
      display: "Users with children in months between",
    },
    {
      key: BannerDisplayableSegment.pregnanciesWithInWeeksRange,
      value: BannerDisplayableSegment.pregnanciesWithInWeeksRange,
      display: "Users with pregnancies in weeks between",
    },
    {
      key: BannerDisplayableSegment.hasPartner,
      value: BannerDisplayableSegment.hasPartner,
      display: "Has a partner",
    },
    {
      key: BannerDisplayableSegment.allUsers,
      value: BannerDisplayableSegment.allUsers,
      display: "All users",
    },
  ];
  return topicOptions;
};

export const formatTimeStampToDateString = (timeStamp: any) => {
  if (!timeStamp) return null;
  return moment(timeStamp?.toDate()).format("yyyy-MM-DD").toString();
};

export const formatTimeStampToMoment = (
  timeStamp: firebase.firestore.Timestamp
) => {
  if (!timeStamp) return null;
  return moment(timeStamp?.toDate());
};

export const formatTimeStampToDate = (
  timeStamp?: firebase.firestore.Timestamp
) => {
  if (!timeStamp) return null;
  return timeStamp.toDate();
};

export const formatDateStringToTimeStamp = (
  dateString: string,
  withoutTime: boolean
) => {
  if (!dateString) return null;
  const parsedTime = withoutTime
    ? parseDateWithoutTime(dateString)
    : new Date(dateString);
  return parsedTime ? firebase.firestore.Timestamp.fromDate(parsedTime) : null;
};

export const formatDate = (timeStamp: any) => {
  if (!timeStamp) return "";
  try {
    const conveted =
      timeStamp._seconds * 1000 + timeStamp._nanoseconds / 100000;
    const formatted = moment(new Date(conveted)).format("DD/MM/YYYY");
    return formatted;
  } catch (ex) {
    console.log(ex);
  }
  return "";
};

export const formatStringDate = (timeStamp: string) => {
  if (timeStamp) {
    return moment(new Date(timeStamp)).format("DD/MM/YYYY");
  }
  return "";
};

export const formatMomentToStringDate = (timeStamp: moment.Moment) => {
  if (timeStamp) {
    return timeStamp.format("DD/MM/YYYY hh:mm");
  }
  return "";
};

export const generateFormError = (error: any) => {
  const generalError = "Error occured!";
  const errorMsg: string = error?.message ?? "";
  if (!errorMsg) return generalError;
  if (errorMsg === validationError) {
    return "Fix the validation errors and try again!";
  } else {
    const serverErrorPrefix = "";
    if (!errorMsg) return `${serverErrorPrefix}${generalError}`;
    const [prefix, suffix] = errorMsg?.split(":");
    return `${serverErrorPrefix} ${
      suffix ? prefix ?? generalError : prefix ?? generalError
    }`;
  }
};

export const generateServerError = (error: any) => {
  const generalError = "Server error occured!";
  const responseMessage = error.message;
  return responseMessage ?? generalError;
};

export const getFormattedErrorMessage = (error: any) => {
  const generalError = "Error occured!";
  console.log(error);
  const errorMsg: string = error?.message ?? generalError;
  return errorMsg;
};

export const formValidationError = (errors: DeepMap<any, FieldError>) => {
  throw new Error(validationError);
};

export const getUserRoles = () => {
  const postTypes: { text: string; key: string; value: RoleTypes }[] = [
    {
      text: "moderator",
      value: RoleTypes.moderator,
      key: "moderator",
    },
    {
      text: "admin",
      value: RoleTypes.admin,
      key: "admin",
    },
    {
      text: "analytic",
      value: RoleTypes.analytic,
      key: "analytic",
    },
    {
      text: "notificationHandler",
      value: RoleTypes.notificationHandler,
      key: "analytic",
    },
  ];
  return postTypes;
};

export const generateRandomNumber = () => Math.random().toString(36).slice(2);

export const compareTexts = (firstString: string, secondString: string) => {
  return (
    firstString
      ?.toLocaleLowerCase()
      ?.localeCompare(secondString.toLocaleLowerCase()) === 0
  );
};

export const parseDateWithoutTime = (dateString: string) => {
  try {
    const parsedDate = new Date(dateString);
    return new Date(parsedDate.toDateString());
  } catch (e) {
    return null;
  }
};

export const convertBytesToMbs = (size: number) => size / 1024 ** 2;

export const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const getMaxSortOrder = <T extends { sortOrder?: number }>(
  contents: T[]
) => {
  const sortOrders = contents?.map(x => x.sortOrder);
  const maxSortOrder = Math.max(...sortOrders, -1);
  return maxSortOrder;
};

export const swapSortOrder = <T extends { sortOrder?: number }>(
  contents: T[],
  oldIndex: number,
  newIndex: number
) => {
  const sortableContents = [...contents];
  const sortOrder = sortableContents[oldIndex]?.sortOrder;
  sortableContents[oldIndex].sortOrder = sortableContents[newIndex]?.sortOrder;
  sortableContents[newIndex].sortOrder = sortOrder;
  return sortableContents;
};
