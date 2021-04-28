const getLocale = (locale = "en") => {
  if (locale === "en") {
    return "AA";
  } else {
    return "es-MX";
  }
};
export default getLocale;
