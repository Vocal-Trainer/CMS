export const popularMonthContentLimit = 5;
export const popularWeekContentLimit = 4;

export const isPopularContentLimitExceeded = (
  popularType: "week" | "month",
  noOfContent: number
) => {
  const isContentLimitExceeded =
    popularType === "week"
      ? noOfContent > popularWeekContentLimit
      : noOfContent > popularMonthContentLimit;
  return isContentLimitExceeded;
};
