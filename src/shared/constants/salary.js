// Salary domain constants — UI labels and visual classes

export const SALARY_STATUSES = Object.freeze([
  "calculated",
  "approved",
  "partial",
  "paid",
  "cancelled",
]);

export const SALARY_STATUS_LABEL = {
  calculated: "Hisoblangan",
  approved: "Tasdiqlangan",
  partial: "Qisman to'langan",
  paid: "To'liq to'langan",
  cancelled: "Bekor qilingan",
};

export const SALARY_STATUS_BADGE_CLASS = {
  calculated: "bg-cyan-100 text-cyan-800",
  approved: "bg-blue-100 text-blue-800",
  partial: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-700",
};

export const ADJUSTMENT_TYPES = Object.freeze([
  "bonus",
  "penalty",
  "advance",
  "deduction",
]);

export const ADJUSTMENT_TYPE_LABEL = {
  bonus: "Bonus",
  penalty: "Jarima",
  advance: "Avans",
  deduction: "Ushlab qolish",
};

export const ADJUSTMENT_TYPE_BADGE_CLASS = {
  bonus: "bg-green-100 text-green-800",
  penalty: "bg-red-100 text-red-700",
  advance: "bg-amber-100 text-amber-800",
  deduction: "bg-orange-100 text-orange-800",
};

export const ADJUSTMENT_TYPE_EMOJI = {
  bonus: "+",
  penalty: "−",
  advance: "−",
  deduction: "−",
};

export const ADJUSTMENT_TYPE_OPTIONS = ADJUSTMENT_TYPES.map((t) => ({
  value: t,
  label: ADJUSTMENT_TYPE_LABEL[t],
}));

export const CALCULATION_TYPES = Object.freeze([
  "fixed",
  "hourly",
  "percentage",
  "mixed",
]);

export const CALCULATION_TYPE_LABEL = {
  fixed: "Belgilangan",
  hourly: "Soatlik",
  percentage: "Foizli",
  mixed: "Aralash",
};

export const CALCULATION_TYPE_OPTIONS = CALCULATION_TYPES.map((t) => ({
  value: t,
  label: CALCULATION_TYPE_LABEL[t],
}));

export const SALARY_STATUS_OPTIONS = SALARY_STATUSES.map((s) => ({
  value: s,
  label: SALARY_STATUS_LABEL[s],
}));

export const MONTH_LABELS = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

export const MONTH_OPTIONS = MONTH_LABELS.map((label, i) => ({
  value: i + 1,
  label,
}));
