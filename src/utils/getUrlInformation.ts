export const getUrlInformation = (href: string) => {
  const match = href.match(
    /^(?:(https?:)\/\/)?(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );
  return (
    match && {
      href: href,
      protocol: match[1] ?? "",
      host: match[2] ?? "",
      hostname: match[3] ?? "",
      port: match[4] ?? "",
      pathname: match[5] ?? "",
      search: match[6] ?? "",
      hash: match[7] ?? "",
    }
  );
};

export const getYoutubeIdfromUrl = (url: string) => {
  const parsed = new URL(url);
  const key = parsed.searchParams.keys().next().value;
  if (key) {
    return parsed.searchParams.get(key);
  } else {
    return null;
  }
};

export const getInstaPostIdFromUrl = (url: string) => {
  const regExp = "/p/(.*?)/";
  const [, match] = url.match(regExp);
  return match;
};
