export const EXPENSE_CATEGORIES = Object.freeze([
  "salary",
  "rent",
  "utility",
  "ads",
  "other",
]);

export const EXPENSE_CATEGORY_LABEL = Object.freeze({
  salary: "Oylik",
  rent: "Ijara",
  utility: "Kommunal",
  ads: "Reklama",
  other: "Boshqa",
});

export const EXPENSE_CATEGORY_BADGE_CLASS = Object.freeze({
  salary: "bg-cyan-50 text-cyan-700 border-cyan-200",
  rent: "bg-blue-50 text-blue-700 border-blue-200",
  utility: "bg-amber-50 text-amber-700 border-amber-200",
  ads: "bg-rose-50 text-rose-700 border-rose-200",
  other: "bg-zinc-100 text-zinc-700 border-zinc-200",
});

export const EXPENSE_CATEGORY_OPTIONS = EXPENSE_CATEGORIES.map((value) => ({
  value,
  label: EXPENSE_CATEGORY_LABEL[value],
}));
