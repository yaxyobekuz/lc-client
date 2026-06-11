// Maosh holati uchun UI yorlig'i va rang toni (StatusBadge tone'lari)
export const SALARY_STATUS = {
  unpaid: { label: "To'lanmagan", tone: "danger" },
  partial: { label: "Qisman to'langan", tone: "warning" },
  paid: { label: "To'langan", tone: "success" },
};

export const statusMeta = (status) => SALARY_STATUS[status] || SALARY_STATUS.unpaid;

export const methodLabel = (m) => (m === "cash" ? "Naqd" : "Karta");

// Bonus/jarima qoidasi tavsifi: "10% (foiz)" yoki "50 000 so'm (fiksa)"
export const adjustmentScopeLabel = (a) =>
  a.scope === "permanent" ? "Doimiy" : `${a.month}-oy, ${a.year}`;
