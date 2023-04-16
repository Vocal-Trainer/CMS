import moment from "moment";
import { Languages } from ".";
import { NUM_OF_MONTHS } from "./consts";
import { NUM_OF_WEEKS } from "./consts";

export type PickerDisplayType = {
  name: string;
  number: number;
};

export enum PickerType {
  months,
  weeks,
}

export const getMonths = (lang: Languages = Languages.swedish) => {
  const months: PickerDisplayType[] = Array.from(
    { length: NUM_OF_MONTHS },
    (_, i) => ({
      name: `${lang === Languages.swedish ? "Månad" : "Month"} ${i + 1}`,
      number: i + 1,
    })
  );

  const findNameByMonthNumber = (monthNumber: number) => {
    const name = months.find(x => x.number === +monthNumber)?.name;
    return name;
  };

  return { months, findNameByMonthNumber };
};

export const getWeeks = (lang: Languages = Languages.swedish) => {
  const weeks: PickerDisplayType[] = [];
  for (let w = 1; w <= NUM_OF_WEEKS; w++) {
    weeks.push({
      name: `${lang === Languages.swedish ? "Vecka" : "Week"} ${w}`,
      number: w,
    });
  }
  return { weeks };
};

export const resetSeconds = (time: moment.Moment | Date) => {
  return moment(time).set("second", 0);
};

export const isCurrentTimeWithinRange = (startTime: Date, endTime: Date) => {
  const currentTime = resetSeconds(moment());
  return (
    (!startTime && !endTime) ||
    (startTime &&
      endTime &&
      resetSeconds(startTime).isSameOrBefore(currentTime) &&
      resetSeconds(endTime).isSameOrAfter(currentTime))
  );
};
