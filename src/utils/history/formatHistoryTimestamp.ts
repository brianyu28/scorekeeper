const HISTORY_DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatHistoryTimestamp(timestamp: number) {
  return HISTORY_DATE_TIME_FORMATTER.format(new Date(timestamp));
}
