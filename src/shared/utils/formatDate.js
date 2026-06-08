const UZ_MONTHS_SHORT = [
  "Yan", "Fev", "Mar", "Apr", "May", "Iyun",
  "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek",
];

const UZ_WEEKDAYS_SHORT = ["Yak", "Du", "Se", "Ch", "Pa", "Ju", "Sh"];

// Sana formati: "12.05.2026"
export const formatDateUz = (dateLike) => {
  if (!dateLike) return "-";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "-";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${d.getFullYear()}`;
};

// Qisqa formati: "29 May, 2026"
export const formatDateShort = (dateLike) => {
  if (!dateLike) return "-";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "-";
  return `${d.getDate()} ${UZ_MONTHS_SHORT[d.getMonth()]}, ${d.getFullYear()}`;
};

// Hafta kuni bilan: "Du, 29 May 2026"
export const formatDateWithWeekday = (dateLike) => {
  if (!dateLike) return "-";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "-";
  return `${UZ_WEEKDAYS_SHORT[d.getDay()]}, ${d.getDate()} ${UZ_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
};

// HTML <input type="date"> uchun YYYY-MM-DD
export const toDateInput = (dateLike) => {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Markaz vaqt zonasi (Asia/Tashkent) bo'yicha "bugun" — YYYY-MM-DD.
// Davomat sahifalarida default sana va max chegarasi server bilan mos bo'lishi
// uchun (brauzer boshqa TZ da bo'lsa ham). Server localTodayMidnight (+5) ishlatadi.
export const todayInput = () => {
  try {
    // en-CA → YYYY-MM-DD formati
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Tashkent",
    }).format(new Date());
  } catch {
    return toDateInput(new Date());
  }
};
