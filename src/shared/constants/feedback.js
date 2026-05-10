// Feedback domain constants

export const FEEDBACK_STATUSES = ["new", "in_review", "resolved", "rejected"];

export const FEEDBACK_STATUS_LABEL = {
  new: "Yangi",
  in_review: "Ko'rib chiqilmoqda",
  resolved: "Hal qilindi",
  rejected: "Rad etildi",
};

export const FEEDBACK_STATUS_BADGE_CLASS = {
  new: "bg-cyan-100 text-cyan-800",
  in_review: "bg-amber-100 text-amber-800",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export const FEEDBACK_STATUS_OPTIONS = FEEDBACK_STATUSES.map((s) => ({
  value: s,
  label: FEEDBACK_STATUS_LABEL[s],
}));
