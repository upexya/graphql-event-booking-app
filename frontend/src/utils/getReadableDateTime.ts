export default function getReadableDateTime(selected_date: string | Date) {
  if (!selected_date) return "";

  const now = new Date();
  selected_date = new Date(selected_date);

  return selected_date.toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    weekday: "short",
    year:
      now.getFullYear() === selected_date.getFullYear() ? undefined : "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
