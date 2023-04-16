import { getFormattedErrorMessage } from "./commonUtils";

export const getURLParams = () => {
  const search = window.location.search.substring(1);
  if (search.length === 0) {
    return {};
  }

  try {
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (error) {
    const message = getFormattedErrorMessage(error);
    console.log(message);
  }
};
