// Davomat status meta
export const ATTENDANCE_STATUSES = ["present", "absent", "excused", "late", "exempt"];

export const STATUS_LABEL = {
  present: "Keldi",
  absent: "Kelmadi",
  excused: "Sababli",
  late: "Kechikdi",
  exempt: "Ozod",
};

export const STATUS_BADGE_CLASS = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-700",
  excused: "bg-amber-100 text-amber-700",
  late: "bg-orange-100 text-orange-700",
  exempt: "bg-gray-100 text-gray-600",
};

export const STATUS_EMOJI = {
  present: "✓",
  absent: "✕",
  excused: "!",
  late: "⏰",
  exempt: "-",
};

export const STATUS_OPTIONS = ATTENDANCE_STATUSES.map((s) => ({
  value: s,
  label: STATUS_LABEL[s],
}));

export const DAY_OPTIONS = [
  { value: "mon", label: "Dushanba" },
  { value: "tue", label: "Seshanba" },
  { value: "wed", label: "Chorshanba" },
  { value: "thu", label: "Payshanba" },
  { value: "fri", label: "Juma" },
  { value: "sat", label: "Shanba" },
  { value: "sun", label: "Yakshanba" },
];

export const DAY_SHORT = {
  mon: "Du",
  tue: "Se",
  wed: "Ch",
  thu: "Pa",
  fri: "Ju",
  sat: "Sh",
  sun: "Ya",
};
