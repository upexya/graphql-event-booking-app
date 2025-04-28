export default function getReadableDateTime(selected_date: Date) {
  if (!selected_date) return "";

  const now = new Date();
  return selected_date.toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year:
      now.getFullYear() === selected_date.getFullYear() ? undefined : "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
