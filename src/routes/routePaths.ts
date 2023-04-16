import { cms } from "./routeConsts";
export function GetCms() {
  return cms;
}

export const newRoute = "new";
export const changeorder = "changeorder";
export function GetBlogPostPregnancyRoute() {
  return `new?type=pregnancy`;
}

export function GetBlogPostChildRoute() {
  return `new?type=child`;
}

export function GetBlogPostBirthRoute() {
  return `new?type=birth`;
}

export function GetGeneralBlogPostRoute() {
  return `new?type=general`;
}
