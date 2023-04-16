export const valueOrNull = (value: any) => {
  if (value === undefined || value === null || value.trim() === "") {
    return null;
  }
  return value;
};
