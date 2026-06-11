// O'zbekcha qisqa oy nomlari (matritsa ustun sarlavhalari uchun).
const UZ_MONTHS_SHORT = [
  "Yan", "Fev", "Mar", "Apr", "May", "Iyn",
  "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek",
];

// (year, month) → mutlaq oy indeksi. month: 1..12.
export const monthKey = (year, month) => year * 12 + (month - 1);

// Sana stringidan {year, month} (1-indexed) - <input type=date> qiymati uchun.
const parseYM = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
};

// startDate dan bugungacha (ikkalasini kiritib) o'tgan oylar [{year, month, key, label}].
// Server bilan bir xil mantiq (elapsedMonths). Matritsa ustunlari aynan shu.
export const elapsedMonths = (startDateStr, now = new Date()) => {
  const start = parseYM(startDateStr);
  if (!start) return [];
  const startIdx = monthKey(start.year, start.month);
  const nowIdx = monthKey(now.getFullYear(), now.getMonth() + 1);
  const months = [];
  for (let i = startIdx; i <= nowIdx; i += 1) {
    const year = Math.floor(i / 12);
    const month = (i % 12) + 1;
    months.push({
      year,
      month,
      key: i,
      label: `${UZ_MONTHS_SHORT[month - 1]} ${year}`,
    });
  }
  return months;
};

// joinDate qaysi oydan boshlab katakcha faol (undan oldingilar disabled).
export const joinMonthKey = (joinDateStr) => {
  const ym = parseYM(joinDateStr);
  return ym ? monthKey(ym.year, ym.month) : -Infinity;
};
