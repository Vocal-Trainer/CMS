import firebase from "firebase/compat/app";
import moment from "moment";
import { DeepMap, FieldError } from "react-hook-form";
import { RoleTypes } from ".";
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
