export const formatDate = (dateString) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("ja-JP", timeOptions);

  return `${formattedDate}, ${formattedTime}`;
};
