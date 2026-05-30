export const DAY_LABELS_UZ = Object.freeze({
  mon: "Du",
  tue: "Se",
  wed: "Ch",
  thu: "Pa",
  fri: "Ju",
  sat: "Sh",
  sun: "Ya",
});

export const DAY_LABELS_FULL_UZ = Object.freeze({
  mon: "Dushanba",
  tue: "Seshanba",
  wed: "Chorshanba",
  thu: "Payshanba",
  fri: "Juma",
  sat: "Shanba",
  sun: "Yakshanba",
});

export const DAY_OPTIONS = Object.entries(DAY_LABELS_FULL_UZ).map(
  ([value, label]) => ({ value, label }),
);

// Hafta kunlari tartibi (Du -> Ya), saralash uchun
const DAY_ORDER = Object.freeze({
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 7,
});

// Jadvalni hafta kuni, so'ng boshlanish vaqti bo'yicha saralaydi (nusxa qaytaradi)
export const sortSchedule = (schedule = []) => {
  if (!Array.isArray(schedule)) return [];
  return [...schedule].sort((a, b) => {
    const da = DAY_ORDER[a.day] || 99;
    const db = DAY_ORDER[b.day] || 99;
    if (da !== db) return da - db;
    return String(a.startTime || "").localeCompare(String(b.startTime || ""));
  });
};

export const formatSchedule = (schedule = []) => {
  if (!Array.isArray(schedule) || schedule.length === 0) return "-";
  return sortSchedule(schedule)
    .map((s) => `${DAY_LABELS_UZ[s.day] || s.day} ${s.startTime}–${s.endTime}`)
    .join(", ");
};

// Bir xil vaqtli kunlarni birlashtiradi: [{ days: ["Du","Se"], time: "14:00–15:30" }]
export const groupScheduleByTime = (schedule = []) => {
  if (!Array.isArray(schedule) || schedule.length === 0) return [];
  const byTime = new Map();
  for (const s of sortSchedule(schedule)) {
    const time = `${s.startTime}–${s.endTime}`;
    if (!byTime.has(time)) byTime.set(time, []);
    byTime.get(time).push(DAY_LABELS_UZ[s.day] || s.day);
  }
  return Array.from(byTime, ([time, days]) => ({ time, days }));
};
