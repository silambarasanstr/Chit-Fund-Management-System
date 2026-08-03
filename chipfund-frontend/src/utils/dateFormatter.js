export const formatDate = (
  date = new Date(),
  locale = "en-IN",
  options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  return new Date(date).toLocaleDateString(locale, options);
};