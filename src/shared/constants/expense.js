// Xarajat turlari dinamik (DB'dan). Rang turi nomidan barqaror tarzda hisoblanadi —
// shu nom har doim bir xil rangda ko'rinadi (alohida rang sozlamasi shart emas).
export const EXPENSE_TYPE_BADGE_PALETTE = Object.freeze([
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-cyan-50 text-cyan-700 border-cyan-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-orange-50 text-orange-700 border-orange-200",
  "bg-teal-50 text-teal-700 border-teal-200",
  "bg-zinc-100 text-zinc-700 border-zinc-200",
]);

// Nom → barqaror rang (oddiy hash)
export const expenseTypeBadgeClass = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 1_000_000_007;
  }
  const idx = Math.abs(hash) % EXPENSE_TYPE_BADGE_PALETTE.length;
  return EXPENSE_TYPE_BADGE_PALETTE[idx];
};
