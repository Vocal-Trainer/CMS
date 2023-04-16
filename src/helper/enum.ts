import { ScreenInMobile } from "./../utils/commonEnums";

export const ScreenInMobileToReadable = (value: string | ScreenInMobile) => {
  switch (value as unknown as ScreenInMobile) {
    case ScreenInMobile.Child:
      return "Home (Child)";
    case ScreenInMobile.Pregnancy:
      return "Home (Pregnancy)";
    case ScreenInMobile.Discover:
      return "Discover";
    default:
      return "";
  }
};
