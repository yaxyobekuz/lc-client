// Bo'sh o'quvchi qatori (jadval uchun). _id - faqat React key (server'ga ketmaydi).
let rowCounter = 0;
export const emptyRow = (joinDate = "") => ({
  _id: `row-${Date.now()}-${rowCounter++}`,
  firstName: "",
  lastName: "",
  phone: "",
  username: "",
  password: "",
  joinDate,
  priceOverride: "",
  existingStudentId: null,
  // existingStudentId bo'lganda - bog'langan o'quvchi nomi (ko'rsatish uchun)
  existingLabel: "",
});

export const makeRows = (count, joinDate = "") =>
  Array.from({ length: count }, () => emptyRow(joinDate));

// Excel/Google Sheets'dan nusxalangan TSV (tab bilan ajratilgan) ni qatorlarga
// aylantiradi. Ustunlar tartibi: Ism | Familiya | Telefon | [Username] | [Parol].
// Telefon yo'q ustun bo'lsa ham yumshoq parse - keyin inline validatsiya ushlaydi.
export const parseClipboardTSV = (text, joinDate = "") => {
  if (!text || !text.includes("\t")) return [];
  const lines = text
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.map((line) => {
    const cols = line.split("\t").map((c) => c.trim());
    const [firstName = "", lastName = "", phone = "", username = "", password = ""] = cols;
    return {
      ...emptyRow(joinDate),
      firstName,
      lastName,
      phone,
      username,
      password,
    };
  });
};

// Telefonni 998XXXXXXXXX kanonik formatga keltiradi (server normalizePhone bilan
// bir xil) - dublikat aniqlash va validatsiya shu format bo'yicha.
export const canonicalPhone = (raw) => {
  if (raw == null) return null;
  const digits = String(raw).replace(/\D+/g, "");
  if (!digits) return null;
  let n = digits;
  if (n.length === 9) n = `998${n}`;
  if (n.length === 12 && n.startsWith("998")) return n;
  return null;
};

// Bitta o'quvchi qatorini tekshiradi → {field: message} xatolar obyekti.
// linking (existingStudentId) bo'lsa login/telefon talab qilinmaydi.
export const validateRow = (row, { startKey, seenPhones, seenUsernames } = {}) => {
  const errors = {};
  const linking = !!row.existingStudentId;

  if (!linking) {
    if (!row.firstName?.trim()) errors.firstName = "Ism kerak";
    if (!row.lastName?.trim()) errors.lastName = "Familiya kerak";

    const phone = canonicalPhone(row.phone);
    if (!phone) {
      errors.phone = "Telefon noto'g'ri (998XXXXXXXXX)";
    } else if (seenPhones && seenPhones.get(phone) > 1) {
      errors.phone = "Telefon takrorlangan";
    }

    if (!row.username?.trim() || row.username.trim().length < 3) {
      errors.username = "Username kamida 3 belgi";
    } else if (seenUsernames && seenUsernames.get(row.username.trim().toLowerCase()) > 1) {
      errors.username = "Username takrorlangan";
    }

    if (!row.password || row.password.length < 6) {
      errors.password = "Parol kamida 6 belgi";
    }
  }

  if (!row.joinDate) {
    errors.joinDate = "Qo'shilgan sana kerak";
  } else if (startKey != null) {
    const ym = new Date(row.joinDate);
    const jk = ym.getFullYear() * 12 + ym.getMonth();
    if (jk < startKey) errors.joinDate = "Guruh boshlanishidan oldin bo'lmasin";
  }

  if (row.priceOverride !== "" && row.priceOverride != null) {
    const n = Number(row.priceOverride);
    if (Number.isNaN(n) || n < 0) errors.priceOverride = "Noto'g'ri narx";
  }

  return errors;
};
