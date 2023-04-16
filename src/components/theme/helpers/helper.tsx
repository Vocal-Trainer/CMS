export const genereteTableKey = (title = "") => {
  if (title) {
    const length = title.length;
    const code = btoa(title);
    return btoa(`${code}/${length}`);
  }
  return null;
};
