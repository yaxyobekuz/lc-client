// preset -> { from, to } (ISO) yoki {} (umumiy)
export const resolvePeriod = (preset) => {
  if (preset === "all") return {};
  const to = new Date();
  const from = new Date();
  if (preset === "week") from.setDate(from.getDate() - 6);
  if (preset === "month") from.setDate(from.getDate() - 29);
  from.setHours(0, 0, 0, 0);
  return { from: from.toISOString(), to: to.toISOString() };
};
