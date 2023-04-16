import _ from "lodash";

export const getMax = (a: any[] | null | undefined, key: string) => {
  if (!a || a.length === 0) {
    return 0;
  } else {
    return _.maxBy(a, key)[key];
  }
};
