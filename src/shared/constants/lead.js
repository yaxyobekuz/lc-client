// Lead domain constants - UI labels, options, history visualization

export const REJECTION_REASONS = ["price", "time", "other_center", "other"];

export const REJECTION_REASON_LABEL = {
  price: "Narx",
  time: "Vaqt to'g'ri kelmadi",
  other_center: "Boshqa markaz tanladi",
  other: "Boshqa",
};

export const REJECTION_REASON_OPTIONS = REJECTION_REASONS.map((r) => ({
  value: r,
  label: REJECTION_REASON_LABEL[r],
}));

export const HISTORY_TYPES = [
  "status_change",
  "note",
  "contact",
  "follow_up_set",
  "trial_set",
  "converted",
  "reassigned",
];

export const HISTORY_TYPE_LABEL = {
  status_change: "Status o'zgardi",
  note: "Eslatma",
  contact: "Bog'lanildi",
  follow_up_set: "Eslatma sozlandi",
  trial_set: "Sinov darsi",
  converted: "O'quvchiga aylandi",
  reassigned: "Mas'ul o'zgardi",
};

export const HISTORY_TYPE_EMOJI = {
  status_change: "🔄",
  note: "📝",
  contact: "📞",
  follow_up_set: "⏰",
  trial_set: "🎓",
  converted: "✅",
  reassigned: "👤",
};

export const PRESET_COLORS = [
  "#94a3b8",
  "#38bdf8",
  "#a78bfa",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "#6366f1",
  "#ec4899",
];
