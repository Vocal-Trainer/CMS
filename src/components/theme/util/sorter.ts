const defaultSort = <T>(a: T, b: T) => {
  if (isNaN(+a) && isNaN(+b)) {
    return (
      a && b && (a as unknown as string).localeCompare(b as unknown as string)
    );
  }
  const diff = (a as unknown as number) - (b as unknown as number);
  return diff ? diff / Math.abs(diff) : 0;
};

export const Sorter = {
  DEFAULT: defaultSort,
};
